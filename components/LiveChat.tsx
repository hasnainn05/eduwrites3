"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Minus,
  ExternalLink,
  Trash2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Mail, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestedReplies?: string[];
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 Welcome to EduWrites. How can we help you today?",
      sender: "bot",
      timestamp: new Date(),
      suggestedReplies: [
        "Place an Order",
        "Check Status",
        "Get Info",
        "Contact Support",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: {
    [key: string]: { response: string; suggestedReplies: string[] };
  } = {
    "place an order": {
      response:
        "Great! You can place an order directly from our website. Our experts handle essay writing, research papers, homework, case studies, and more. What type of service are you interested in?",
      suggestedReplies: [
        "Essay Writing",
        "Research Papers",
        "Homework Help",
        "Other Services",
      ],
    },
    "essay writing": {
      response:
        "Our Essay Writing service covers all academic levels. We provide original, plagiarism-free essays. Would you like to know about pricing or ready to place an order?",
      suggestedReplies: [
        "Check Pricing",
        "Place Order Now",
        "Ask More Questions",
      ],
    },
    "research papers": {
      response:
        "We specialize in well-researched, properly formatted research papers. Our writers have expertise across all subjects. Want to know more details or place an order?",
      suggestedReplies: ["More Details", "Place Order Now", "Talk to Support"],
    },
    "homework help": {
      response:
        "We provide comprehensive homework assistance for all subjects and academic levels. Quick turnaround times available. Ready to proceed?",
      suggestedReplies: ["See Pricing", "Order Now", "Need Help"],
    },
    "check status": {
      response:
        "To check your order status, please log into your profile. You'll find all your active orders and their progress there. Need help logging in?",
      suggestedReplies: ["Reset Password", "Contact Support", "View My Orders"],
    },
    "get info": {
      response:
        "We offer writing services for essays, research papers, homework, case studies, and more. All work is original, plagiarism-checked, and delivered on time. What else would you like to know?",
      suggestedReplies: [
        "Pricing",
        "Guarantees",
        "How We Work",
        "Contact Support",
      ],
    },
    "contact support": {
      response:
        "You can reach our support team via WhatsApp, Email, or through our contact form. What's your preferred method?",
      suggestedReplies: ["WhatsApp", "Email", "Contact Form"],
    },
    whatsapp: {
      response:
        "Our WhatsApp number is +1 365 8291551. You can reach us instantly for quick responses!",
      suggestedReplies: ["Open WhatsApp", "Use Email Instead", "Back to Menu"],
    },
    email: {
      response:
        "You can email us at info@eduwrites.com. We'll get back to you within 24 hours.",
      suggestedReplies: ["Contact Form", "WhatsApp Instead", "Back to Menu"],
    },
    "contact form": {
      response:
        "Our contact form is available on our Contact Us page. You can submit your inquiry and we'll respond promptly.",
      suggestedReplies: ["Go to Contact Page", "Use WhatsApp", "Use Email"],
    },
    pricing: {
      response:
        "Our pricing varies based on the service type, urgency, and academic level. Visit our Services page to see detailed pricing for each service.",
      suggestedReplies: ["View Services", "Ask About Discounts", "Place Order"],
    },
    guarantees: {
      response:
        "We guarantee: ✅ Original work, ✅ On-time delivery, ✅ Plagiarism-free content, ✅ Revision support. Your satisfaction is our priority!",
      suggestedReplies: ["How We Work", "Place Order", "Other Questions"],
    },
    "how we work": {
      response:
        "Simple process: 1) You place an order with details, 2) Expert writers claim your project, 3) We deliver before deadline, 4) You review and request revisions if needed.",
      suggestedReplies: ["Place Order", "Ask Questions", "Contact Support"],
    },
    "other services": {
      response:
        "Beyond essays and research papers, we also handle case studies, dissertations, homework, and more. Which service interests you?",
      suggestedReplies: [
        "Case Studies",
        "Dissertations",
        "Homework",
        "View All",
      ],
    },
  };

  const getDefaultResponse = () => {
    return {
      response:
        "Thanks for reaching out! We're available 24/7. Can I help you with anything else?",
      suggestedReplies: [
        "Place an Order",
        "Check Status",
        "Get Info",
        "Contact Support",
      ],
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let responseData = getDefaultResponse();

      // Find matching response
      for (const key in botResponses) {
        if (lowerInput.includes(key)) {
          responseData = botResponses[key];
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.response,
        sender: "bot",
        timestamp: new Date(),
        suggestedReplies: responseData.suggestedReplies,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => {
      const form = document.querySelector("form");
      const submitButton = form?.querySelector(
        "button[type='submit']",
      ) as HTMLButtonElement;
      if (submitButton) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: reply,
            sender: "user",
            timestamp: new Date(),
          },
        ]);
        setInputValue("");
        setIsLoading(true);

        setTimeout(() => {
          const lowerInput = reply.toLowerCase();
          let responseData = getDefaultResponse();

          for (const key in botResponses) {
            if (lowerInput.includes(key)) {
              responseData = botResponses[key];
              break;
            }
          }

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseData.response,
            sender: "bot",
            timestamp: new Date(),
            suggestedReplies: responseData.suggestedReplies,
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsLoading(false);
        }, 800);
      }
    }, 0);
  };

  const handleClearChat = () => {
    if (confirm("Clear chat history?")) {
      setMessages([
        {
          id: "1",
          text: "Hi! 👋 Welcome to EduWrites. How can we help you today?",
          sender: "bot",
          timestamp: new Date(),
          suggestedReplies: [
            "Place an Order",
            "Check Status",
            "Get Info",
            "Contact Support",
          ],
        },
      ]);
    }
  };

  const handleWhatsAppContact = () => {
    window.open(
      "https://wa.me/13658291551?text=Hi%2C%20I%27m%20interested%20in%20EduWrites%20services",
      "_blank",
    );
  };

  const handleEmailContact = () => {
    window.location.href =
      "mailto:info@eduwrites.com?subject=Inquiry%20from%20EduWrites%20Chat";
  };

  const lastBotMessage = messages.filter((m) => m.sender === "bot").pop();

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 gradient-primary rounded-full shadow-2xl flex items-center justify-center hover:shadow-glow transition-all transform hover:scale-110 animate-bounce"
          title="Open Live Chat"
        >
          <MessageCircle size={28} className="text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="gradient-primary p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-sm">EduWrites Support</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Clear chat"
              >
                <Trash2 size={16} className="text-white" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Minimize"
              >
                <Minus size={16} className="text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Close"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-background/50">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      } animate-in fade-in slide-in-from-bottom-3`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "gradient-primary text-white rounded-br-none"
                            : "glass text-foreground rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Suggested Replies */}
                    {message.sender === "bot" && message.suggestedReplies && (
                      <div className="flex flex-wrap gap-2 mt-2 ml-1">
                        {message.suggestedReplies.map((reply, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(reply)}
                            disabled={isLoading}
                            className="text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-3 py-1 rounded-full transition-colors disabled:opacity-50 border border-cyan-500/30"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="glass px-4 py-2 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Contact Options */}
              <div className="px-4 py-3 border-t border-white/10 flex gap-2">
                <button
                  onClick={handleWhatsAppContact}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg py-2 transition-colors text-xs font-medium border border-green-500/30"
                  title="Contact via WhatsApp"
                >
                  <MessageSquare size={14} />
                  WhatsApp
                </button>
                <button
                  onClick={handleEmailContact}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg py-2 transition-colors text-xs font-medium border border-blue-500/30"
                  title="Contact via Email"
                >
                  <Mail size={14} />
                  Email
                </button>
              </div>

              {/* Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-white/10"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isLoading}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="gradient-primary text-white p-2 rounded-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
