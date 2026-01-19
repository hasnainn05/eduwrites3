"use client";

import { useState } from "react";
import { X, Send, MessageCircle, User, Mail, FileText } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Chat Button - Fixed Mobile Positioning */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 sm:w-12 sm:h-12 gradient-primary rounded-full shadow-lg flex items-center justify-center hover:shadow-glow transition-all transform hover:scale-110 animate-bounce"
          title="Get Support"
        >
          <MessageCircle size={24} className="text-white sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Support Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-3">
          <div className="bg-white rounded-lg p-4 sm:p-5 max-w-sm w-full max-h-[85vh] overflow-y-auto border-2 border-border shadow-lg animate-in fade-in scale-in">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground font-poppins">
                    Get Support
                  </h2>
                  <p className="text-xs text-foreground/70 font-medium">
                    We're here to help 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary/10 rounded-lg transition-all"
              >
                <X size={16} className="text-foreground" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="text-sm font-bold text-foreground mb-2 font-poppins">
                  Message Sent!
                </h3>
                <p className="text-foreground/80 text-xs font-medium">
                  Thank you! Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                      <User size={12} />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white border-2 border-border rounded-lg px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                      <Mail size={12} />
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-white border-2 border-border rounded-lg px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-colors font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                    <MessageCircle size={12} />
                    WhatsApp{" "}
                    <span className="text-foreground/60 font-medium">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-white border-2 border-border rounded-lg px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                    <FileText size={12} />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full bg-white border-2 border-border rounded-lg px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground/95 mb-1 flex items-center gap-1">
                    <MessageCircle size={12} />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more..."
                    rows={3}
                    className="w-full bg-white border-2 border-border rounded-lg px-2 py-1.5 text-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-2 transition-colors resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-primary text-white py-2 rounded-lg font-bold text-xs hover:shadow-glow transition-all transform hover:scale-105 duration-300 flex items-center justify-center gap-1"
                >
                  Send Message <Send size={12} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
