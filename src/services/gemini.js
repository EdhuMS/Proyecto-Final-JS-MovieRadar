import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("Gemini API Key status:", API_KEY ? "OK" : "MISSING");

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const translateText = async (text) => {
  if (!genAI) {
    console.error("Falta la API Key de Gemini.");
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Translate the following text to Spanish. Return ONLY the translated text, nothing else. Text: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error("Error traduciendo con Gemini:", error);
    return null;
  }
};