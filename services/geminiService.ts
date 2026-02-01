
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables.
// The SDK initialization must use a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GeminiGameInfo {
  title: string;
  genre: string;
  description: string;
}

export const fetchGameMetadata = async (gameTitle: string): Promise<GeminiGameInfo | null> => {
  try {
    // Generate content using gemini-3-flash-preview for metadata extraction.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find metadata for the video game titled: "${gameTitle}". 
      Return the official genre and a short 1-sentence description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            genre: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "genre", "description"]
        }
      }
    });

    // Extract the generated text output by accessing the .text property directly.
    const responseText = response.text;
    if (!responseText) {
      return null;
    }
    
    const result = JSON.parse(responseText);
    return result as GeminiGameInfo;
  } catch (error) {
    console.error("Gemini Metadata Fetch Error:", error);
    return null;
  }
};
