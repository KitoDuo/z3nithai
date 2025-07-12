import axios from 'axios';

// IMPORTANT: In a real-world application, this API key should be stored in a secure
// environment variable and not hardcoded directly in the source code.
const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_NAME = "meta-llama/llama-4-maverick:free";

const apiClient = axios.create({
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000', // Replace with your actual site URL in production
    'X-Title': 'Zenith AI', // Optional: Helps OpenRouter identify your app
  }
});

/**
 * Gets a chat completion from the OpenRouter API.
 * @param {Array<Object>} messages - The conversation history in OpenAI format.
 *   (e.g., [{ role: 'user', content: 'Hello' }])
 * @returns {Promise<string>} The content of the AI's response message.
 */
export const getChatCompletion = async (messages) => {
  try {
    const response = await apiClient.post(API_URL, {
      model: MODEL_NAME,
      messages: messages,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    if (error.response) {
      console.error("Error data:", error.response.data);
      // Return a user-friendly error message
      return `I'm sorry, but I encountered an error: ${error.response.data.error?.message || 'Please try again later.'}`;
    }
    return "I'm sorry, but I'm unable to respond right now. Please check your connection and try again.";
  }
};

/**
 * Generates a single, specific piece of content, like a journal prompt.
 * @param {string} prompt - The instruction for the AI.
 * @returns {Promise<string>} The AI's generated content.
 */
export const generateContent = async (prompt) => {
    try {
        const response = await apiClient.post(API_URL, {
            model: MODEL_NAME,
            messages: [
                { role: 'system', content: 'You are a helpful assistant. Provide a concise and creative response based on the user\'s request. Do not include any preamble or extra formatting.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 100, // Limit tokens for single-line prompts
        });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating content:", error);
        // Return a fallback prompt in case of an error
        return "What is something you're looking forward to this week?";
    }
};
