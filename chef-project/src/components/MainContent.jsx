import { useState, useRef, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import getRecipeFromMistral from "../ai";

function MainContent() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ingredientsRef = useRef(null);

  useEffect(() => {
    if (recipe !== "" && ingredientsRef.current !== null) {
      ingredientsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    setIsLoading(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
    setIsLoading(false);
  }

  function addIngredient(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    event.currentTarget.reset();
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="chef-form">
        <input
          type="text"
          placeholder="e.g. Chicken"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredientsRef={ingredientsRef}
          ingredients={ingredients}
          getRecipe={getRecipe}
          isLoading={isLoading}
        />
      )}

      {isLoading && (
        <div className="loading-container">Generating recipe...</div>
      )}

      {!isLoading && recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
export default MainContent;
