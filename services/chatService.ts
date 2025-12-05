import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from "firebase/firestore";
import { ChatMessage, Goal, DailyLogs } from "../types";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const subscribeToChat = (userId: string, callback: (messages: ChatMessage[]) => void) => {
  if (!userId) return () => {};

  const messagesRef = collection(db, "users", userId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"), limit(50));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];
    callback(messages);
  });
};

export const sendMessage = async (userId: string, text: string) => {
  if (!userId || !text.trim()) return;

  const messagesRef = collection(db, "users", userId, "messages");
  await addDoc(messagesRef, {
    text,
    sender: 'user',
    timestamp: serverTimestamp()
  });
};

export const generateAIResponse = async (userId: string, userText: string, goals: Goal[], logs: DailyLogs) => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!process.env.API_KEY) {
    await addAgentMessage(userId, "I'm having trouble connecting to my brain (API Key missing). I can't think right now!");
    return;
  }

  // Construct context
  const today = new Date().toISOString().split('T')[0];
  const goalSummary = goals.map(g => {
    const status = logs[today]?.[g.id] || 'pending';
    return `- ${g.title}: Status today is ${status}`;
  }).join('\n');

  const systemPrompt = `
    You are Orbit, a friendly and motivational habit coaching AI.
    
    User Context:
    The user has the following goals:
    ${goalSummary || "No goals set yet."}
    
    Instructions:
    1. Keep responses concise (under 3 sentences usually).
    2. Be encouraging but practical.
    3. If the user asks about their progress, use the context provided.
    4. If the user just says hi, be welcoming.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userText,
      config: {
        systemInstruction: systemPrompt
      }
    });

    const aiText = response.text || "I'm not sure how to respond to that, but keep crushing your goals!";
    await addAgentMessage(userId, aiText);

  } catch (error) {
    console.error("AI Chat Error:", error);
    await addAgentMessage(userId, "I'm feeling a bit disconnected. Let's try again later.");
  }
};

const addAgentMessage = async (userId: string, text: string) => {
  const messagesRef = collection(db, "users", userId, "messages");
  await addDoc(messagesRef, {
    text,
    sender: 'ai',
    timestamp: serverTimestamp()
  });
};
