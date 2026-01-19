"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Minus,
  Trash2,
  User,
  FileText,
  Mail,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  suggestedReplies?: string[];
}

interface ContactFormData {
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
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
      response: "You can reach our support team via WhatsApp, Email, or Contact Form. Which would you prefer?",
      suggestedReplies: ["Contact Form", "WhatsApp", "Email"],
    },
    "contact form": {
      response:
        "Great! Our contact form is just one click away. Fill it out and our team will respond within 24 hours.",
      suggestedReplies: ["Open Form", "Back to Menu"],
    },
    "open form": {
      response: "Opening the contact form now...",
      suggestedReplies: ["Main Menu"],
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

    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let responseData = getDefaultResponse();

      for (const key in botResponses) {
        if (lowerInput.includes(key)) {
          responseData = botResponses[key];
          if (key === "open form") {
            setShowContactForm(true);
          }
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
              if (key === "open form") {
                setShowContactForm(true);
              }
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

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactFormData({
        name: "",
        email: "",
        whatsapp: "",
        subject: "",
        message: "",
      });
      setContactSubmitted(false);
      setShowContactForm(false);
    }, 2000);
  };

  return (
    <>
      {/* Chat Button - Fixed Mobile Positioning */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 w-14 h-14 sm:w-12 sm:h-12 gradient-primary rounded-full shadow-lg flex items-center justify-center hover:shadow-glow transition-all transform hover:scale-110 animate-bounce"
          title="Open Live Chat"
        >
          <MessageCircle size={24} className="text-white sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Chat Window - Fixed Mobile Positioning */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-full sm:w-96 max-w-[calc(100vw-2rem)] sm:max-w-none h-[480px] max-h-[calc(100vh-6rem)] sm:max-h-[calc(100vh-3rem)] glass rounded-lg shadow-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="gradient-primary p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-xs">EduWrites Support</h3>
                <p className="text-[10px] opacity-90">Always here to help</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={handleClearChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Clear chat"
              >
                <Trash2 size={14} className="text-white" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Minimize"
              >
                <Minus size={14} className="text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Close"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Contact Form View */}
              {showContactForm ? (
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {contactSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                      <div className="text-4xl mb-3">✓</div>
                      <h3 className="text-sm font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-xs text-foreground/70">
                        Thank you! Our team will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleContactFormSubmit}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                            <User size={12} /> Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={contactFormData.name}
                            onChange={handleContactFormChange}
                            required
                            placeholder="Your name"
                            className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                            <Mail size={12} /> Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={contactFormData.email}
                            onChange={handleContactFormChange}
                            required
                            placeholder="Your email"
                            className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                          <MessageSquare size={12} /> WhatsApp{" "}
                          <span className="text-foreground/60 font-medium text-[10px]">
                            (Optional)
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={contactFormData.whatsapp}
                          onChange={handleContactFormChange}
                          placeholder="+1 (555) 123-4567"
                          className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                          <FileText size={12} /> Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={contactFormData.subject}
                          onChange={handleContactFormChange}
                          required
                          placeholder="How can we help?"
                          className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                          <MessageCircle size={12} /> Message *
                        </label>
                        <textarea
                          name="message"
                          value={contactFormData.message}
                          onChange={handleContactFormChange}
                          required
                          placeholder="Tell us more..."
                          rows={3}
                          className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none transition-all"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-foreground rounded py-1.5 font-medium text-xs transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 gradient-primary text-white rounded py-1.5 font-medium text-xs hover:shadow-glow transition-all flex items-center justify-center gap-1"
                        >
                          Send <Send size={12} />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <>
                  {/* Messages View */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-background to-background/50">
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
                            className={`max-w-[70%] rounded-lg px-3 py-1.5 ${
                              message.sender === "user"
                                ? "gradient-primary text-white rounded-br-none"
                                : "glass text-foreground rounded-bl-none"
                            }`}
                          >
                            <p className="text-xs">{message.text}</p>
                            <span className="text-[10px] opacity-70 mt-0.5 block">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>

                        {message.sender === "bot" && message.suggestedReplies && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5 ml-1">
                            {message.suggestedReplies.map((reply, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickReply(reply)}
                                disabled={isLoading}
                                className="text-[10px] bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded-full transition-colors disabled:opacity-50 border border-cyan-500/30"
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
                        <div className="glass px-3 py-1.5 rounded-lg rounded-bl-none">
                          <div className="flex gap-0.5">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Contact Options */}
                  <div className="px-3 py-2 border-t border-white/10 flex gap-1.5">
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="flex-1 flex items-center justify-center gap-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded py-1.5 transition-colors text-[10px] font-medium border border-indigo-500/30"
                      title="Send message via form"
                    >
                      <Send size={12} />
                      Send Message
                    </button>
                    <button
                      onClick={handleWhatsAppContact}
                      className="flex-1 flex items-center justify-center gap-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded py-1.5 transition-colors text-[10px] font-medium border border-green-500/30"
                      title="Contact via WhatsApp"
                    >
                      <MessageSquare size={12} />
                      WhatsApp
                    </button>
                  </div>

                  {/* Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-3 border-t border-white/10"
                  >
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1.5 text-foreground placeholder-foreground/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50 transition-all text-xs"
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        className="gradient-primary text-white p-1.5 rounded hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
