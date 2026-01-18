"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Upload, X, File } from "lucide-react";

interface ChatMessage {
  id: number;
  user: "user" | "admin";
  message: string;
  timestamp: string;
  file?: {
    name: string;
    size: string;
    type: string;
  };
}

export default function SupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      user: "admin",
      message:
        "Hello! Welcome to EduWrites support. How can we assist you today?",
      timestamp: "10:00 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() && !selectedFile) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user: "user",
      message: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
            type: selectedFile.type,
          }
        : undefined,
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setSelectedFile(null);
    setFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: ChatMessage = {
        id: messages.length + 2,
        user: "admin",
        message: "Thank you for your message! We'll get back to you shortly.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, adminResponse]);
    }, 1500);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl border-2 border-border shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 border-border flex-shrink-0 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <h2 className="text-sm font-bold text-foreground">Support Chat</h2>
        <p className="text-foreground/60 text-xs mt-1">
          Get help from our support team (Available 24/7)
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 min-h-0 bg-gradient-to-b from-white to-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.user === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-sm lg:max-w-md ${
                msg.user === "user"
                  ? "bg-gradient-to-r from-primary to-accent text-white rounded-2xl rounded-tr-none shadow-md"
                  : "bg-white text-foreground rounded-2xl rounded-tl-none border-2 border-border shadow-sm"
              } p-4`}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>

              {msg.file && (
                <div className="mt-3 flex items-center gap-2 bg-black/5 dark:bg-white/10 p-3 rounded-lg">
                  <File
                    size={14}
                    className={`flex-shrink-0 ${msg.user === "user" ? "text-white/70" : "text-primary"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">
                      {msg.file.name}
                    </p>
                    <p
                      className={`text-xs ${msg.user === "user" ? "text-white/70" : "text-foreground/60"}`}
                    >
                      {msg.file.size}
                    </p>
                  </div>
                  <a
                    href="#"
                    className={`text-xs font-semibold underline hover:opacity-70 flex-shrink-0 ${msg.user === "user" ? "text-white" : "text-primary"}`}
                  >
                    Download
                  </a>
                </div>
              )}

              <p
                className={`text-xs mt-2 ${msg.user === "user" ? "text-white/70" : "text-foreground/60"}`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-border px-6 py-4 flex-shrink-0 bg-white">
        {/* File Preview */}
        {selectedFile && (
          <div className="mb-3 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border-2 border-blue-200 mr-24">
            <File size={16} className="text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {fileName}
              </p>
              <p className="text-xs text-foreground/60 mt-0.5">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-blue-200 rounded-lg transition-colors text-blue-600 hover:text-blue-700 flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="relative mr-20">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.xlsx,.png,.jpg,.jpeg"
          />

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as unknown as React.FormEvent);
              }
            }}
            placeholder="Type your message here..."
            className="w-full bg-white border-2 border-border rounded-xl px-4 py-3 pr-20 text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none shadow-sm"
            rows={2}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
              title="Attach file"
            >
              <Upload size={18} />
            </button>
            <button
              type="submit"
              disabled={!input.trim() && !selectedFile}
              className="p-2 text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message (Enter)"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
