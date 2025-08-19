// src/data/giDatabase.js

export const giDatabase = {
    apple: {
      gi: 36,
      explanation: "Low GI due to high fiber content...",
      nudges: [ /* ... */ ]
    },
    white_bread: {
      gi: 75,
      explanation: "High GI due to highly processed flour...",
      nudges: [ /* ... */ ]
    },
    lentils: {
      gi: 32,
      explanation: "Very Low GI due to its excellent combination...",
      nudges: [ /* ... */ ]
    },
    potato: {
      gi: 78,
      explanation: "High GI, especially when baked or mashed...",
      nudges: [ /* ... */ ]
    },
    // --- ADD THESE NEW ENTRIES ---
    banana: {
      gi: 51, // GI for a slightly unripe banana is lower. Ripe is higher.
      explanation: "Medium GI. The ripeness of the banana significantly affects its GI value; riper bananas have a higher GI.",
      nudges: [
        "Choose greener, less ripe bananas for a lower GI.",
        "Pairing banana with a protein like greek yogurt can help manage blood sugar response."
      ]
    },
    pizza: {
      gi: 80, // Highly variable, but generally high for a typical cheese pizza.
      explanation: "High GI, especially with a thick, refined flour crust. Toppings can influence the overall GI.",
      nudges: [
        "Opt for a thin, whole-wheat crust to lower the GI.",
        "Adding vegetable and protein toppings can help blunt the blood sugar spike."
      ]
    },
    melon: { // This is generic, Cantaloupe is a common one.
      gi: 65,
      explanation: "Medium-High GI. While it contains natural sugars, its high water content means its glycemic load is often low.",
      nudges: [
        "Enjoy in moderation. Watch your portion sizes.",
        "Pair with low-GI foods like nuts or seeds."
      ]
    }
    // You can continue adding more foods here!
  };