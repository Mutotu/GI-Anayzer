export const analyzeImage = (imageData) => {
  console.log("Simulating AI analysis for image:", imageData.name)

  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Randomly pick a result to simulate different scenarios
      const outcomes = [
        { foodName: "apple", confidence: 0.96, recognized: true },
        { foodName: "white_bread", confidence: 0.91, recognized: true },
        { foodName: "potato", confidence: 0.75, recognized: true }, // A medium-confidence result
        { foodName: null, confidence: 0, recognized: false }, // The AI couldn't recognize anything
      ]

      const result = outcomes[Math.floor(Math.random() * outcomes.length)];
      console.log("AI analysis complete. Result:", result);
      resolve(result)
    }, 2000) // 2-second delay
  })
}