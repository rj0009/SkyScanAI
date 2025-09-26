import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

// Ensure the API_KEY is available in the environment variables.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this project, we assume the key is set.
  console.warn("API_KEY for Gemini is not set in environment variables. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      report: { type: Type.STRING, description: "A detailed textual analysis report based on the video." },
      metrics: {
        type: Type.ARRAY,
        description: "An array of key performance indicators or measurements.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The name of the metric." },
            value: { type: Type.NUMBER, description: "The value of the metric (typically 0-100)." },
          },
          required: ['name', 'value'],
        },
      },
      events: {
        type: Type.ARRAY,
        description: "A chronological list of detected events or observations.",
        items: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING, description: "Timestamp of the event in MM:SS format." },
            description: { type: Type.STRING, description: "A brief description of the event." },
            type: { type: Type.STRING, enum: ['info', 'warning', 'alert'], description: "The severity of the event." },
            box: {
              type: Type.OBJECT,
              description: "An optional bounding box for the detected object, with normalized coordinates.",
              properties: {
                x: { type: Type.NUMBER, description: "Top-left x-coordinate (0-1)." },
                y: { type: Type.NUMBER, description: "Top-left y-coordinate (0-1)." },
                width: { type: Type.NUMBER, description: "Width of the box (0-1)." },
                height: { type: Type.NUMBER, description: "Height of the box (0-1)." },
              },
              required: ['x', 'y', 'width', 'height'],
            },
          },
          required: ['time', 'description', 'type'],
        },
      },
    },
    required: ['report', 'metrics', 'events'],
  };


/**
 * Generates an analysis report using the Gemini API.
 * @param {string} promptTemplate - The prompt template for the AI model.
 * @param {string} videoFileName - The name of the video file being analyzed.
 * @returns {Promise<AnalysisResult>} - A promise that resolves to the structured analysis result.
 */
export const generateAnalysisReport = async (
  promptTemplate: string,
  videoFileName: string
): Promise<AnalysisResult> => {
  try {
    const fullPrompt = `${promptTemplate}\n\nThe video file being analyzed is named: "${videoFileName}".`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text;
    const result: AnalysisResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    // Re-throw the error to be handled by the calling function.
    throw new Error("Failed to communicate with the Gemini API or parse its response.");
  }
};
