const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // Remove the "data:image/jpeg;base64," part from the start of the string
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
});

export const analyzeImage = async (imageFile) => {
  console.log("Sending image to Clarifai for analysis...");

  // 1. Get the PAT from environment variables
  const PAT = import.meta.env.VITE_CLARIFAI_PAT;
  const USER_ID = 'clarifai'; // This is the owner of the food-item-recognition model
  const APP_ID = 'main';
  const MODEL_ID = 'food-item-recognition';

  // 2. Convert the user's image file to a base64 string
  const imageBase64 = await toBase64(imageFile);

  // 3. Prepare the request payload for the Clarifai API
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "base64": imageBase64
                }
            }
        }
    ]
  });
  console.log("Using PAT:", PAT); 

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

    try {
    // 4. Make the API call to your local proxy
    // CHANGE THIS LINE:
    // const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions);
    // TO THIS:
    const response = await fetch(`/api/v2/models/${MODEL_ID}/outputs`, requestOptions);

    const data = await response.json();
    if (data.status.code !== 10000) {
      throw new Error("Clarifai API Error: " + data.status.description);
    }
    
    // 5. Process the response to match your application's data structure
    const concepts = data.outputs[0].data.concepts;

    if (concepts && concepts.length > 0) {
      // The API returns concepts sorted by confidence, so the first one is the best guess.
      const topConcept = concepts[0];
      const result = {
          foodName: topConcept.name.replace(/ /g, '_'), // Replace spaces with underscores to match your DB
          confidence: topConcept.value,
          recognized: true
      };
      console.log("Clarifai analysis complete. Result:", result);
      return result;
    } else {
      // If the API returns no concepts, it means nothing was recognized
      const result = { foodName: null, confidence: 0, recognized: false };
      console.log("Clarifai could not recognize any food.", result);
      return result;
    }

  } catch (error) {
    console.error("Error during Clarifai analysis:", error);
    // Return a 'not recognized' state in case of an error
    return { foodName: null, confidence: 0, recognized: false };
  }
};