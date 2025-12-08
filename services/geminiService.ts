import { GoogleGenAI, Type } from "@google/genai";
import { Goal, DailyLogs, AIAnalysisResult, HabitSuggestion, WeeklyReviewData, COLORS } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// --- Mock Data Generators for Demo Mode ---
const getMockAnalysis = (): AIAnalysisResult => ({
  summary: "You have shown remarkable consistency this week! Your hydration and reading habits are strong, though weekend routines could be tightened.",
  score: 82,
  tips: [
    "Try 'habit stacking': Drink water immediately after brushing your teeth.",
    "Prepare your gym clothes the night before to reduce friction.",
    "Use the 2-minute rule for days when you feel low energy."
  ],
  motivationalQuote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
});

const MOCK_SUGGESTIONS: HabitSuggestion[] = [
    { title: "Morning Stretch", reason: "Kickstart your circulation and energy.", icon: "🧘", color: "bg-orange-500", time: "07:00", difficulty: "Easy" },
    { title: "Deep Work Block", reason: "Maximize focus for complex tasks.", icon: "🧠", color: "bg-indigo-500", time: "10:00", difficulty: "Hard" },
    { title: "Gratitude Log", reason: "Improve mental well-being daily.", icon: "📓", color: "bg-pink-500", time: "21:30", difficulty: "Easy" }
];

const getMockWeeklyReview = (): WeeklyReviewData => ({
    weekScore: 78,
    summary: "A solid week of performance. You crushed your targets on Tuesday and Wednesday but trailed off slightly on Saturday.",
    bestDay: "Tuesday",
    focusArea: "Weekend Consistency",
    actionItem: "Plan a light 10-minute routine for Saturday morning."
});
// ------------------------------------------

// 1. Progress Analysis
export const analyzeProgress = async (
  goals: Goal[],
  logs: DailyLogs,
  currentMonth: Date
): Promise<AIAnalysisResult> => {
  if (!process.env.API_KEY) {
    console.info("Demo Mode: Providing mock AI analysis.");
    await new Promise(r => setTimeout(r, 1500)); // Simulate network delay
    return getMockAnalysis();
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
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
    console.error("AI Analysis Failed, falling back to mock:", error);
    return getMockAnalysis();
  }
};

// 2. Habit Suggestions
export const suggestHabits = async (
    userBio: string,
    currentGoals: Goal[]
): Promise<HabitSuggestion[]> => {
    if (!process.env.API_KEY) {
        await new Promise(r => setTimeout(r, 1200));
        return MOCK_SUGGESTIONS;
    }

    const currentTitles = currentGoals.map(g => g.title).join(', ');
    const prompt = `
      User Bio/Interests: "${userBio || 'Productivity and health enthusiast'}"
      Current Habits: ${currentTitles}

      Suggest 3 NEW, distinct habits this user should start. 
      For each habit, suggest a specific time (HH:MM) that makes sense (e.g. 07:00 for morning habits).
      Choose a color from this list that fits the vibe: ${COLORS.join(', ')}.
      Choose an emoji icon.
      
      Return JSON.
    `;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: "Short title e.g. 'Read 10 pages'" },
                            reason: { type: Type.STRING, description: "Why this fits the user" },
                            icon: { type: Type.STRING, description: "Single emoji char" },
                            color: { type: Type.STRING, description: "Tailwind class from provided list" },
                            time: { type: Type.STRING, description: "HH:MM format" },
                            difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] }
                        },
                        required: ["title", "reason", "icon", "color", "difficulty"]
                    }
                }
            }
        });
        
        const text = response.text;
        return text ? JSON.parse(text) : MOCK_SUGGESTIONS;
    } catch (e) {
        console.error("Suggestion Error", e);
        return MOCK_SUGGESTIONS;
    }
};

// 3. Weekly Review
export const analyzeWeekly = async (
    goals: Goal[],
    logs: DailyLogs
): Promise<WeeklyReviewData | null> => {
    if (!process.env.API_KEY) {
        await new Promise(r => setTimeout(r, 1500));
        return getMockWeeklyReview();
    }

    // Filter logs for last 7 days
    const today = new Date();
    const last7Days: string[] = [];
    for(let i=0; i<7; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split('T')[0]);
    }

    const weeklyLogs = last7Days.map(date => {
        const dayLog = logs[date] || {};
        const completed = Object.values(dayLog).filter(s => s === 'completed').length;
        return `${date}: ${completed} tasks done`;
    }).join('\n');

    const prompt = `
       Analyze these logs for the past week:
       ${weeklyLogs}
       Total Active Goals: ${goals.length}

       Return a weekly summary JSON with:
       - weekScore (0-100)
       - summary (1 sentence overview)
       - bestDay (Day name with most completions)
       - focusArea (One word e.g., "Consistency", "Health")
       - actionItem (One specific thing to do next week)
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
                        weekScore: { type: Type.INTEGER },
                        summary: { type: Type.STRING },
                        bestDay: { type: Type.STRING },
                        focusArea: { type: Type.STRING },
                        actionItem: { type: Type.STRING }
                    },
                    required: ["weekScore", "summary", "bestDay", "focusArea", "actionItem"]
                }
            }
        });
        const text = response.text;
        return text ? JSON.parse(text) : getMockWeeklyReview();
    } catch (e) {
        console.error("Weekly Analysis Error", e);
        return getMockWeeklyReview();
    }
};

// 4. Personalized Motivation
export const getPersonalizedMotivation = async (name: string, streak: number): Promise<string> => {
    if (!process.env.API_KEY) return "You've got this, keep orbiting!";

    const prompt = `
      User: ${name}
      Current Streak: ${streak} days.
      
      Write a short, punchy, high-energy motivational sentence (max 15 words) for this user. 
      Mention the streak if it's > 2. Be encouraging.
    `;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim().replace(/^"|"$/g, '');
    } catch (e) {
        return "Keep pushing forward!";
    }
};