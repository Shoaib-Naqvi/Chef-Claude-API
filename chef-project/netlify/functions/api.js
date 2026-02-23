import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
const hf = new HfInference(process.env.VITE_APP_RECIPE_API_KEY);

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Chef Claude API (Serverless) is running",
  });
});

app.post("/api/recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({ error: "Invalid ingredients array" });
    }

    const ingredientsString = ingredients.join(", ");
    const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients and suggests a recipe. Format the response in markdown.`;

    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Failed to generate recipe",
      message: error.message,
    });
  }
});

export const handler = serverless(app);
