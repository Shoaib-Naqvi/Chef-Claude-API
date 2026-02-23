async function getRecipeFromMistral(ingredientsArr) {
  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsArr,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    const data = await response.json();
    return data.recipe;
  } catch (err) {
    console.error("Error fetching recipe:", err);
    return "I couldn't generate a recipe. Make sure the backend server is running on port 3001.";
  }
}
export default getRecipeFromMistral;
