

// export const analyzeImage = async (imageFile) => {
//   const formData = new FormData();
//   formData.append('file', imageFile);

//   const response = await fetch('http://localhost:8000/predict', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Failed to analyze image');
//   }

//   const result = await response.json();
//   return result;
// };



export const analyzeImage = (imageData) => {
  console.log("Simulating AI analysis for image:", imageData.name);

  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Randomly pick a result to simulate different scenarios
      const outcomes = [
        { foodName: "apple", confidence: 0.96, recognized: true },
        { foodName: "white_bread", confidence: 0.91, recognized: true },
        { foodName: "potato", confidence: 0.75, recognized: true }, // A medium-confidence result
        { foodName: null, confidence: 0, recognized: false }, // The AI couldn't recognize anything
      ];

      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      console.log("AI analysis complete. Result:", result);
      resolve(result);
    }, 2000); // 2-second delay
  });
};

// export const analyzeImage = async (imageFile) => {
//   const apiKey = 'b1580f5f46df4f6b8c708156ab5fd8ef';
//   const endpoint = 'https://api.clarifai.com/v2/models/food-image-recognition/outputs';
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

//   const reader = new FileReader();
//   reader.readAsDataURL(imageFile);

//   return new Promise((resolve, reject) => {
//     reader.onloadend = async () => {
//       const base64data = reader.result.split(',')[1];

//       const body = {
//         inputs: [
//           {
//             data: {
//               image: {
//                 base64: base64data,
//               },
//             },
//           },
//         ],
//       };

//       try {
//         const response = await fetch(proxyUrl + endpoint, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Key ${apiKey}`,
//           },
//           body: JSON.stringify(body),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to analyze image');
//         }

//         const result = await response.json();
//         const concepts = result.outputs[0].data.concepts;

//         if (concepts && concepts.length > 0) {
//           const topConcept = concepts[0];
//           resolve({
//             recognized: true,
//             foodName: topConcept.name,
//             confidence: topConcept.value,
//           });
//         } else {
//           resolve({ recognized: false });
//         }
//       } catch (error) {
//         console.error("Error analyzing image:", error);
//         reject({ recognized: false });
//       }
//     };
//   });
// };