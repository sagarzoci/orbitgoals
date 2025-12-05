import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from "firebase/firestore";
import { ChatMessage, Goal, DailyLogs } from "../types";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// --- Local Storage Fallback Helpers ---

const getLocalMessages = (userId: string): ChatMessage[] => {
  try {
    const stored = localStorage.getItem(`orbit_chat_${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveLocalMessage = (userId: string, msg: ChatMessage) => {
  const messages = getLocalMessages(userId);
  messages.push(msg);
  // Limit local storage history
  if (messages.length > 50) messages.shift();
  localStorage.setItem(`orbit_chat_${userId}`, JSON.stringify(messages));
  
  // Trigger update for listeners
  window.dispatchEvent(new CustomEvent(`chat_update_${userId}`));
};

// Safe Env Access Helper
const getProjectId = () => {
    try {
        return (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID;
    } catch {
        return undefined;
    }
}

// --- Service Methods ---

export const subscribeToChat = (userId: string, callback: (messages: ChatMessage[]) => void) => {
  if (!userId) return () => {};

  // Fallback Logic:
  // 1. If Guest User
  // 2. If using default project ID (likely invalid/demo)
  // 3. If Firestore fails
  
  const envProjectId = getProjectId();
  const isDefaultProject = !envProjectId || envProjectId === "orbitgoals";
  const isGuest = userId === 'guest-user-123';

  const subscribeLocal = () => {
    const handler = () => {
      const msgs = getLocalMessages(userId);
      // Sort by timestamp if needed, though they are pushed in order
      msgs.sort((a: any, b: any) => {
        const tA = a.timestamp?.seconds ? a.timestamp.seconds * 1000 : a.timestamp;
        const tB = b.timestamp?.seconds ? b.timestamp.seconds * 1000 : b.timestamp;
        return tA - tB;
      });
      callback(msgs);
    };
    window.addEventListener(`chat_update_${userId}`, handler);
    handler(); // Initial call
    return () => window.removeEventListener(`chat_update_${userId}`, handler);
  };

  if (isGuest || isDefaultProject) {
    return subscribeLocal();
  }

  try {
    const messagesRef = collection(db, "users", userId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"), limit(50));

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      callback(messages);
    }, (error) => {
      console.warn("Firestore subscription failed, switching to local mode:", error.message);
      // Try to recover with local messages
      const msgs = getLocalMessages(userId);
      callback(msgs);
    });
  } catch (e) {
    console.warn("Firestore init error, using local mode:", e);
    return subscribeLocal();
  }
};

export const sendMessage = async (userId: string, text: string) => {
  if (!userId || !text.trim()) return;

  const envProjectId = getProjectId();
  const isDefaultProject = !envProjectId || envProjectId === "orbitgoals";
  const isGuest = userId === 'guest-user-123';

  // Local Object Creation
  const localMsg: ChatMessage = {
    id: Date.now().toString(),
    text,
    sender: 'user',
    timestamp: Date.now() // Local timestamp
  };

  if (isGuest || isDefaultProject) {
    saveLocalMessage(userId, localMsg);
  } else {
    try {
      const messagesRef = collection(db, "users", userId, "messages");
      await addDoc(messagesRef, {
        text,
        sender: 'user',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.warn("Firestore send failed, saving locally:", error);
      saveLocalMessage(userId, localMsg);
    }
  }
};

export const generateAIResponse = async (userId: string, userText: string, goals: Goal[], logs: DailyLogs) => {
  // Simulate typing delay
  await new Promise(resolve => setTimeout(resolve, 800));

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
  const envProjectId = getProjectId();
  const isDefaultProject = !envProjectId || envProjectId === "orbitgoals";
  const isGuest = userId === 'guest-user-123';

  const localMsg: ChatMessage = {
    id: Date.now().toString() + Math.random(),
    text,
    sender: 'ai',
    timestamp: Date.now()
  };

  if (isGuest || isDefaultProject) {
    saveLocalMessage(userId, localMsg);
  } else {
    try {
      const messagesRef = collection(db, "users", userId, "messages");
      await addDoc(messagesRef, {
        text,
        sender: 'ai',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.warn("Firestore agent message failed, saving locally:", error);
      saveLocalMessage(userId, localMsg);
    }
  }
};