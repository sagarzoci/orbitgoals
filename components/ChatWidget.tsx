import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { subscribeToChat, sendMessage, generateAIResponse } from '../services/chatService';
import { ChatMessage, Goal, DailyLogs } from '../types';

interface ChatWidgetProps {
  goals: Goal[];
  logs: DailyLogs;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ goals, logs }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user?.id) return;
    const unsubscribe = subscribeToChat(user.id, (msgs) => {
      setMessages(msgs);
      setIsTyping(false); // Stop typing indicator when new message arrives
    });
    return () => unsubscribe();
  }, [user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !user?.id) return;

    const text = inputValue;
    setInputValue('');
    setIsTyping(true); // Show typing immediately

    // 1. Send User Message to DB
    await sendMessage(user.id, text);

    // 2. Trigger AI Response
    // We pass goals/logs so AI has context
    await generateAIResponse(user.id, text, goals, logs);
  };

  if (!user) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300
          ${isOpen ? 'bg-rose-500 rotate-90' : 'bg-indigo-600 hover:bg-indigo-500 hover:scale-110'}
          text-white flex items-center justify-center
        `}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      <div
        className={`
          fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-slate-900 border border-slate-800 
          rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}
        `}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Bot size={20} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Orbit Assistant</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 text-sm mt-8">
              <Bot size={40} className="mx-auto mb-2 opacity-50" />
              <p>Hello! I'm your AI coach.</p>
              <p>Ask me about your habits!</p>
            </div>
          )}

          {messages.map((msg) => {
             const isUser = msg.sender === 'user';
             return (
               <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                 <div className={`
                    max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                    ${isUser 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}
                 `}>
                   {msg.text}
                 </div>
               </div>
             );
          })}
          
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1">
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 text-white text-sm rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none border border-slate-700 placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;
