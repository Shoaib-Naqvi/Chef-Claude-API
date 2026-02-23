# Chef Claude Backend Server

Simple Express.js backend server that proxies requests to the Hugging Face API to bypass CORS restrictions.

## Why is this needed?

Browsers block direct API calls to Hugging Face due to CORS (Cross-Origin Resource Sharing) security policies. This backend server acts as a proxy, making the API calls from the server side where CORS doesn't apply.

## How to run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3001` by default.

## Environment Variables

The server uses the same `.env` file from the parent directory, which should contain:

- `VITE_APP_RECIPE_API_KEY` - Your Hugging Face API key

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/recipe` - Generate recipe from ingredients
  - Request body: `{ "ingredients": ["chicken", "tomatoes", "garlic"] }`
  - Response: `{ "recipe": "...markdown recipe text..." }`
