// src/api/spoonacularApi.js
export const computeGlycemicLoad = async (ingredients) => {
  const API_KEY = import.meta.env.VITE_SPOON_KEY; // <-- Put your Spoonacular key in .env
  const url = `https://api.spoonacular.com/food/ingredients/glycemicLoad?language=en&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error(`Spoonacular API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Glycemic Load:", error);
    return null;
  }
};
