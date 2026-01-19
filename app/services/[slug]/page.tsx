"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Briefcase,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Users,
  FileText,
  BarChart3,
  BookMarked,
  Pencil,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/client/hooks/useScrollAnimation";
import SupportModal from "@/components/SupportModal";
import {
  GENERAL_PRICING_PLANS,
  PROOFREADING_PRICING_PLANS,
} from "@/lib/pricing";
import type { PricingPackage } from "@/lib/pricing";

interface ServiceData {
  title: string;
  serviceTitle: string;
  subtitle: string;
  Icon: LucideIcon;
  aboutTitle: string;
  aboutContent: string;
  pricingPackages: PricingPackage[];
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
    title: "Expert Essay Writing Service for Students Worldwide",
    serviceTitle: "Essay Writing",
    subtitle: "Professional Academic Writing Services",
    Icon: FileText,
    aboutTitle: "About Our Professional Essay Writing Service",
    aboutContent:
      "Our professional essay writing service provides high-quality, plagiarism-free essays for all academic levels, from high school to graduate programs. We understand the pressure students face when juggling multiple assignments, and our expert essay writing team is here to help you succeed. Our professional essay writers have advanced degrees across various disciplines and specialize in crafting compelling, original essays that showcase your academic potential. Whether you need help with argumentative essays, analytical papers, narrative compositions, or research-based essays, our professional writers have the expertise to deliver work that exceeds expectations and demonstrates deep understanding of your subject matter. With fast essay writing turnaround times and affordable essay writing rates, we make professional academic support accessible to all students seeking essay help online.",
    pricingPackages: GENERAL_PRICING_PLANS,
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
  assignment: {
    title: "Expert Assignment Writing Services for Students Worldwide",
    serviceTitle: "Assignment Writing",
    subtitle: "Complete Assignment Solutions",
    Icon: CheckCircle,
    aboutTitle: "About Our Professional Assignment Writing Service",
    aboutContent:
      "Our comprehensive assignment writing service provides complete assignment solutions for all types of academic assignments. Whether you need assignment help with essays, reports, projects, case studies, or problem sets, our experienced assignment writers deliver high-quality work that meets your assignment specifications and academic standards. We handle assignments across all disciplines and academic levels, ensuring that each assignment is original, plagiarism-free, well-researched, and tailored to your specific assignment requirements. Our assignment help experts work closely with you to understand the assignment guidelines and deliver assignment solutions that demonstrate your understanding of the subject matter. Get affordable assignment writing help online today with guaranteed on-time delivery.",
    pricingPackages: GENERAL_PRICING_PLANS,
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
  research: {
    title:
      "Professional Research Paper Writing Services for All Academic Levels",
    serviceTitle: "Research Paper",
    subtitle: "In-Depth Research and Academic Excellence",
    Icon: BarChart3,
    aboutTitle: "About Our Professional Research Paper Writing Service",
    aboutContent:
      "Our professional research paper writing service specializes in comprehensive academic research projects that require rigorous investigation and scholarly analysis. We provide expert research paper help with experienced research writers who have expertise across all major academic disciplines including sciences, humanities, social sciences, business, and technology. Our research paper writing process involves conducting extensive literature reviews using peer-reviewed sources, developing original research arguments, and presenting well-structured research analyses. Each research paper is meticulously documented with proper citations and references, whether you require APA, MLA, Chicago, or any other format. We excel at identifying credible research sources, synthesizing complex research information, and producing research papers that demonstrate advanced critical thinking and original contribution to your field of study. Get professional research paper help online with affordable research paper writing services.",
    pricingPackages: GENERAL_PRICING_PLANS,
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
    title: "Professional Thesis Writing Services for Master's & PhD Students",
    serviceTitle: "Thesis Writing",
    subtitle: "Complete Support for Your Academic Journey",
    Icon: BookOpen,
    aboutTitle: "About Our Professional Thesis Writing Service",
    aboutContent:
      "Our professional thesis writing service provides comprehensive, end-to-end thesis support for graduate-level research projects at Master's and PhD levels. We understand that thesis writing represents a culmination of your academic journey and requires exceptional quality, originality, and depth. Our team of experienced thesis writers and researchers work closely with you throughout every stage of the thesis writing process, from initial research design and literature review through data analysis, thesis writing, comprehensive editing, and defense preparation. We provide detailed thesis feedback, chapter-by-chapter thesis guidance, and ensure your thesis meets all institutional requirements while maintaining the highest standards of academic integrity. Whether you need professional help developing your research methodology, analyzing complex data, writing specific thesis chapters, preparing your thesis defense, or getting comprehensive thesis editing, our thesis help experts are committed to your success with affordable thesis writing services.",
    pricingPackages: GENERAL_PRICING_PLANS,
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
  dissertation: {
    title: "Expert Dissertation Writing Services for Master's & PhD Students",
    serviceTitle: "Dissertation Writing",
    subtitle: "Complete Doctoral Support",
    Icon: BookMarked,
    aboutTitle: "About Our Professional Dissertation Writing Service",
    aboutContent:
      "Our professional dissertation writing service provides expert dissertation support for doctoral candidates pursuing PhD and professional doctorates. We understand the complexity and challenges involved in dissertation research and dissertation writing. Our team of experienced dissertation writers and academic researchers works with you at every stage of the dissertation process: from research proposal development and literature review through data collection analysis, dissertation writing, comprehensive dissertation editing, and final submission. We provide comprehensive dissertation help that maintains academic integrity while ensuring your dissertation meets the highest scholarly standards. Our dissertation writing expertise spans multiple disciplines and we have successfully supported hundreds of doctoral candidates in completing their dissertations with professional dissertation assistance and advancing their academic careers. Get professional dissertation writing help online with affordable dissertation services.",
    pricingPackages: GENERAL_PRICING_PLANS,
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
  "essay-proofreading": {
    title: "Expert Essay Proofreading & Editing Service for Students Worldwide",
    serviceTitle: "Essay Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    aboutTitle: "About Our Professional Essay Proofreading and Editing Service",
    aboutContent:
      "Our professional proofreading and editing services help polish your essay to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your essay for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your essay meets the highest professional standards. We provide proofreading help and editing support for essays to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    pricingPackages: PROOFREADING_PRICING_PLANS,
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
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for submission after this service!",
        course: "Academic Polish",
        verified: true,
      },
      {
        author: "Benjamin Hall",
        avatar: "BH",
        rating: 5,
        text: "Professional editing with great attention to detail. My essay reads so much better now!",
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
        text: "Comprehensive editing that transformed my essay. Fast turnaround with premium quality results!",
        course: "Document Perfection",
        verified: true,
      },
    ],
  },
  "assignment-proofreading": {
    title:
      "Expert Assignment Proofreading & Editing Service for Students Worldwide",
    serviceTitle: "Assignment Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    aboutTitle:
      "About Our Professional Assignment Proofreading and Editing Service",
    aboutContent:
      "Our professional proofreading and editing services help polish your assignment to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your assignment for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your assignment meets the highest professional standards. We provide proofreading help and editing support for assignments to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    pricingPackages: PROOFREADING_PRICING_PLANS,
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
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for submission after this service!",
        course: "Academic Polish",
        verified: true,
      },
      {
        author: "Benjamin Hall",
        avatar: "BH",
        rating: 5,
        text: "Professional editing with great attention to detail. My assignment reads so much better now!",
        course: "Professional Writing",
        verified: true,
      },
      {
        author: "Grace Williams",
        avatar: "GW",
        rating: 5,
        text: "Meticulous proofreading service. Every aspect of my assignment was refined. Excellent quality control!",
        course: "Final Polish",
        verified: true,
      },
      {
        author: "Alexander Green",
        avatar: "AG",
        rating: 5,
        text: "Comprehensive editing that transformed my assignment. Fast turnaround with premium quality results!",
        course: "Document Perfection",
        verified: true,
      },
    ],
  },
  "thesis-proofreading": {
    title:
      "Professional Thesis Proofreading & Editing Service for Master's & PhD Students",
    serviceTitle: "Thesis Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    aboutTitle:
      "About Our Professional Thesis Proofreading and Editing Service",
    aboutContent:
      "Our professional proofreading and editing services help polish your thesis to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your thesis for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your thesis meets the highest professional standards. We provide proofreading help and editing support for theses to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    pricingPackages: PROOFREADING_PRICING_PLANS,
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
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for submission after this service!",
        course: "Academic Polish",
        verified: true,
      },
      {
        author: "Benjamin Hall",
        avatar: "BH",
        rating: 5,
        text: "Professional editing with great attention to detail. My thesis reads so much better now!",
        course: "Professional Writing",
        verified: true,
      },
      {
        author: "Grace Williams",
        avatar: "GW",
        rating: 5,
        text: "Meticulous proofreading service. Every aspect of my thesis was refined. Excellent quality control!",
        course: "Final Polish",
        verified: true,
      },
      {
        author: "Alexander Green",
        avatar: "AG",
        rating: 5,
        text: "Comprehensive editing that transformed my thesis. Fast turnaround with premium quality results!",
        course: "Document Perfection",
        verified: true,
      },
    ],
  },
  "research-proofreading": {
    title:
      "Professional Research Paper Proofreading & Editing Service for All Academic Levels",
    serviceTitle: "Research Paper Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    aboutTitle:
      "About Our Professional Research Paper Proofreading and Editing Service",
    aboutContent:
      "Our professional proofreading and editing services help polish your research paper to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your research paper for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your research paper meets the highest professional standards. We provide proofreading help and editing support for research papers to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    pricingPackages: PROOFREADING_PRICING_PLANS,
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
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for submission after this service!",
        course: "Academic Polish",
        verified: true,
      },
      {
        author: "Benjamin Hall",
        avatar: "BH",
        rating: 5,
        text: "Professional editing with great attention to detail. My research paper reads so much better now!",
        course: "Professional Writing",
        verified: true,
      },
      {
        author: "Grace Williams",
        avatar: "GW",
        rating: 5,
        text: "Meticulous proofreading service. Every aspect of my research paper was refined. Excellent quality control!",
        course: "Final Polish",
        verified: true,
      },
      {
        author: "Alexander Green",
        avatar: "AG",
        rating: 5,
        text: "Comprehensive editing that transformed my research paper. Fast turnaround with premium quality results!",
        course: "Document Perfection",
        verified: true,
      },
    ],
  },
  "dissertation-proofreading": {
    title:
      "Expert Dissertation Proofreading & Editing Service for Master's & PhD Students",
    serviceTitle: "Dissertation Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    aboutTitle:
      "About Our Professional Dissertation Proofreading and Editing Service",
    aboutContent:
      "Our professional proofreading and editing services help polish your dissertation to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your dissertation for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your dissertation meets the highest professional standards. We provide proofreading help and editing support for dissertations to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    pricingPackages: PROOFREADING_PRICING_PLANS,
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
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for submission after this service!",
        course: "Academic Polish",
        verified: true,
      },
      {
        author: "Benjamin Hall",
        avatar: "BH",
        rating: 5,
        text: "Professional editing with great attention to detail. My dissertation reads so much better now!",
        course: "Professional Writing",
        verified: true,
      },
      {
        author: "Grace Williams",
        avatar: "GW",
        rating: 5,
        text: "Meticulous proofreading service. Every aspect of my dissertation was refined. Excellent quality control!",
        course: "Final Polish",
        verified: true,
      },
      {
        author: "Alexander Green",
        avatar: "AG",
        rating: 5,
        text: "Comprehensive editing that transformed my dissertation. Fast turnaround with premium quality results!",
        course: "Document Perfection",
        verified: true,
      },
    ],
  },
  proofreading: {
    title: "Expert Proofreading & Editing Services for Students Worldwide",
    serviceTitle: "Proofreading & Editing",
    subtitle: "Professional Document Refinement",
    Icon: Pencil,
    aboutTitle: "About Our Professional Proofreading and Editing Services",
    aboutContent:
      "Our professional proofreading and editing services help polish your academic work to perfection. We provide comprehensive editing services that include grammar correction, punctuation refinement, style improvement, clarity enhancement, and proofreading. Our experienced proofreading editors review your work for consistency, flow, and academic tone while preserving your unique voice and original ideas. Whether you need professional proofreading services, professional editing services, or comprehensive proofreading and editing, our proofreading experts ensure your document meets the highest professional standards. We provide proofreading help and editing support for essays, research papers, theses, dissertations, and any other academic documents to ensure they are polished and ready for submission. Get affordable proofreading and editing services online with quick turnaround times.",
    pricingPackages: PROOFREADING_PRICING_PLANS,
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
        text: "Perfect proofreading! Grammar, style, and formatting all improved. Ready for submission after this service!",
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
        text: "Meticulous proofreading service. Every aspect of my document was refined. Excellent quality control!",
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
};

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
    description: "We respect your deadlines with guaranteed timely completion",
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

export default function ServiceDetail() {
  const containerRef = useScrollAnimation();
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const service = slug ? servicesData[slug] : null;

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleOrderNow = (packageId: string) => {
    router.push(`/order?service=${slug}&package=${packageId}`);
  };

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
    <div ref={containerRef} className="w-full">
      {/* Hero Section */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 scroll-animate scroll-delay-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/40 rounded-full px-3 py-1.5 mb-4">
                <Star size={12} className="text-accent fill-accent" />
                <span className="text-xs font-semibold text-foreground">
                  Trusted by 50,000+ Students
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-bold mb-6 leading-tight font-poppins text-foreground text-xl sm:text-2xl lg:text-3xl">
                {service.title.split(" ").map((word, idx) => {
                  const mainWord = service.serviceTitle.split(" ")[0];
                  return word === mainWord ? (
                    <span key={idx} className="text-yellow-400">
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={idx}>{word} </span>
                  );
                })}
              </h1>

              {/* Subheading */}
              <p className="text-xs text-foreground/70 mb-6 leading-relaxed max-w-2xl">
                Professional, plagiarism-free academic{" "}
                {service.serviceTitle.toLowerCase()} from Ph.D. experts.
                Delivered on time, every time with guaranteed quality.
              </p>

              {/* Trust Indicators */}
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
                <button
                  onClick={() =>
                    handleOrderNow(service.pricingPackages[0]?.id || "basic")
                  }
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Now <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/5 transition-all duration-300"
                >
                  Message Us
                </button>
              </div>
            </div>

            {/* Right Trust Cards */}
            <div className="flex flex-col gap-6 lg:mt-32 lg:col-span-2">
              {/* Small Cards */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Rating Card */}
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
      </section>

      {/* About Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-animate scroll-delay-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4 font-poppins">
                {service.aboutTitle}
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4 text-sm">
                {service.aboutContent}
              </p>
              <p className="text-foreground/80 leading-relaxed text-sm">
                At EduWrites, we pride ourselves on delivering exceptional
                quality and maintaining the highest standards of academic
                integrity. Every piece of work goes through rigorous quality
                assurance checks to ensure it meets your expectations and
                exceeds academic requirements.
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

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-white/50 to-white/30 scroll-animate scroll-delay-300"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold mb-2 uppercase tracking-wider text-xs">
              PRICING
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-poppins">
              Transparent, Affordable Pricing
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose the perfect plan for your{" "}
              {service.serviceTitle.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.pricingPackages.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative rounded-lg overflow-hidden border scroll-animate hover-pop ${
                  index === 0
                    ? "scroll-delay-100"
                    : index === 1
                      ? "scroll-delay-200"
                      : index === 2
                        ? "scroll-delay-300"
                        : "scroll-delay-400"
                } ${
                  plan.highlighted
                    ? "bg-primary text-white border-primary scale-105 shadow-xl"
                    : "bg-white border-border"
                }`}
              >
                <div className="relative z-10 p-5 h-full flex flex-col">
                  {plan.highlighted && (
                    <div className="mb-3">
                      <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold inline-block">
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}

                  <h3
                    className={`text-lg font-bold mb-1 ${
                      plan.highlighted ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="mb-5">
                    <span
                      className={`text-3xl font-bold ${
                        plan.highlighted ? "text-accent" : "text-primary"
                      }`}
                    >
                      ${plan.price}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-5 flex-grow">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className={`flex-shrink-0 mt-0.5 w-3 h-3 ${
                            plan.highlighted ? "text-accent" : "text-primary"
                          }`}
                          size={12}
                        />
                        <span
                          className={
                            plan.highlighted
                              ? "text-white/90 text-xs"
                              : "text-foreground/80 text-xs"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleOrderNow(plan.id)}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
                      plan.highlighted
                        ? "bg-accent text-primary hover:bg-accent/90"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 scroll-animate scroll-delay-400">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold mb-2 uppercase tracking-wider text-xs">
              SUCCESS STORIES
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-poppins">
              Our Impact
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              See how we've helped students achieve academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                title: "Enterprise Leadership Development",
                subtitle: "C-Suite Executive Strategy",
                client: "Fortune 500 Tech Company",
                metric: "3 Executive Promotions",
                description:
                  "Developed comprehensive leadership documentation and strategic white papers for executive team members.",
                Icon: Briefcase,
              },
              {
                title: "Academic Research Excellence",
                subtitle: "Peer-Reviewed Publications",
                client: "Stanford University Research Lab",
                metric: "12 Published Papers",
                description:
                  "Supported research documentation and manuscript preparation across multiple disciplines.",
                Icon: BookOpen,
              },
              {
                title: "Corporate Innovation Strategy",
                subtitle: "Strategic Documentation",
                client: "Global Consulting Firm",
                metric: "$15M Client Value",
                description:
                  "Elevated consulting deliverables with professionally crafted strategic reports.",
                Icon: TrendingUp,
              },
              {
                title: "Graduate Excellence Program",
                subtitle: "Advanced Degree Completion",
                client: "International MBA Cohort",
                metric: "98% Distinction Rate",
                description:
                  "Supported 200+ graduate students in thesis and dissertation completion.",
                Icon: Award,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg p-5 border border-border hover:shadow-lg hover:border-accent/30 overflow-hidden transition-all duration-500"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-accent/15 transition-all">
                      <project.Icon size={18} className="text-primary" />
                    </div>
                    <div className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">
                      {project.metric}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground/70 mb-1.5 font-medium">
                    {project.subtitle}
                  </p>

                  <p className="text-foreground/80 text-xs mb-3 leading-tight">
                    {project.description}
                  </p>

                  <div className="border-t border-border pt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-foreground/60 mb-0.5">
                        Client Organization
                      </p>
                      <p className="text-xs font-semibold text-foreground">
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
        </div>
      </section>

      {/* Education Levels & Fields Section */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 scroll-animate scroll-delay-500">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold mb-2 uppercase tracking-wider text-xs">
              EXPERTISE
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-poppins">
              Coverage Across All Levels & Disciplines
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              From high school to PhD, we support every academic level and
              discipline
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
                  className="bg-white rounded-lg p-5 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-foreground text-sm mb-2">
                    {item.level}
                  </h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Universities */}
          <div className="mb-32">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              Trusted by Top University Students
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className="bg-white rounded-lg p-5 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{region.icon}</span>
                    <h4 className="font-bold text-foreground text-sm">
                      {region.region}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {region.universities.map((uni, uIdx) => (
                      <div key={uIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                        <span className="text-xs text-foreground/85">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
                  className="bg-white rounded-lg p-4 border border-border hover:shadow-md hover:border-accent/30 transition-all duration-300 text-center"
                >
                  <p className="text-3xl mb-2">{lang.flag}</p>
                  <p className="font-semibold text-foreground text-xs">
                    {lang.lang}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 scroll-animate scroll-delay-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold mb-2 uppercase tracking-wider text-xs">
              WHY CHOOSE US
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-poppins">
              Why EduWrites?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We combine expertise, reliability, and dedication to your academic
              success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-5 border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-foreground mb-2 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 scroll-animate scroll-delay-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold mb-2 uppercase tracking-wider text-xs">
              TESTIMONIALS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-poppins">
              What Our Students Say
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Real feedback from students who've improved their grades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>

                <p className="text-foreground/80 leading-relaxed mb-3 text-xs">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-xs">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-xs">
                      {review.author}
                    </h4>
                    <p className="text-xs text-foreground/60">
                      {review.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-10 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 scroll-animate scroll-delay-300">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold mb-2 uppercase tracking-wider text-xs">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 font-poppins">
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
                className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-base font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center transition-transform duration-300 ${
                        expandedFAQ === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 text-accent"
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
                  <div className="px-4 pb-4 border-t border-border">
                    <p className="text-foreground/80 leading-relaxed text-sm">
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
