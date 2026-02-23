import ReactMarkdown from "react-markdown";

function ClaudeRecipe(props) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2 className="recipe-title">Chef Claude Recommends:</h2>
      <ReactMarkdown className="recipe-content">{props.recipe}</ReactMarkdown>
    </section>
  );
}
export default ClaudeRecipe;
