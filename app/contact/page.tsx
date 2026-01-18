"use client";

import Link from "next/link";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  User,
  FileText,
  Send,
} from "lucide-react";
import { useState } from "react";
import { TiltCard } from "@/client/components/TiltCard";
import { Canvas3DWrapper } from "@/client/components/Canvas3DWrapper";

export default function Contact() {
  const [formData, setFormData] = useState({
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
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      description: "Send us a message anytime",
      contact: "info@eduwrites.com",
      link: "mailto:info@eduwrites.com",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "WhatsApp",
      description: "Chat with us on WhatsApp",
      contact: "+1 365 8291551",
      link: "https://wa.me/13658291551",
    },
    {
      icon: <MapPin size={24} />,
      title: "Office",
      description: "Visit us in person",
      contact: "123 Business Ave, Suite 100",
      link: "#",
    },
    {
      icon: <Clock size={24} />,
      title: "Hours",
      description: "We're available 24/7",
      contact: "Round the clock support",
      link: "#",
    },
  ];

  const faqItems = [
    {
      question: "How quickly can you complete my order?",
      answer:
        "We offer various turnaround times from rush (24 hours) to standard (7-10 days). The timeline depends on the complexity and length of your assignment. You can specify your deadline when placing an order.",
    },
    {
      question: "Is my work guaranteed to be plagiarism-free?",
      answer:
        "Yes, 100%. All our work is original and written from scratch. We use plagiarism detection software to verify every submission before delivery.",
    },
    {
      question: "Can I communicate with my assigned writer?",
      answer:
        "Absolutely. You can send messages to your assigned writer through our platform to provide feedback, ask questions, or make adjustments to your order.",
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer:
        "We offer unlimited revisions within 14 days of delivery. If you're still not satisfied, we offer a full refund or a complete rewrite with a different writer.",
    },
    {
      question: "How do you ensure confidentiality?",
      answer:
        "Your privacy is our top priority. We use industry-standard encryption and never share your personal information. All transactions are secure and confidential.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.",
    },
  ];

  return (
    <div className="w-full">
      {/* 3D Canvas Background */}
      <Canvas3DWrapper />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent"></div>
        <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl sm:text-8xl font-bold text-foreground mb-6 font-poppins leading-tight">
              Get in Touch with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                EduWrites
              </span>
            </h1>
            <p className="text-2xl text-foreground/90 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              Have questions about our services? Want to discuss your academic
              needs? We're here to help. Get in touch with our team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const isExternal = method.link.startsWith("http");
              return (
                <TiltCard key={index} className="h-full">
                  <a
                    href={method.link}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="bg-white border-4 border-border p-8 rounded-2xl hover:shadow-lg transition-all text-center group h-full flex flex-col justify-center shadow-md"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="text-cyan-400 group-hover:scale-110 transition-transform text-5xl">
                        {method.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {method.title}
                    </h3>
                    <p className="text-base text-foreground/80 mb-4 font-medium">
                      {method.description}
                    </p>
                    <p className="text-lg font-bold text-cyan-400">
                      {method.contact}
                    </p>
                  </a>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="glass p-12 rounded-2xl text-center">
              <div className="text-6xl mb-6">✓</div>
              <h2 className="text-3xl font-bold text-foreground mb-4 font-poppins">
                Message Sent Successfully!
              </h2>
              <p className="text-foreground/80 mb-6">
                Thank you for reaching out. We'll get back to you as soon as
                possible.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="bg-white border-4 border-border p-10 sm:p-14 rounded-2xl shadow-lg">
              <h2 className="text-4xl font-bold text-foreground mb-3 font-poppins">
                Send us a Message
              </h2>
              <p className="text-foreground/85 mb-8 text-lg font-medium">
                Fill out the form below and we'll respond to you within 24
                hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold text-foreground/95 mb-2 flex items-center gap-2">
                      <User size={18} />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-foreground/95 mb-2 flex items-center gap-2">
                      <Mail size={18} />
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-bold text-foreground/95 mb-2 flex items-center gap-2">
                    <MessageCircle size={18} />
                    WhatsApp Number{" "}
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
                    className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-foreground/95 mb-2 flex items-center gap-2">
                    <FileText size={18} />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-foreground/95 mb-2 flex items-center gap-2">
                    <MessageCircle size={18} />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your inquiry or issue..."
                    rows={5}
                    className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-primary text-white py-4 rounded-xl font-bold hover:shadow-glow transition-all transform hover:scale-105 duration-300 flex items-center justify-center gap-2 animate-pulse-bounce"
                >
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center font-poppins">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="bg-white rounded-xl border-3 border-border p-6 hover:shadow-md transition-all group cursor-pointer shadow-sm"
              >
                <summary className="flex gap-4 items-start text-xl font-bold text-foreground hover:text-cyan-400 transition-colors">
                  <MessageSquare
                    size={24}
                    className="flex-shrink-0 mt-1 text-cyan-400"
                  />
                  <span>{item.question}</span>
                </summary>
                <p className="text-foreground/85 mt-4 ml-6 leading-relaxed text-lg font-medium">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 blur-gradient bg-gradient-to-r from-purple-600 to-transparent opacity-40 top-0 left-0 -z-10"></div>
        <div className="absolute inset-0 blur-gradient bg-gradient-to-l from-cyan-600 to-transparent opacity-40 bottom-0 right-0 -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 font-poppins">
            Ready to Get Started?
          </h2>

          <p className="text-lg text-foreground/80 mb-12">
            Don't let academic stress hold you back. Let EduWrites help you
            achieve your academic goals.
          </p>

          <Link
            href="/order"
            className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-glow transition-all transform hover:scale-105"
          >
            Place an Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}
