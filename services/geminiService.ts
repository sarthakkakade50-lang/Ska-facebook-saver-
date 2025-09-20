
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateVideoDetails = async (videoUrl: string): Promise<{ title: string; description: string }> => {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Based on this conceptual Facebook video URL, generate a plausible and creative title and a short, engaging description for the video. The URL is: ${videoUrl}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "A catchy and relevant title for the video, under 70 characters.",
                    },
                    description: {
                        type: Type.STRING,
                        description: "A brief, engaging description of the video content, around 150 characters.",
                    },
                },
                required: ["title", "description"],
            },
        },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    if (parsed.title && parsed.description) {
        return parsed;
    } else {
        throw new Error("AI response is missing title or description.");
    }

  } catch (error) {
    console.error("Error generating video details from Gemini:", error);
    // Fallback in case of API error
    return {
        title: "An Amazing Adventure Captured",
        description: "This video captures a truly breathtaking moment. Watch as something incredible unfolds right before your eyes! You won't believe what happens next."
    };
  }
};
