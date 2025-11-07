import { GoogleGenAI, Type } from "@google/genai";
import type { ContentInput, Suggestions } from '../types';

const model = "gemini-2.5-flash";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        contentAnalysis: { type: Type.STRING, description: "Brief analysis of the content's topic and style, with suggestions for tailoring it to the platform." },
        captionOptions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    hook: { type: Type.STRING, description: "A compelling hook (first line)." },
                    value: { type: Type.STRING, description: "The main value statement or body of the caption." },
                    cta: { type: Type.STRING, description: "A clear call-to-action." },
                },
                required: ["hook", "value", "cta"],
            },
        },
        hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A set of optimized hashtags (niche, trending, general)." },
        postingSuggestion: { type: Type.STRING, description: "Ideal posting time or a suggestion for a caption prompt for engagement." },
        bestPractices: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A checklist of formatting and content best practices for the platform." },
        styleNotes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Short, actionable creator style notes (e.g., 'use voiceover', 'hidden-face style')." },
        readyToPost: {
            type: Type.OBJECT,
            properties: {
                caption: { type: Type.STRING, description: "The best complete caption from the options, fully formatted." },
                hashtags: { type: Type.STRING, description: "The generated hashtags formatted as a single string, ready to copy." },
            },
            required: ["caption", "hashtags"],
        },
    },
    required: ["contentAnalysis", "captionOptions", "hashtags", "postingSuggestion", "bestPractices", "styleNotes", "readyToPost"],
};


export const generateSocialMediaPost = async (content: ContentInput, platform: string): Promise<Suggestions> => {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const prompt = `
        You are a world-class social media strategist for content creators. Analyze the provided content and generate a comprehensive post strategy for the specified platform.

        Platform: ${platform}

        Content is provided in the next part.

        Your task is to return a JSON object that strictly follows the provided schema. Analyze the content's topic, style, and potential audience. Generate creative and engaging text that is optimized for reach and engagement on the target platform.
    `;

    const contents: any[] = [];
    if (content.type === 'text') {
        contents.push({ text: content.value });
    } else {
        if (!content.mimeType) {
            throw new Error("MIME type is required for image/video content.");
        }
        contents.push({
            inlineData: {
                data: content.value,
                mimeType: content.mimeType,
            }
        });
    }

    contents.push({ text: prompt });

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: contents },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            }
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        return parsedJson as Suggestions;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate suggestions from AI. Please check your content and try again.");
    }
};