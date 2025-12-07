"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/contexts/AuthContext";

type Message = {
    id: string;
    sender: "user" | "bot";
    text: string;
    timestamp: Date;
};

export default function CustomerChatPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            sender: "bot",
            text: `Hello ${user?.name || 'Customer'}. I am monitoring your vehicle (VIN: EV-8823-X). Everything looks good right now, but I'm here if you need anything.`,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Simulate incoming alert from backend (Mock)
    useEffect(() => {
        const timer = setTimeout(() => {
            addMessage("bot", "⚠️ ALERT: Sensors indicate Battery Cell #4 temperature is rising (62°C). This exceeds the safety threshold. Coolant pump efficiency is dropping.");
            setTimeout(() => {
                addMessage("bot", "Based on my analysis, you should book a service appointment immediately to prevent thermal runaway. Shall I look for a slot?");
            }, 1000);
        }, 5000); // Trigger after 5s
        return () => clearTimeout(timer);
    }, []);

    const addMessage = (sender: "user" | "bot", text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            sender,
            text,
            timestamp: new Date()
        }]);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg = inputText;
        addMessage("user", userMsg);
        setInputText("");
        setIsTyping(true);

        try {
            // Call Backend API
            const res = await fetch("http://localhost:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages.map(m => ({ sender: m.sender, content: m.text }))
                })
            });
            const data = await res.json();

            setIsTyping(false);
            addMessage("bot", data.response);
        } catch (error) {
            console.error(error);
            setIsTyping(false);
            // Fallback for demo if backend offline
            addMessage("bot", "I'm having trouble connecting to the manufacturing cloud. Please try again.");
        }
    };

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-4 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <header className="mb-2">
                <h1 className="text-3xl font-display font-bold text-foreground">
                    AUTONOMA <span className="text-primary">ASSISTANT</span>
                </h1>
                <p className="text-muted-foreground">AI-Powered Vehicle Support • VIN: EV-8823-X</p>
            </header>

            <Card className="flex-1 overflow-hidden flex flex-col bg-card/80 backdrop-blur-md border border-white/5 shadow-2xl relative">
                {/* Chat Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`
                                max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
                                ${msg.sender === "user"
                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                    : "bg-muted/30 text-foreground border border-white/5 rounded-bl-none"}
                            `}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-muted/30 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center">
                                <span className="w-2 h-2 bg-primary animate-bounce" />
                                <span className="w-2 h-2 bg-primary animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-primary animate-bounce [animation-delay:-0.3s]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-background/50 border-t border-white/5 flex gap-3">
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 bg-black/20 border-white/10 focus-visible:ring-primary"
                    />
                    <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90 text-white">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}
