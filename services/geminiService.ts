import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (ai) {
    return ai;
  }

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) {
    // This error will be caught by the UI and displayed to the user.
    throw new Error("Gemini API key is missing. Please ensure the API_KEY environment variable is set on your deployment platform (e.g., Railway).");
  }

  ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai;
};


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
    const client = getAiClient();
    const fullPrompt = `${promptTemplate}\n\nThe video file being analyzed is named: "${videoFileName}".`;
    
    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("Received an empty response from the API. The model may not have been able to process the request.");
    }
    const result: AnalysisResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error generating content with Gemini API:", error);
    // Re-throw the error to be handled by the calling function.
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};
