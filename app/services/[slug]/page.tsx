"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  X,
  FileText,
  BarChart3,
  BookOpen,
  Pencil,
  BookMarked,
  type LucideIcon,
} from "lucide-react";
import { TiltCard } from "@/client/components/TiltCard";
import { Canvas3DWrapper } from "@/client/components/Canvas3DWrapper";
import { useState } from "react";
import SupportModal from "@/components/SupportModal";
import OrderForm from "@/components/OrderForm";

interface ServiceData {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  heroGradient: string;
  aboutTitle: string;
  aboutContent: string;
  featuresTitle: string;
  features: string[];
  pricing: {
    name: string;
    price: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
    isCustom?: boolean;
  }[];
  ctaText: string;
  ctaSubtext: string;
  stats: {
    projectsCompleted: number;
    customerReviews: number;
    averageRating: number;
    clientSatisfaction: string;
  };
  reviews: {
    author: string;
    avatar: string;
    rating: number;
    text: string;
    course: string;
    verified: boolean;
  }[];
}

const servicesData: Record<string, ServiceData> = {
  essay: {
    title: "Essay Writing",
    subtitle: "Professional Academic Writing Services",
    Icon: FileText,
    heroGradient: "from-blue-50 to-indigo-50",
    aboutTitle: "About Our Professional Essay Writing Service",
    aboutContent:
      "Our professional essay writing service provides high-quality, plagiarism-free essays for all academic levels, from high school to graduate programs. We understand the pressure students face when juggling multiple assignments, and our expert essay writing team is here to help you succeed. Our professional essay writers have advanced degrees across various disciplines and specialize in crafting compelling, original essays that showcase your academic potential. Whether you need help with argumentative essays, analytical papers, narrative compositions, or research-based essays, our professional writers have the expertise to deliver work that exceeds expectations and demonstrates deep understanding of your subject matter. With fast essay writing turnaround times and affordable essay writing rates, we make professional academic support accessible to all students seeking essay help online.",
    featuresTitle: "What's Included in Our Service",
    features: [
      "Original, plagiarism-free content",
      "Expert writers with subject expertise",
      "Proper citation and referencing",
      "Multiple revision rounds",
      "On-time delivery guarantee",
      "Confidential and secure process",
      "24/7 customer support",
      "Quality assurance checks",
    ],
    pricing: [
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
        cta: "Order Now",
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
        cta: "Order Now",
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
        cta: "Order Now",
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
        cta: "Request Quote",
        isCustom: true,
      },
    ],
    ctaText: "Ready to Order Your Essay?",
    ctaSubtext:
      "Get started today and receive your professionally written essay",
    stats: {
      projectsCompleted: 5700,
      customerReviews: 4468,
      averageRating: 4.9,
      clientSatisfaction: "97%",
    },
    reviews: [
      {
        author: "Sarah Mitchell",
        avatar: "SM",
        rating: 5,
        text: "Exceptional essay! Well-researched, original, and delivered on time. The quality exceeded my expectations. Highly recommend!",
        course: "English Literature",
        verified: true,
      },
      {
        author: "Marcus Johnson",
        avatar: "MJ",
        rating: 5,
        text: "Perfect essay submission. The writer understood the assignment completely and delivered something truly impressive. Best service ever!",
        course: "Academic Writing",
        verified: true,
      },
      {
        author: "Emma Chen",
        avatar: "EC",
        rating: 5,
        text: "Fantastic work on my argumentative essay. The structure was logical, the arguments were compelling, and the citations were flawless.",
        course: "Philosophy",
        verified: true,
      },
      {
        author: "James Wilson",
        avatar: "JW",
        rating: 4,
        text: "Great essay, minor revisions needed but they were made quickly. Very satisfied with the quality and turnaround time.",
        course: "History",
        verified: true,
      },
      {
        author: "Lisa Anderson",
        avatar: "LA",
        rating: 5,
        text: "Amazing analytical essay! The writer broke down complex concepts beautifully. Definitely using this service again!",
        course: "English Studies",
        verified: true,
      },
      {
        author: "David Kumar",
        avatar: "DK",
        rating: 5,
        text: "Fast turnaround, excellent quality. My essay was plagiarism-free and well-cited. Exceeded all my requirements!",
        course: "General Essays",
        verified: true,
      },
    ],
  },
  research: {
    title: "Research Paper",
    subtitle: "In-Depth Research and Academic Excellence",
    Icon: BarChart3,
    heroGradient: "from-purple-50 to-pink-50",
    aboutTitle: "Professional Research Paper Writing Service",
    aboutContent:
      "Our professional research paper writing service specializes in comprehensive academic research projects that require rigorous investigation and scholarly analysis. We provide expert research paper help with experienced research writers who have expertise across all major academic disciplines including sciences, humanities, social sciences, business, and technology. Our research paper writing process involves conducting extensive literature reviews using peer-reviewed sources, developing original research arguments, and presenting well-structured research analyses. Each research paper is meticulously documented with proper citations and references, whether you require APA, MLA, Chicago, or any other format. We excel at identifying credible research sources, synthesizing complex research information, and producing research papers that demonstrate advanced critical thinking and original contribution to your field of study. Get professional research paper help online with affordable research paper writing services.",
    featuresTitle: "What's Included in Our Service",
    features: [
      "Comprehensive literature review",
      "Original research and analysis",
      "Proper academic citations (APA, MLA, Chicago)",
      "Peer-reviewed source integration",
      "Detailed outlines and drafts",
      "Multiple revision rounds",
      "Plagiarism scanning",
      "Expert academic writers",
    ],
    pricing: [
      {
        name: "Basic",
        price: "$100",
        features: [
          "2000 words",
          "Standard research depth",
          "Basic citations",
          "1 revision",
          "7-10 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Standard",
        price: "$250",
        features: [
          "5000 words",
          "In-depth research",
          "Multiple sources",
          "2 revisions",
          "5-7 days delivery",
        ],
        cta: "Order Now",
        highlighted: true,
      },
      {
        name: "Premium",
        price: "$450",
        features: [
          "10000 words",
          "Expert-level research",
          "20+ peer-reviewed sources",
          "Unlimited revisions",
          "3-5 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Custom",
        price: "Custom",
        features: [
          "Any word count",
          "Custom research scope",
          "Specialized topics",
          "Rush delivery available",
          "Dedicated researcher",
        ],
        cta: "Request Quote",
        isCustom: true,
      },
    ],
    ctaText: "Commission Your Research Paper",
    ctaSubtext:
      "Get a comprehensive research paper written by academic experts",
    stats: {
      projectsCompleted: 3300,
      customerReviews: 2640,
      averageRating: 4.8,
      clientSatisfaction: "96%",
    },
    reviews: [
      {
        author: "Ahmed Hassan",
        avatar: "AH",
        rating: 5,
        text: "Outstanding research paper with thorough citations and excellent source integration. Exceeded academic standards!",
        course: "Business Management",
        verified: true,
      },
      {
        author: "Dr. Rachel Miller",
        avatar: "RM",
        rating: 5,
        text: "Comprehensive research with original analysis. The writer demonstrated deep subject matter expertise. Exceptional work!",
        course: "Graduate Studies",
        verified: true,
      },
      {
        author: "Kevin Park",
        avatar: "KP",
        rating: 5,
        text: "Detailed literature review and solid methodology. The paper was well-structured and academically rigorous.",
        course: "Research Methods",
        verified: true,
      },
      {
        author: "Sophia Davis",
        avatar: "SD",
        rating: 4,
        text: "Great research paper with excellent sources. Minor formatting adjustments were needed but overall very good.",
        course: "Academic Research",
        verified: true,
      },
      {
        author: "Michael Torres",
        avatar: "MT",
        rating: 5,
        text: "Phenomenal research paper! The writer found obscure but highly relevant sources. Truly impressed with the quality!",
        course: "STEM Research",
        verified: true,
      },
      {
        author: "Jessica Brown",
        avatar: "JB",
        rating: 5,
        text: "Professional research paper with proper academic formatting. The analysis was insightful and original!",
        course: "Academic Excellence",
        verified: true,
      },
    ],
  },
  thesis: {
    title: "Thesis Writing",
    subtitle: "Complete Support for Your Academic Journey",
    Icon: BookOpen,
    heroGradient: "from-green-50 to-emerald-50",
    aboutTitle:
      "Professional Thesis Writing Service for Masters & PhD Students",
    aboutContent:
      "Our professional thesis writing service provides comprehensive, end-to-end thesis support for graduate-level research projects at Master's and PhD levels. We understand that thesis writing represents a culmination of your academic journey and requires exceptional quality, originality, and depth. Our team of experienced thesis writers and researchers work closely with you throughout every stage of the thesis writing process, from initial research design and literature review through data analysis, thesis writing, comprehensive editing, and defense preparation. We provide detailed thesis feedback, chapter-by-chapter thesis guidance, and ensure your thesis meets all institutional requirements while maintaining the highest standards of academic integrity. Whether you need professional help developing your research methodology, analyzing complex data, writing specific thesis chapters, preparing your thesis defense, or getting comprehensive thesis editing, our thesis help experts are committed to your success with affordable thesis writing services.",
    featuresTitle: "What's Included in Our Service",
    features: [
      "Research proposal development",
      "Literature review assistance",
      "Research methodology guidance",
      "Data analysis support",
      "Chapter-by-chapter writing",
      "Comprehensive editing and proofreading",
      "Proper formatting (APA, MLA, Chicago)",
      "Defense preparation materials",
    ],
    pricing: [
      {
        name: "Basic",
        price: "$100",
        features: [
          "2000 words",
          "Chapter guidance",
          "Basic research support",
          "1 revision",
          "7-10 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Standard",
        price: "$250",
        features: [
          "5000 words",
          "Comprehensive support",
          "Chapter writing assistance",
          "2 revisions",
          "5-7 days delivery",
        ],
        cta: "Order Now",
        highlighted: true,
      },
      {
        name: "Premium",
        price: "$450",
        features: [
          "10000 words",
          "Expert-level support",
          "Full chapter completion",
          "Unlimited revisions",
          "3-5 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Custom",
        price: "Custom",
        features: [
          "Tailored solutions",
          "Custom timeline",
          "Specialized expertise",
          "Ongoing support",
          "Flexible pricing",
        ],
        cta: "Request Quote",
        isCustom: true,
      },
    ],
    ctaText: "Start Your Thesis Journey Today",
    ctaSubtext:
      "Get expert assistance with your thesis or dissertation project from start to finish",
    stats: {
      projectsCompleted: 1890,
      customerReviews: 1512,
      averageRating: 4.9,
      clientSatisfaction: "98%",
    },
    reviews: [
      {
        author: "James Chen",
        avatar: "JC",
        rating: 5,
        text: "Exceptional thesis support! The writers understood my research perfectly. Delivered a comprehensive and well-organized thesis.",
        course: "Computer Science",
        verified: true,
      },
      {
        author: "Isabella Rodriguez",
        avatar: "IR",
        rating: 5,
        text: "Outstanding guidance through the entire thesis process. The chapter-by-chapter feedback was invaluable for my success.",
        course: "Engineering",
        verified: true,
      },
      {
        author: "Professor Thomas Wright",
        avatar: "TW",
        rating: 5,
        text: "Impressed with the scholarly approach and attention to methodology. Helped my student complete a high-quality thesis.",
        course: "Academic Mentoring",
        verified: true,
      },
      {
        author: "Patricia Lee",
        avatar: "PL",
        rating: 5,
        text: "Expert thesis assistance from beginning to end. The support was comprehensive and the quality exceptional!",
        course: "Graduate Program",
        verified: true,
      },
      {
        author: "Roberto Silva",
        avatar: "RS",
        rating: 4,
        text: "Great thesis writing support with helpful revisions. Very professional and responsive team throughout the process.",
        course: "Research Studies",
        verified: true,
      },
      {
        author: "Amelia Foster",
        avatar: "AF",
        rating: 5,
        text: "Comprehensive thesis support that truly made a difference. Excellent resource for graduate-level academic work!",
        course: "Advanced Studies",
        verified: true,
      },
    ],
  },
  assignment: {
    title: "Assignment Writing",
    subtitle: "Complete Assignment Solutions",
    Icon: CheckCircle,
    heroGradient: "from-purple-50 to-pink-50",
    aboutTitle: "Professional Assignment Writing Help Online",
    aboutContent:
      "Our comprehensive assignment writing service provides complete assignment solutions for all types of academic assignments. Whether you need assignment help with essays, reports, projects, case studies, or problem sets, our experienced assignment writers deliver high-quality work that meets your assignment specifications and academic standards. We handle assignments across all disciplines and academic levels, ensuring that each assignment is original, plagiarism-free, well-researched, and tailored to your specific assignment requirements. Our assignment help experts work closely with you to understand the assignment guidelines and deliver assignment solutions that demonstrate your understanding of the subject matter. Get affordable assignment writing help online today with guaranteed on-time delivery.",
    featuresTitle: "What's Included in Our Service",
    features: [
      "Complete assignment solutions",
      "Adherence to assignment guidelines",
      "Original and plagiarism-free work",
      "Expert writers in all disciplines",
      "On-time delivery guarantee",
      "Multiple revisions included",
      "Detailed explanations and workings",
      "24/7 customer support",
    ],
    pricing: [
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
        cta: "Order Now",
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
        cta: "Order Now",
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
        cta: "Order Now",
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
        cta: "Request Quote",
        isCustom: true,
      },
    ],
    ctaText: "Submit Your Assignment Now",
    ctaSubtext: "Get expert help with your assignment and improve your grades",
    stats: {
      projectsCompleted: 6840,
      customerReviews: 5780,
      averageRating: 4.8,
      clientSatisfaction: "95%",
    },
    reviews: [
      {
        author: "Lisa Thompson",
        avatar: "LT",
        rating: 5,
        text: "Perfect assignment solution! The work was detailed and met all requirements. My grade improved significantly!",
        course: "Mathematics",
        verified: true,
      },
      {
        author: "Carlos Mendez",
        avatar: "CM",
        rating: 5,
        text: "Excellent assignment help. The explanations were clear and helped me understand the material better!",
        course: "Physics",
        verified: true,
      },
      {
        author: "Nina Patel",
        avatar: "NP",
        rating: 5,
        text: "Outstanding assignment support. Delivered exactly what was needed with detailed working and proper formatting!",
        course: "Chemistry",
        verified: true,
      },
      {
        author: "Oliver Stone",
        avatar: "OS",
        rating: 4,
        text: "Good assignment solution with helpful explanations. Quick revisions when I needed clarification.",
        course: "Biology",
        verified: true,
      },
      {
        author: "Megan Hart",
        avatar: "MH",
        rating: 5,
        text: "Great assignment help for complex topics. The solutions were thorough and well-explained!",
        course: "Economics",
        verified: true,
      },
      {
        author: "Nathan Brooks",
        avatar: "NB",
        rating: 5,
        text: "Reliable assignment service with consistent quality. Delivered on time with excellent solutions!",
        course: "Statistics",
        verified: true,
      },
    ],
  },
  proofreading: {
    title: "Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    heroGradient: "from-yellow-50 to-orange-50",
    aboutTitle: "Professional Proofreading and Editing Services",
    aboutContent:
      "Our professional proofreading and editing services help polish your academic work to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your work for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your document meets the highest professional standards. We provide proofreading help and editing support for essays, research papers, theses, dissertations, and any other academic documents to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    featuresTitle: "What's Included in Our Service",
    features: [
      "Comprehensive grammar and spelling check",
      "Punctuation and syntax corrections",
      "Style and tone improvement",
      "Consistency and clarity enhancement",
      "Formatting review and correction",
      "Citation style verification",
      "Detailed feedback report",
      "Line-by-line editing",
    ],
    pricing: [
      {
        name: "Basic",
        price: "$50",
        features: [
          "2000 words",
          "Grammar and spelling only",
          "Standard turnaround",
          "5-7 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Standard",
        price: "$150",
        features: [
          "5000 words",
          "Comprehensive editing",
          "Style and clarity improvement",
          "3-5 days delivery",
        ],
        cta: "Order Now",
        highlighted: true,
      },
      {
        name: "Premium",
        price: "$250",
        features: [
          "10000 words",
          "In-depth editing",
          "Structural improvement",
          "2-3 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Custom",
        price: "Custom",
        features: [
          "Custom editing scope",
          "Specialized document types",
          "Rush service available",
          "Direct editor communication",
        ],
        cta: "Request Quote",
        isCustom: true,
      },
    ],
    ctaText: "Polish Your Document Today",
    ctaSubtext:
      "Get professional proofreading and editing to perfect your work",
    stats: {
      projectsCompleted: 8240,
      customerReviews: 6912,
      averageRating: 4.9,
      clientSatisfaction: "99%",
    },
    reviews: [
      {
        author: "Victoria Scott",
        avatar: "VS",
        rating: 5,
        text: "Excellent proofreading! Every error was caught and corrections enhanced readability. Professional and thorough!",
        course: "Document Editing",
        verified: true,
      },
      {
        author: "Henry Adams",
        avatar: "HA",
        rating: 5,
        text: "Outstanding editing service. The feedback report was incredibly detailed and helpful for improving my writing!",
        course: "Writing Excellence",
        verified: true,
      },
      {
        author: "Sophie Martin",
        avatar: "SM",
        rating: 5,
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for publication after this service!",
        course: "Academic Polish",
        verified: true,
      },
      {
        author: "Benjamin Hall",
        avatar: "BH",
        rating: 5,
        text: "Professional editing with great attention to detail. My document reads so much better now!",
        course: "Professional Writing",
        verified: true,
      },
      {
        author: "Grace Williams",
        avatar: "GW",
        rating: 5,
        text: "Meticulous proofreading service. Every aspect of my essay was refined. Excellent quality control!",
        course: "Final Polish",
        verified: true,
      },
      {
        author: "Alexander Green",
        avatar: "AG",
        rating: 5,
        text: "Comprehensive editing that transformed my document. Fast turnaround with premium quality results!",
        course: "Document Perfection",
        verified: true,
      },
    ],
  },
  dissertation: {
    title: "Dissertation Writing",
    subtitle: "Complete Doctoral Support",
    Icon: BookMarked,
    heroGradient: "from-indigo-50 to-purple-50",
    aboutTitle: "Professional Dissertation Writing Service for PhD Students",
    aboutContent:
      "Our professional dissertation writing service provides expert dissertation support for doctoral candidates pursuing PhD and professional doctorates. We understand the complexity and challenges involved in dissertation research and dissertation writing. Our team of experienced dissertation writers and academic researchers works with you at every stage of the dissertation process: from research proposal development and literature review through data collection analysis, dissertation writing, comprehensive dissertation editing, and final submission. We provide comprehensive dissertation help that maintains academic integrity while ensuring your dissertation meets the highest scholarly standards. Our dissertation writing expertise spans multiple disciplines and we have successfully supported hundreds of doctoral candidates in completing their dissertations with professional dissertation assistance and advancing their academic careers. Get professional dissertation writing help online with affordable dissertation services.",
    featuresTitle: "What's Included in Our Service",
    features: [
      "Research proposal development",
      "Comprehensive literature review",
      "Research design and methodology",
      "Data analysis and interpretation",
      "Chapter writing and organization",
      "Advanced academic editing",
      "Citation and formatting expertise",
      "Dissertation defense preparation",
    ],
    pricing: [
      {
        name: "Basic",
        price: "$100",
        features: [
          "2000 words",
          "Expert guidance and feedback",
          "Chapter reviews",
          "5-7 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Standard",
        price: "$250",
        features: [
          "5000 words",
          "Comprehensive support",
          "Chapter writing assistance",
          "3-5 days delivery",
        ],
        cta: "Order Now",
        highlighted: true,
      },
      {
        name: "Premium",
        price: "$450",
        features: [
          "10000 words",
          "End-to-end support",
          "Expert editing",
          "2-3 days delivery",
        ],
        cta: "Order Now",
      },
      {
        name: "Custom",
        price: "Custom",
        features: [
          "Customized support level",
          "Flexible timeline",
          "Specialized expertise",
          "Dedicated team support",
        ],
        cta: "Request Quote",
        isCustom: true,
      },
    ],
    ctaText: "Begin Your Dissertation Journey",
    ctaSubtext:
      "Get expert support from experienced doctoral researchers and writers",
    stats: {
      projectsCompleted: 1564,
      customerReviews: 1290,
      averageRating: 4.9,
      clientSatisfaction: "98%",
    },
    reviews: [
      {
        author: "Dr. Eleanor White",
        avatar: "EW",
        rating: 5,
        text: "Exceptional dissertation support through entire doctoral journey. Expert guidance from proposal to final defense!",
        course: "PhD Studies",
        verified: true,
      },
      {
        author: "Professor Marcus Grant",
        avatar: "MG",
        rating: 5,
        text: "Impressive scholarly approach to dissertation assistance. Helped multiple students achieve successful defenses!",
        course: "Doctoral Programs",
        verified: true,
      },
      {
        author: "Jennifer Phillips",
        avatar: "JP",
        rating: 5,
        text: "Outstanding dissertation writing support! Comprehensive assistance with methodology and data analysis was invaluable!",
        course: "Research Doctorate",
        verified: true,
      },
      {
        author: "Christopher Long",
        avatar: "CL",
        rating: 5,
        text: "Professional dissertation assistance that truly understood doctoral-level work. Excellent support throughout!",
        course: "Advanced Doctorate",
        verified: true,
      },
      {
        author: "Laura Newman",
        avatar: "LN",
        rating: 5,
        text: "Expert dissertation researchers who provided comprehensive support. My defense was successful thanks to their help!",
        course: "PhD Completion",
        verified: true,
      },
      {
        author: "Steven Carter",
        avatar: "SC",
        rating: 5,
        text: "Exceptional doctoral support with expert guidance at every stage. Highly recommend for serious researchers!",
        course: "Scholarly Writing",
        verified: true,
      },
    ],
  },
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const service = slug ? servicesData[slug] : null;

  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    packageId: string;
  } | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  if (!service) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center glass p-12 rounded-2xl max-w-md mx-4">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-poppins">
            Service Not Found
          </h2>
          <p className="text-foreground/70 mb-8">
            The service you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 3D Canvas Background */}
      <Canvas3DWrapper />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent"></div>
        <div className="blur-gradient absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 sm:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Title and Description */}
            <div>
              <div className="mb-8 animate-float">
                <service.Icon size={96} className="text-cyan-400" />
              </div>

              <h1 className="heading-3d text-5xl sm:text-7xl font-bold text-foreground mb-6 font-poppins">
                {service.title}
              </h1>

              <p className="text-xl text-foreground/70 mb-6 leading-relaxed">
                {service.subtitle}
              </p>

              <p className="text-lg text-foreground/60 leading-relaxed mb-8">
                Transform your academic journey with our comprehensive{" "}
                {service.title.toLowerCase()} solutions. Our team of expert
                writers and editors are dedicated to helping you achieve
                academic excellence through professionally crafted content that
                meets the highest standards of quality and originality.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="glass-dark px-6 py-4 rounded-xl">
                  <div className="text-sm text-cyan-400 font-semibold mb-1">
                    Guarantee
                  </div>
                  <p className="text-foreground/80">100% Original Content</p>
                </div>
                <div className="glass-dark px-6 py-4 rounded-xl">
                  <div className="text-sm text-cyan-400 font-semibold mb-1">
                    Delivery
                  </div>
                  <p className="text-foreground/80">On-Time Guarantee</p>
                </div>
                <div className="glass-dark px-6 py-4 rounded-xl">
                  <div className="text-sm text-cyan-400 font-semibold mb-1">
                    Support
                  </div>
                  <p className="text-foreground/80">24/7 Available</p>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative glass-dark p-12 rounded-3xl border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle
                        className="text-cyan-400 flex-shrink-0 mt-1"
                        size={24}
                      />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Expert Writers
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          Qualified professionals with subject matter expertise
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle
                        className="text-cyan-400 flex-shrink-0 mt-1"
                        size={24}
                      />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Quality Assurance
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          Rigorous checks and multiple revision rounds
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle
                        className="text-cyan-400 flex-shrink-0 mt-1"
                        size={24}
                      />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Confidential Service
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          Your privacy and security are our top priority
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {service.stats.projectsCompleted}
              </div>
              <p className="text-foreground/70">Projects Completed</p>
            </div>
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">
                {service.stats.customerReviews}
              </div>
              <p className="text-foreground/70">Customer Reviews</p>
            </div>
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {service.stats.averageRating}
              </div>
              <p className="text-foreground/70">Average Rating</p>
            </div>
            <div className="glass p-8 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {service.stats.clientSatisfaction}
              </div>
              <p className="text-foreground/70">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="glass p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-foreground mb-8 font-poppins">
              {service.aboutTitle}
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              {service.aboutContent}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              At EduWrites, we pride ourselves on delivering exceptional quality
              and maintaining the highest standards of academic integrity. Every
              piece of work goes through rigorous quality assurance checks to
              ensure it meets your expectations and exceeds academic
              requirements. Our team is dedicated to your success and committed
              to providing you with work that truly makes a difference in your
              academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-4 font-poppins">
                Why Choose This Service?
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-foreground/80">
                    Expert writers with advanced degrees in relevant fields
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-foreground/80">
                    100% plagiarism-free original work guaranteed
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-foreground/80">
                    On-time delivery with revision guarantees
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span className="text-foreground/80">
                    Flexible turnaround times to fit your schedule
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-4 font-poppins">
                Our Process
              </h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span className="text-foreground/80">
                    <strong>Submit Details:</strong> Share your requirements and
                    specifications
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span className="text-foreground/80">
                    <strong>Expert Assignment:</strong> We match you with the
                    best writer
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span className="text-foreground/80">
                    <strong>Quality Check:</strong> Multiple rounds of review
                    for excellence
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-purple-400 font-bold">4.</span>
                  <span className="text-foreground/80">
                    <strong>Delivery:</strong> Receive your work on time, every
                    time
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="heading-3d-light text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center font-poppins">
            {service.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl flex gap-4 items-start hover:bg-white/20 transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1 w-5 h-5" />
                <p className="text-foreground/90 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/50 to-white/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              PRICING
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-foreground/70">
              Choose the perfect plan for your academic needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.pricing.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl transition-all duration-300 overflow-hidden border ${
                  plan.highlighted
                    ? "bg-primary text-white border-primary scale-105 shadow-xl"
                    : "bg-white border-border hover:shadow-lg hover:border-accent/30"
                }`}
              >
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {plan.highlighted && (
                    <div className="mb-4">
                      <span className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-bold inline-block">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}

                  <h3
                    className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-foreground"}`}
                  >
                    {plan.name}
                  </h3>

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
                            plan.highlighted ? "text-accent" : "text-primary"
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

                  <button
                    onClick={() =>
                      setSelectedPlan({
                        name: plan.name,
                        packageId: plan.name.toLowerCase(),
                      })
                    }
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      plan.highlighted
                        ? "bg-accent text-primary hover:bg-accent/90"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 blur-gradient bg-gradient-to-r from-purple-600 to-transparent opacity-40 top-0 left-0 -z-10"></div>
        <div className="absolute inset-0 blur-gradient bg-gradient-to-l from-cyan-600 to-transparent opacity-40 bottom-0 right-0 -z-10"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="heading-3d text-4xl sm:text-5xl font-bold text-foreground mb-8 font-poppins">
            {service.ctaText}
          </h2>

          <p className="text-lg text-foreground/80 mb-12">
            {service.ctaSubtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-glow transition-all transform hover:scale-105 animate-pulse-bounce"
            >
              Order Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-poppins">
              What Our Clients Say
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Join thousands of satisfied students who have benefited from our
              professional writing services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.reviews.map((review, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Top Section: Author Profile with Moving Animation */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 animate-float">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm animate-pulse">
                      {review.author}
                    </p>
                    <p className="text-foreground/60 text-xs">
                      {review.course}
                    </p>
                  </div>
                </div>

                {/* Stars and Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-cyan-400 text-xs font-bold">
                      ✓ Verified
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-foreground/90 text-sm leading-relaxed flex-grow">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-3 uppercase tracking-wider">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/70">
              Get answers to common questions about our academic writing
              services
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question:
                  "Is the work completely original and plagiarism-free?",
                answer:
                  "Absolutely. Every piece of work we deliver is 100% original and written specifically for you. We use advanced plagiarism detection tools to ensure originality, and all sources are properly cited according to your required format (APA, MLA, Chicago, etc.).",
              },
              {
                question: "How long does it take to complete an order?",
                answer:
                  "Turnaround times vary depending on the service and complexity. We offer rush options starting from 2-3 days, standard delivery in 5-7 days, and extended timelines for comprehensive projects. You can specify your deadline when placing an order.",
              },
              {
                question: "What qualifications do your writers have?",
                answer:
                  "Our team consists of experienced academic writers with Master's and PhD degrees in their respective fields. Each writer is carefully selected and vetted to ensure they meet our high standards for expertise, writing quality, and academic integrity.",
              },
              {
                question: "Can I request revisions if I'm not satisfied?",
                answer:
                  "Yes, revisions are included in all our services. We're committed to your satisfaction and will work with you until the final product meets your expectations and academic requirements.",
              },
              {
                question: "How is my privacy protected?",
                answer:
                  "Your privacy is our top priority. All client information is kept confidential and encrypted. We never share personal details or disclose the nature of orders to third parties. Your work is completely anonymous in our system.",
              },
              {
                question: "What if I need to communicate with my writer?",
                answer:
                  "You can communicate directly with your assigned writer through our secure platform. Our 24/7 support team is also available to answer questions, provide updates, or address any concerns about your order.",
              },
              {
                question: "Do you offer guarantees on quality and delivery?",
                answer:
                  "Yes, we guarantee on-time delivery and top-quality work. If we miss a deadline, you'll receive a full refund. If the quality doesn't meet our standards, we'll continue revising until you're satisfied.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, debit cards, and PayPal. Payments are processed securely through our encrypted payment gateway. You can also choose to pay in installments for larger projects.",
              },
              {
                question: "Can I use this work for multiple submissions?",
                answer:
                  "Our work is written specifically for your unique assignment and requirements. We don't recommend using the same paper for multiple submissions. However, you can use the work as a study guide or reference for your own writing.",
              },
              {
                question: "What if my institution has specific requirements?",
                answer:
                  "We accommodate any specific requirements your institution has, including formatting guidelines, citation styles, required sources, and specific content requirements. Just let us know during the ordering process.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-accent/30 transition-all"
              >
                <button
                  onClick={() => {
                    const element = document.getElementById(`faq-${index}`);
                    if (element) {
                      element.classList.toggle("hidden");
                    }
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/5 transition-all"
                >
                  <h3 className="font-semibold text-foreground text-base">
                    {faq.question}
                  </h3>
                  <span className="text-primary text-2xl flex-shrink-0">+</span>
                </button>
                <div
                  id={`faq-${index}`}
                  className="hidden px-6 pb-4 border-t border-border bg-primary/2"
                >
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ CTA */}
          <div className="mt-12 p-8 bg-white rounded-2xl border border-border text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Still Have Questions?
            </h3>
            <p className="text-foreground/70 mb-6">
              Our support team is available 24/7 to help answer any questions
              you may have about our services.
            </p>
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-all"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 sm:p-12 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-foreground font-poppins">
                Complete Your Order: {selectedPlan.name}
              </h2>
              <button
                onClick={() => setSelectedPlan(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            <OrderForm
              preSelectedService={slug}
              preSelectedPackage={selectedPlan.packageId}
              onSuccess={() => {
                setSelectedPlan(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
}
