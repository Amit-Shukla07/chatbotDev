

import axios from "axios";

const API_KEY = "AIzaSyAAJACyDVJIivTXTbu4r5ZyGm9CgtNAJ9M"; 

async function getAIResponse(prompt) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": API_KEY
        }
      }
    );

    // Access the response text
    let reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Clean stars (*) and extra spaces
    if (reply) {
      reply = reply.replace(/\*/g, "").trim();
    }

    return reply || "No response from Gemini.";

  } catch (error) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);
    return "Something went wrong!";
  }
}

// Example usage:
// (async () => {
//   const result = await getAIResponse("Explain how AI works in a few words, no bullet points or asterisks");
//   console.log(result);
// })();

export default getAIResponse;
