const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = error => reject(error);
});

export const analyzeImage = async (imageFile) => {
  console.log("Sending image to Clarifai for analysis...");

  const PAT = import.meta.env.VITE_CLARIFAI_PAT;
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'food-item-recognition';

  const imageBase64 = await toBase64(imageFile);

  const raw = JSON.stringify({
    user_app_id: { user_id: USER_ID, app_id: APP_ID },
    inputs: [{ data: { image: { base64: imageBase64 } } }],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT,
    },
    body: raw,
  };

  try {
    const response = await fetch(`/api/v2/models/${MODEL_ID}/outputs`, requestOptions);
    const data = await response.json();

    if (data.status.code !== 10000) {
      throw new Error("Clarifai API Error: " + data.status.description);
    }

    const concepts = data.outputs[0].data.concepts;

    if (concepts && concepts.length > 0) {
      const topConcept = concepts[0];
      return {
        foodName: topConcept.name.replace(/ /g, '_'),
        confidence: topConcept.value,
        recognized: true,
      };
    } else {
      return { foodName: null, confidence: 0, recognized: false };
    }
  } catch (error) {
    console.error("Error during Clarifai analysis:", error);
    return { foodName: null, confidence: 0, recognized: false };
  }
};
