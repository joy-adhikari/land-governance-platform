"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { VoiceControls } from "./VoiceControls";
import { useVoice } from "@/hooks/useVoice";
import { generateResponse } from "@/lib/ai-service";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am the LandGov AI Assistant. How can I help you with Indian land governance today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isListening, transcript, startListening, stopListening, speak, error } = useVoice();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateResponse(text);
      const aiMsg: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMsg]);

      if (!isMuted) {
        speak(response);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[350px] bg-background border shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
      {/* Header */}
      <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-semibold">LandGov AI</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none text-sm animate-pulse">
              AI is thinking...
            </div>
          </div>
        )}
        {error && <div className="text-center text-[10px] text-destructive mb-2">{error}</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about land laws, policy..."
            className="bg-background"
          />
          <VoiceControls
            isListening={isListening}
            onToggleListen={() => isListening ? stopListening() : startListening()}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
          />
          <Button size="icon" className="h-10 w-10 shrink-0" onClick={() => handleSend()} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
