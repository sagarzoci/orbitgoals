import { GoogleGenAI, Type } from "@google/genai";
import { Goal, DailyLogs, AIAnalysisResult } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProgress = async (
  goals: Goal[],
  logs: DailyLogs,
  currentMonth: Date
): Promise<AIAnalysisResult> => {
  if (!process.env.API_KEY) {
    return {
      summary: "API Key is missing. Please provide a valid API Key to use the AI Coach.",
      score: 0,
      tips: ["Check your environment variables."],
      motivationalQuote: "The journey of a thousand miles begins with a single step."
    };
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Prepare data summary for the prompt
  const goalSummaries = goals.map(g => {
    let completed = 0;
    let skipped = 0;
    Object.keys(logs).forEach(date => {
      if (logs[date][g.id] === 'completed') completed++;
      if (logs[date][g.id] === 'skipped') skipped++;
    });
    return `${g.title}: ${completed} completed, ${skipped} skipped`;
  }).join('\n');

  const prompt = `
    Analyze the following habit tracking data for the month of ${monthName}.
    
    Goals Summary:
    ${goalSummaries}
    
    Total Logged Days: ${Object.keys(logs).length}
    
    Provide a structured JSON response with:
    1. A short summary of performance (max 2 sentences).
    2. A productivity score from 0-100 based on consistency.
    3. Three actionable tips for improvement.
    4. A short motivational quote relevant to the user's performance.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            score: { type: Type.INTEGER },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            motivationalQuote: { type: Type.STRING }
          },
          required: ["summary", "score", "tips", "motivationalQuote"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    return {
      summary: "Unable to analyze data at the moment. Keep going!",
      score: 50,
      tips: ["Consistency is key.", "Try setting reminders.", "Reflect on your 'why'."],
      motivationalQuote: "Fall seven times, stand up eight."
    };
  }
};
