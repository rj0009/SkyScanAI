
import { GoogleGenAI } from "@google/genai";

// Ensure the API_KEY is available in the environment variables.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this project, we assume the key is set.
  console.warn("API_KEY for Gemini is not set in environment variables. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates an analysis report using the Gemini API.
 * @param {string} promptTemplate - The prompt template for the AI model.
 * @param {string} videoFileName - The name of the video file being analyzed.
 * @returns {Promise<string>} - A promise that resolves to the generated report text.
 */
export const generateAnalysisReport = async (
  promptTemplate: string,
  videoFileName: string
): Promise<string> => {
  try {
    const fullPrompt = `${promptTemplate}\n\nThe video file being analyzed is named: "${videoFileName}".`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    // Re-throw the error to be handled by the calling function.
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
