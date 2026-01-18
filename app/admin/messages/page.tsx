"use client";

import { useState } from "react";
import { Send, MessageSquare, Trash2, Search, AlertCircle } from "lucide-react";

export default function AdminMessages() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      senderName: "John Doe",
      senderEmail: "john@example.com",
      subject: "Essay Writing Service Inquiry",
      lastMessage: "Can you help me with my essay on climate change?",
      timestamp: "2024-01-15 14:30",
      unread: true,
      resolved: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          text: "Hi, I need help with an essay on climate change. Can you provide a sample?",
          time: "14:25",
        },
        {
          id: 2,
          sender: "admin",
          text: "Hello! Yes, we can definitely help with that. What is your academic level and deadline?",
          time: "14:27",
        },
        {
          id: 3,
          sender: "customer",
          text: "Can you help me with my essay on climate change?",
          time: "14:30",
        },
      ],
    },
    {
      id: 2,
      senderName: "Sarah Smith",
      senderEmail: "sarah@example.com",
      subject: "Thesis Writing Support",
      lastMessage: "What are your prices for thesis writing?",
      timestamp: "2024-01-15 13:15",
      unread: true,
      resolved: false,
      messages: [],
    },
    {
      id: 3,
      senderName: "Mike Johnson",
      senderEmail: "mike@example.com",
      subject: "Research Paper Completed",
      lastMessage: "Thank you! The paper is excellent!",
      timestamp: "2024-01-14 10:45",
      unread: false,
      resolved: true,
      messages: [],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversation,
  );

  const handleSendReply = () => {
    if (replyText.trim() && currentConversation) {
      setConversations(
        conversations.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: conv.messages.length + 1,
                    sender: "admin",
                    text: replyText,
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
                lastMessage: replyText,
                timestamp: new Date().toLocaleString(),
              }
            : conv,
        ),
      );
      setReplyText("");
    }
  };

  const handleDeleteConversation = (id: number) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  const handleMarkResolved = (id: number) => {
    setConversations(
      conversations.map((c) =>
        c.id === id ? { ...c, resolved: !c.resolved } : c,
      ),
    );
  };

  const unresolvedCount = conversations.filter((c) => !c.resolved).length;

  return (
    <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
      {/* Conversations List */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col overflow-hidden bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        {/* Search */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg glass border border-white/10 bg-white/5 text-foreground text-sm focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto space-y-1 p-2">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                selectedConversation === conv.id
                  ? "bg-gradient-to-r from-indigo-600/30 to-cyan-500/30 border border-cyan-400/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-sm">
                  {conv.senderName}
                </h3>
                {conv.unread && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0"></span>
                )}
              </div>
              <p className="text-xs text-foreground/60 truncate">
                {conv.subject}
              </p>
              <p className="text-xs text-foreground/50 mt-1 truncate">
                {conv.lastMessage}
              </p>
              <p className="text-xs text-foreground/40 mt-2">
                {conv.timestamp}
              </p>
              {!conv.resolved && (
                <div className="mt-2 flex items-center gap-1 text-xs text-yellow-400">
                  <AlertCircle size={12} />
                  Pending
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {currentConversation ? (
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Conversation Header */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {currentConversation.senderName}
                </h2>
                <p className="text-sm text-foreground/60">
                  {currentConversation.senderEmail}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkResolved(currentConversation.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentConversation.resolved
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-white/10 text-foreground hover:bg-white/20"
                  }`}
                >
                  {currentConversation.resolved ? "Resolved" : "Mark Resolved"}
                </button>
                <button
                  onClick={() =>
                    handleDeleteConversation(currentConversation.id)
                  }
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-sm text-foreground/70 font-medium">
              {currentConversation.subject}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentConversation.messages.length > 0 ? (
              currentConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.sender === "admin"
                        ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                        : "glass bg-white/10 text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === "admin"
                          ? "text-white/70"
                          : "text-foreground/60"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-foreground/50">
                <MessageSquare size={32} />
              </div>
            )}
          </div>

          {/* Reply Input */}
          {!currentConversation.resolved && (
            <div className="p-6 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
              <div className="flex gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-cyan-400 transition-all resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSendReply}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-foreground/50">Select a conversation to start</p>
        </div>
      )}
    </div>
  );
}
