"use client";

import { useState } from "react";
import {
  Send,
  MessageSquare,
  Trash2,
  Search,
  AlertCircle,
  X,
  Check,
} from "lucide-react";

export default function AdminLiveChat() {
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
  const [mobileShowChat, setMobileShowChat] = useState(false);

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
                unread: false,
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
      setMobileShowChat(false);
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
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row bg-slate-50 gap-0 md:gap-4 p-0 md:p-4">
      {/* Conversations List - Hidden on mobile when chat is open */}
      <div
        className={`w-full lg:w-96 flex flex-col bg-white rounded-none md:rounded-lg border-b md:border border-slate-200 overflow-hidden ${
          mobileShowChat ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="mb-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Live Chat
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {unresolvedCount} active conversation
              {unresolvedCount !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv.id);
                  setMobileShowChat(true);
                }}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors border-l-4 ${
                  selectedConversation === conv.id
                    ? "border-l-blue-600 bg-slate-50"
                    : "border-l-transparent"
                } ${conv.unread ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm truncate">
                      {conv.senderName}
                    </h3>
                  </div>
                  {conv.unread && (
                    <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-blue-600 mt-1"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 truncate mb-1">
                  {conv.subject}
                </p>
                <p className="text-xs text-slate-500 truncate mb-2">
                  {conv.lastMessage}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">{conv.timestamp}</p>
                  {!conv.resolved ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-50 text-yellow-700 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0"></span>
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium">
                      <Check size={12} />
                      Closed
                    </span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      {currentConversation ? (
        <div className="flex-1 flex flex-col bg-white rounded-none md:rounded-lg border border-slate-200 overflow-hidden min-w-0">
          {/* Conversation Header */}
          <div className="p-4 md:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="min-w-0">
                <h2 className="text-lg md:text-2xl font-bold text-slate-900 truncate">
                  {currentConversation.senderName}
                </h2>
                <p className="text-sm text-slate-600 truncate">
                  {currentConversation.senderEmail}
                </p>
              </div>
              <button
                onClick={() => setMobileShowChat(false)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-slate-700 font-medium line-clamp-2">
                {currentConversation.subject}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkResolved(currentConversation.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0 ${
                    currentConversation.resolved
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <Check size={16} />
                  <span className="hidden sm:inline">
                    {currentConversation.resolved ? "Closed" : "Mark Closed"}
                  </span>
                </button>
                <button
                  onClick={() =>
                    handleDeleteConversation(currentConversation.id)
                  }
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 border border-red-100 transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-white to-slate-50">
            {currentConversation.messages.length > 0 ? (
              currentConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"} gap-3`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                      msg.sender === "admin"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === "admin"
                          ? "text-blue-100"
                          : "text-slate-600"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-slate-500">
                <MessageSquare size={40} className="text-slate-300 mb-3" />
                <p className="text-sm">No messages yet</p>
              </div>
            )}
          </div>

          {/* Reply Input */}
          {!currentConversation.resolved && (
            <div className="p-4 md:p-6 border-t border-slate-200 bg-white">
              <div className="flex flex-col gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none text-sm"
                  rows={3}
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="self-end px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-white rounded-lg border border-slate-200">
          <div className="text-center">
            <MessageSquare size={48} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">
              Select a conversation to start
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
