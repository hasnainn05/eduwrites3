"use client";

import { useScrollAnimation } from "@/client/hooks/useScrollAnimation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Briefcase,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Users,
  FileText,
  Pencil,
  BarChart3,
  BookMarked,
} from "lucide-react";
import { TiltCard } from "../client/components/TiltCard";
import { useState } from "react";
import SupportModal from "@/components/SupportModal";
import { WhatsAppButton } from "@/components/WhatsAppIcon";

export default function Home() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const services = [
    {
      id: "essay",
      title: "Essay Writing",
      description:
        "Professional essay writing for all academic levels and subjects",
      Icon: FileText,
      slug: "essay",
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "assignment",
      title: "Assignment Writing",
      description:
        "Complete assignment solutions tailored to your requirements",
      Icon: CheckCircle,
      slug: "assignment",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "thesis",
      title: "Thesis Writing",
      description:
        "Expert guidance and writing support for your thesis project",
      Icon: BookOpen,
      slug: "thesis",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "research",
      title: "Research Paper",
      description: "In-depth research papers with comprehensive analysis",
      Icon: BarChart3,
      slug: "research",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "proofreading",
      title: "Proofreading & Editing",
      description:
        "Polish your academic work with expert proofreading services",
      Icon: Pencil,
      slug: "proofreading",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "dissertation",
      title: "Dissertation Writing",
      description:
        "Complete dissertation support from planning to final submission",
      Icon: BookMarked,
      slug: "dissertation",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const whyChooseUs = [
    {
      title: "Expert Academic Writers",
      description: "Professionals with advanced degrees and proven expertise",
      icon: "👨‍🎓",
    },
    {
      title: "100% Original Content",
      description: "Plagiarism-free work guaranteed with quality checks",
      icon: "✓",
    },
    {
      title: "Affordable Pricing",
      description: "Competitive rates without compromising on quality",
      icon: "💰",
    },
    {
      title: "On-Time Delivery",
      description:
        "We respect your deadlines with guaranteed timely completion",
      icon: "⏰",
    },
    {
      title: "Unlimited Revisions",
      description: "Get it perfect with as many revisions as you need",
      icon: "🔄",
    },
    {
      title: "24/7 Support",
      description: "Always available to answer your questions and concerns",
      icon: "💬",
    },
  ];

  const faqs = [
    {
      question: "Is your work plagiarism-free?",
      answer:
        "Yes, absolutely. We guarantee 100% original content. Every paper is written from scratch by our expert writers and checked with advanced plagiarism detection software before delivery.",
    },
    {
      question: "How long does it take to complete an order?",
      answer:
        "We offer flexible deadlines ranging from 24 hours to several weeks, depending on your needs. Rush orders are available for urgent submissions.",
    },
    {
      question: "Can I request revisions?",
      answer:
        "Yes! We offer unlimited revisions until you're completely satisfied with the work. Your satisfaction is our priority.",
    },
    {
      question: "How do you maintain confidentiality?",
      answer:
        "Your privacy is paramount. We keep all personal information and order details strictly confidential. Your work will never be shared with anyone.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and secure payment platforms. All transactions are encrypted for your security.",
    },
    {
      question: "Can you write in different academic styles?",
      answer:
        "Absolutely! Our writers are experienced in APA, MLA, Chicago, Harvard, and other citation styles. Just specify your requirements.",
    },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "University Student",
      content:
        "Amazing essay writing service! My paper was well-researched, properly formatted, and delivered on time. Highly recommended!",
      rating: 5,
      avatar: "AC",
    },
    {
      name: "Jamie Rodriguez",
      role: "Graduate Student",
      content:
        "Outstanding thesis assistance. The team understood my research perfectly and delivered exceptional results. Game-changer!",
      rating: 5,
      avatar: "JR",
    },
    {
      name: "Morgan Taylor",
      role: "College Student",
      content:
        "Fantastic proofreading service. My assignment was polished to perfection. The attention to detail was incredible!",
      rating: 5,
      avatar: "MT",
    },
    {
      name: "Casey Williams",
      role: "PhD Candidate",
      content:
        "Excellent research paper support. They helped organize my thoughts and deliver a paper that impressed my professor.",
      rating: 5,
      avatar: "CW",
    },
    {
      name: "Sarah Johnson",
      role: "Master's Student",
      content:
        "The dissertation writing support was exceptional. Professional writers who truly understand academic standards. Worth every penny!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Park",
      role: "Undergraduate Student",
      content:
        "Great help with my research paper. The writers provided excellent insights and the final work exceeded my expectations. Highly satisfied!",
      rating: 5,
      avatar: "MP",
    },
    {
      name: "Emily Watson",
      role: "College Student",
      content:
        "Quick turnaround, professional quality, and responsive support team. This service helped me maintain my GPA. Definitely recommending to friends!",
      rating: 5,
      avatar: "EW",
    },
    {
      name: "David Kumar",
      role: "PhD Researcher",
      content:
        "Exceptional quality in research paper writing. The team's expertise in my field was evident. Perfect collaboration from start to finish.",
      rating: 5,
      avatar: "DK",
    },
  ];

  const scrollRef = useScrollAnimation(0.15);

  return (
    <div ref={scrollRef} className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Left Content - Wider Column */}
              <div className="lg:col-span-3">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-3 py-1.5 mb-4">
                  <Star size={12} className="text-accent fill-accent" />
                  <span className="text-xs font-semibold text-foreground">
                    Trusted by 50,000+ Students
                  </span>
                </div>

                {/* Main Headline - 2 Lines */}
                <h1 className="font-bold mb-8 leading-tight font-poppins text-foreground text-2xl sm:text-3xl lg:text-4xl">
                  Achieve Academic{" "}
                  <span className="text-accent">Excellence</span> with
                  Professional Writing Services
                </h1>

                {/* Subheading */}
                <p className="text-sm text-foreground/70 mb-8 leading-relaxed max-w-2xl">
                  Professional, plagiarism-free academic writing from Ph.D.
                  experts. Essays, theses, dissertations delivered on time,
                  every time.
                </p>

                {/* Trust Indicators - Compact Row */}
                <div className="flex gap-2 mb-12">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      98%
                    </div>
                    <p className="text-xs text-foreground/70 whitespace-nowrap">
                      Customer Satisfaction
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      24/7
                    </div>
                    <p className="text-xs text-foreground/70 whitespace-nowrap">
                      Expert Support
                    </p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      50+
                    </div>
                    <p className="text-xs text-foreground/70 whitespace-nowrap">
                      Expert Writers
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started Now <ArrowRight size={20} />
                  </a>
                  <WhatsAppButton
                    phoneNumber="13658291551"
                    message="Hi, I'm interested in EduWrites services"
                    className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300"
                    showIcon={false}
                    iconSize={20}
                  >
                    Message Us
                  </WhatsAppButton>
                </div>
              </div>

              {/* Right Trust Cards - Positioned Lower */}
              <div className="flex flex-col gap-6 lg:mt-32 lg:col-span-2">
                {/* Top Row - 2 Small Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {/* 50K+ Card - Small */}
                  <div className="bg-white rounded-2xl p-5 shadow-md border border-border hover:shadow-lg transition-all">
                    <div className="text-4xl font-bold text-primary mb-2">
                      50K+
                    </div>
                    <p className="text-sm text-foreground/80 font-medium">
                      Satisfied Students
                    </p>
                    <p className="text-xs text-foreground/60 mt-2">
                      Students trust us
                    </p>
                  </div>

                  {/* 100% Card - Small */}
                  <div className="bg-white rounded-2xl p-5 shadow-md border border-border hover:shadow-lg transition-all">
                    <div className="text-4xl font-bold text-accent mb-2">
                      100%
                    </div>
                    <p className="text-sm text-foreground/80 font-medium">
                      Original Content
                    </p>
                    <p className="text-xs text-foreground/60 mt-2">
                      Plagiarism-free
                    </p>
                  </div>
                </div>

                {/* Rating Card - Full Width */}
                <div className="bg-white rounded-2xl p-8 shadow-md border border-border hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-foreground/80 font-medium">
                        4.9/5 Average Rating
                      </p>
                      <p className="text-sm text-foreground/60 mt-2">
                        From 2,500+ verified reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-poppins">
                Professional Academic Writing Support for Every Challenge
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Student success starts with quality academic work. At EduWrites,
                we understand the pressures of academic life—tight deadlines,
                complex assignments, and the need for excellence. Whether you're
                struggling with essay writing, research papers, or comprehensive
                dissertations, our expert team is here to help you succeed.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                With over a decade of experience in academic writing, we've
                helped thousands of students worldwide achieve their educational
                goals. Our writers hold advanced degrees in their respective
                fields and are committed to delivering original, high-quality
                work that meets the highest academic standards.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                From undergraduate essays to PhD dissertations, we provide
                customized academic writing solutions that are plagiarism-free,
                properly cited, and delivered on time—every time. Your academic
                success is our mission.
              </p>
            </div>

            {/* Right Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">
                  50,000+
                </div>
                <p className="text-foreground/80 font-medium">
                  Students Worldwide
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <p className="text-foreground/80 font-medium">
                  Satisfaction Rate
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-foreground/80 font-medium">
                  Expert Writers (PhDs)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              OUR SERVICES
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Comprehensive Academic Support
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Professional writing services for every academic level and
              discipline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative bg-white rounded-2xl p-8 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Icon Background Circle */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent/8 rounded-full group-hover:scale-125 transition-transform duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-accent/15 transition-all">
                    <service.Icon
                      size={32}
                      className="text-primary group-hover:text-accent transition-colors"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>

                  <p className="text-foreground/70 mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
                    Learn More{" "}
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/50 to-white/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              PRICING
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Transparent, Affordable Pricing
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose the perfect plan for your academic needs across our
              services
            </p>
          </div>

          <div className="space-y-16">
            {/* Essay Writing Pricing */}
            <div>
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-2 text-center font-poppins">
                  Essay Writing
                </h3>
                <p className="text-center text-foreground/70">
                  Professional essays for all academic levels
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Basic",
                    price: "$100",
                    features: [
                      "2000 words",
                      "Basic research",
                      "Standard formatting",
                      "1 revision",
                      "5-7 days delivery",
                    ],
                  },
                  {
                    name: "Standard",
                    price: "$250",
                    features: [
                      "5000 words",
                      "In-depth research",
                      "Premium formatting",
                      "2 revisions",
                      "3-5 days delivery",
                    ],
                    highlighted: true,
                  },
                  {
                    name: "Premium",
                    price: "$450",
                    features: [
                      "10000 words",
                      "Expert research",
                      "Complete editing",
                      "Unlimited revisions",
                      "2-3 days delivery",
                    ],
                  },
                  {
                    name: "Custom",
                    price: "Custom",
                    features: [
                      "Any word count",
                      "Specialized topics",
                      "Rush delivery",
                      "Priority support",
                      "Flexible timeline",
                    ],
                    isCustom: true,
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl transition-all duration-300 overflow-hidden border ${
                      plan.highlighted
                        ? "bg-primary text-white border-primary scale-105 shadow-xl"
                        : "bg-white border-border hover:shadow-lg hover:border-accent/30"
                    }`}
                  >
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {plan.highlighted && (
                        <div className="mb-4">
                          <span className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-bold inline-block">
                            ⭐ Most Popular
                          </span>
                        </div>
                      )}

                      <h4
                        className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-foreground"}`}
                      >
                        {plan.name}
                      </h4>

                      <div className="mb-8">
                        <span
                          className={`text-5xl font-bold ${plan.highlighted ? "text-accent" : "text-primary"}`}
                        >
                          {plan.price}
                        </span>
                      </div>

                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle
                              className={`flex-shrink-0 mt-0.5 w-4 h-4 ${
                                plan.highlighted
                                  ? "text-accent"
                                  : "text-primary"
                              }`}
                              size={16}
                            />
                            <span
                              className={
                                plan.highlighted
                                  ? "text-white/90 text-sm"
                                  : "text-foreground/80 text-sm"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/services/essay"
                        className={`w-full py-3 rounded-lg font-bold transition-all text-center ${
                          plan.highlighted
                            ? "bg-accent text-primary hover:bg-accent/90"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment Writing Pricing */}
            <div>
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-foreground mb-2 text-center font-poppins">
                  Assignment Writing
                </h3>
                <p className="text-center text-foreground/70">
                  Complete assignment solutions for all types
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Basic",
                    price: "$100",
                    features: [
                      "2000 words",
                      "Standard complexity",
                      "Single revision",
                      "5-7 days delivery",
                      "Email support",
                    ],
                  },
                  {
                    name: "Standard",
                    price: "$250",
                    features: [
                      "5000 words",
                      "Medium complexity",
                      "2 revisions",
                      "3-5 days delivery",
                      "Priority support",
                    ],
                    highlighted: true,
                  },
                  {
                    name: "Premium",
                    price: "$450",
                    features: [
                      "10000 words",
                      "Complex assignments",
                      "Unlimited revisions",
                      "2-3 days delivery",
                      "24/7 dedicated support",
                    ],
                  },
                  {
                    name: "Custom",
                    price: "Custom",
                    features: [
                      "Any assignment type",
                      "Custom requirements",
                      "Rush delivery available",
                      "Personal writer assignment",
                      "Flexible payment options",
                    ],
                    isCustom: true,
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl transition-all duration-300 overflow-hidden border ${
                      plan.highlighted
                        ? "bg-primary text-white border-primary scale-105 shadow-xl"
                        : "bg-white border-border hover:shadow-lg hover:border-accent/30"
                    }`}
                  >
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {plan.highlighted && (
                        <div className="mb-4">
                          <span className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-bold inline-block">
                            ⭐ Most Popular
                          </span>
                        </div>
                      )}

                      <h4
                        className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-foreground"}`}
                      >
                        {plan.name}
                      </h4>

                      <div className="mb-8">
                        <span
                          className={`text-5xl font-bold ${plan.highlighted ? "text-accent" : "text-primary"}`}
                        >
                          {plan.price}
                        </span>
                      </div>

                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle
                              className={`flex-shrink-0 mt-0.5 w-4 h-4 ${
                                plan.highlighted
                                  ? "text-accent"
                                  : "text-primary"
                              }`}
                              size={16}
                            />
                            <span
                              className={
                                plan.highlighted
                                  ? "text-white/90 text-sm"
                                  : "text-foreground/80 text-sm"
                              }
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/services/assignment"
                        className={`w-full py-3 rounded-lg font-bold transition-all text-center ${
                          plan.highlighted
                            ? "bg-accent text-primary hover:bg-accent/90"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-foreground/80 mb-8">
                Want to see pricing for other services?
              </p>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-glow transition-all transform hover:scale-105"
              >
                Explore All Services <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              SUCCESS STORIES
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Our Impact
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              See how we've helped students achieve academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Enterprise Leadership Development",
                subtitle: "C-Suite Executive Strategy",
                client: "Fortune 500 Tech Company",
                metric: "3 Executive Promotions",
                description:
                  "Developed comprehensive leadership documentation and strategic white papers for executive team members. Enhanced corporate communication and positioning in industry leadership.",
                color: "from-blue-500 to-cyan-500",
                Icon: Briefcase,
              },
              {
                title: "Academic Research Excellence",
                subtitle: "Peer-Reviewed Publications",
                client: "Stanford University Research Lab",
                metric: "12 Published Papers",
                description:
                  "Supported research documentation and manuscript preparation across multiple disciplines. Contributed to significant breakthroughs in clinical research and academic advancement.",
                color: "from-purple-500 to-pink-500",
                Icon: BookOpen,
              },
              {
                title: "Corporate Innovation Strategy",
                subtitle: "Strategic Documentation",
                client: "Global Consulting Firm",
                metric: "$15M Client Value",
                description:
                  "Elevated consulting deliverables with professionally crafted strategic reports and business documentation. Directly contributed to securing major enterprise contracts.",
                color: "from-green-500 to-emerald-500",
                Icon: TrendingUp,
              },
              {
                title: "Graduate Excellence Program",
                subtitle: "Advanced Degree Completion",
                client: "International MBA Cohort",
                metric: "98% Distinction Rate",
                description:
                  "Supported 200+ graduate students in thesis and dissertation completion. Achieved industry-leading completion rates with distinction-level academic performance.",
                color: "from-yellow-500 to-orange-500",
                Icon: Award,
              },
              {
                title: "Professional Credentialing",
                subtitle: "Certification Support",
                client: "Financial Services Sector",
                metric: "450+ Professionals Certified",
                description:
                  "Helped financial professionals complete advanced certifications while maintaining careers. 99% pass rate with enhanced professional credentials and career advancement.",
                color: "from-indigo-500 to-purple-500",
                Icon: Zap,
              },
              {
                title: "Enterprise Communication",
                subtitle: "Internal & External Reports",
                client: "Healthcare Organization",
                metric: "100+ Strategic Documents",
                description:
                  "Produced compliance documentation, regulatory reports, and strategic communications. Enhanced organizational credibility and regulatory standing with professional documentation.",
                color: "from-rose-500 to-pink-500",
                Icon: Users,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-border hover:shadow-lg hover:border-accent/30 overflow-hidden transition-all duration-500"
              >
                <div className="relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-accent/15 transition-all">
                      <project.Icon size={28} className="text-primary" />
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">
                      {project.metric}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4 font-medium">
                    {project.subtitle}
                  </p>

                  <p className="text-foreground/80 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-foreground/60 mb-1">
                        Client Organization
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {project.client}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-foreground/70 mb-6">
              Your next success story could be here. Let us help you achieve
              your academic goals.
            </p>
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all transform hover:scale-105"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Education Levels & Fields of Study Section */}
      <section className="relative py-24 sm:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              EXPERTISE
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Coverage Across All Levels & Disciplines
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              From high school essays to PhD dissertations, we support every
              academic level and discipline
            </p>
          </div>

          {/* Education Levels */}
          <div className="mb-32">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              Education Levels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  level: "High School",
                  description: "Essays, reports, projects",
                  icon: "🎒",
                },
                {
                  level: "Undergraduate",
                  description: "Essays, assignments, projects",
                  icon: "🎓",
                },
                {
                  level: "Master's Degree",
                  description: "Thesis, research papers, projects",
                  icon: "📚",
                },
                {
                  level: "PhD & Doctorate",
                  description: "Dissertations, research papers",
                  icon: "🏆",
                },
                {
                  level: "Professional",
                  description: "Certifications, reports, publications",
                  icon: "💼",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h4 className="font-bold text-foreground text-lg mb-3">
                    {item.level}
                  </h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Universities Section */}
          <div className="mb-32">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              Trusted by Top University Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  region: "United States",
                  icon: "🇺🇸",
                  universities: [
                    "Harvard",
                    "Stanford",
                    "MIT",
                    "Yale",
                    "Princeton",
                    "UC Berkeley",
                  ],
                },
                {
                  region: "United Kingdom",
                  icon: "🇬🇧",
                  universities: [
                    "Oxford",
                    "Cambridge",
                    "LSE",
                    "Imperial",
                    "UCL",
                    "Edinburgh",
                  ],
                },
                {
                  region: "Europe",
                  icon: "🇪🇺",
                  universities: [
                    "ETH Zurich",
                    "Sorbonne",
                    "TU Munich",
                    "Amsterdam",
                    "Copenhagen",
                    "Uppsala",
                  ],
                },
                {
                  region: "International",
                  icon: "🌍",
                  universities: [
                    "University of Toronto",
                    "University of Melbourne",
                    "NUS Singapore",
                    "University of Tokyo",
                    "ANU",
                    "Seoul National",
                  ],
                },
              ].map((region, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{region.icon}</span>
                    <h4 className="font-bold text-foreground text-xl">
                      {region.region}
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {region.universities.map((uni, uIdx) => (
                      <div key={uIdx} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        <span className="text-sm text-foreground/85">
                          {uni}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Support */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              Multi-Language Support
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {[
                { lang: "English (US)", flag: "🇺🇸" },
                { lang: "English (UK)", flag: "🇬🇧" },
                { lang: "French", flag: "🇫🇷" },
                { lang: "German", flag: "🇩🇪" },
                { lang: "Italian", flag: "🇮🇹" },
                { lang: "Dutch", flag: "🇳🇱" },
              ].map((lang, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 text-center"
                >
                  <p className="text-5xl mb-3">{lang.flag}</p>
                  <p className="font-semibold text-foreground text-sm">
                    {lang.lang}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fields of Study - All Disciplines */}
          <div className="mt-32">
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
              All Fields of Study
            </h3>
            <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto text-base leading-relaxed">
              Comprehensive coverage of all academic disciplines
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {[
                { category: "Computer Science & IT", icon: "💻" },
                { category: "Business & Finance", icon: "💼" },
                { category: "Engineering", icon: "⚙️" },
                { category: "Medicine & Healthcare", icon: "🏥" },
                { category: "Law & Legal Studies", icon: "⚖️" },
                { category: "Psychology & Social Sciences", icon: "🧠" },
                { category: "Environmental Science", icon: "🌍" },
                { category: "Humanities & Literature", icon: "📚" },
                { category: "Arts & Design", icon: "🎨" },
              ].map((field, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 border border-border hover:shadow-md hover:border-accent/30 transition-all duration-300 text-center"
                >
                  <span className="text-2xl block mb-2">{field.icon}</span>
                  <h4 className="text-xs font-semibold text-foreground leading-tight">
                    {field.category}
                  </h4>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-8 bg-white rounded-xl border border-border text-center">
              <h3 className="text-lg font-bold text-foreground mb-3">
                Can't Find Your Field?
              </h3>
              <p className="text-foreground/80 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
                Our expert writers cover virtually every academic discipline. If
                your field isn't listed, we still support it.
              </p>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              WHY CHOOSE US
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Why EduWrites?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We combine expertise, reliability, and dedication to your academic
              success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                style={{ animationDelay: `${(index % 3) * 0.1}s` }}
              >
                <div className="flex-shrink-0 text-5xl mb-4">{item.icon}</div>

                <h3 className="font-bold text-foreground mb-3 text-lg">
                  {item.title}
                </h3>

                <p className="text-sm text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              What Our Students Say
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Real feedback from students who've improved their grades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>

                <p className="text-foreground/80 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-white flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-foreground/60">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Background gradient */}
          <div className="absolute -inset-20 bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10 rounded-3xl -z-10"></div>

          <div className="bg-white rounded-3xl border border-border p-12 sm:p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-poppins">
              Ready to Achieve Academic Excellence?
            </h2>

            <p className="text-lg text-foreground/70 mb-12 max-w-2xl mx-auto">
              Join 50,000+ students who've improved their grades with EduWrites.
              Get started with a free consultation today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300"
              >
                Start Your Project <ArrowRight size={20} />
              </Link>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-10 py-4 rounded-lg font-bold hover:bg-primary/5 transition-all duration-300"
              >
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Common Questions
            </h2>
            <p className="text-lg text-foreground/70">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center transition-transform duration-300 ${expandedFAQ === index ? "rotate-180" : ""}`}
                    >
                      <svg
                        className="w-4 h-4 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {expandedFAQ === index && (
                  <div className="px-6 pb-6 border-t border-border">
                    <p className="text-foreground/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-foreground/70 mb-6">
              Still have questions? Our support team is here to help.
            </p>
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-all duration-300"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
}
