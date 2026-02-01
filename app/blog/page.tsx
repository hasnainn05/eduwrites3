"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Write a Compelling Essay: A Complete Guide",
    excerpt:
      "Learn the essential techniques to write essays that impress professors and boost your grades.",
    content:
      "A well-structured essay is the foundation of academic success. In this comprehensive guide, we explore the key elements that make an essay stand out...",
    author: "Dr. Emily Richardson",
    date: "January 15, 2024",
    category: "Writing Tips",
    readTime: 8,
    image:
      "https://images.pexels.com/photos/8085938/pexels-photo-8085938.jpeg",
    featured: true,
  },
  {
    id: "2",
    title: "Research Paper Writing: Structure and Citation Styles",
    excerpt:
      "Master APA, MLA, and Chicago style citations while crafting research papers that meet academic standards.",
    content:
      "Research papers require careful attention to detail and proper citation methods. This guide covers everything you need to know about research paper structure...",
    author: "Prof. James Morrison",
    date: "January 12, 2024",
    category: "Academic Writing",
    readTime: 10,
    image:
      "https://images.pexels.com/photos/9158769/pexels-photo-9158769.jpeg",
    featured: true,
  },
  {
    id: "3",
    title: "Time Management for Students: Balancing Work and Studies",
    excerpt:
      "Discover proven strategies to manage your time effectively and excel in both your studies and work.",
    content:
      "Balancing multiple responsibilities is challenging but achievable with the right strategies. Learn how to prioritize your tasks and manage your time...",
    author: "Sarah Chen",
    date: "January 10, 2024",
    category: "Student Tips",
    readTime: 6,
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  },
  {
    id: "4",
    title: "Proofreading Tips to Improve Your Academic Writing",
    excerpt:
      "Learn the professional proofreading techniques that ensure error-free, polished academic work.",
    content:
      "Proofreading is more than just spell-checking. Discover advanced proofreading techniques used by professionals to enhance the quality of your writing...",
    author: "Dr. Michael Torres",
    date: "January 8, 2024",
    category: "Writing Tips",
    readTime: 7,
    image:
      "https://images.pexels.com/photos/8085938/pexels-photo-8085938.jpeg",
  },
  {
    id: "5",
    title: "Understanding Essay Formats: From Argumentative to Analytical",
    excerpt:
      "Understand the differences between essay types and how to approach each one strategically.",
    content:
      "Different essay types require different approaches. This article breaks down argumentative, analytical, and narrative essays with examples...",
    author: "Prof. Lisa Anderson",
    date: "January 5, 2024",
    category: "Academic Writing",
    readTime: 9,
    image:
      "https://images.pexels.com/photos/9158769/pexels-photo-9158769.jpeg",
  },
  {
    id: "6",
    title: "Dissertation Writing: From Proposal to Final Submission",
    excerpt:
      "A complete roadmap for PhD students navigating the challenging dissertation process.",
    content:
      "Writing a dissertation is a marathon, not a sprint. This comprehensive guide walks you through each phase of dissertation writing...",
    author: "Dr. Robert White",
    date: "December 30, 2023",
    category: "Advanced Writing",
    readTime: 12,
    image:
      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/8085938/pexels-photo-8085938.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
            Academic Writing Insights & Tips
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore expert articles on essay writing, research papers, time management, and
            academic excellence to boost your grades and success.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 font-poppins">
              Featured Articles
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block bg-accent/90 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs opacity-90">{post.readTime} min read</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="relative py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === null
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 font-poppins">
            All Articles
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white rounded-lg border border-border hover:shadow-lg hover:border-accent/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-accent/20 text-accent px-2.5 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs text-foreground/60">{post.readTime} min</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-xs text-foreground/60">
                        <div className="font-medium text-foreground">{post.author}</div>
                        <div>{post.date}</div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-primary group-hover:translate-x-2 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70 mb-4">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Clear filters <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-poppins">
            Need Professional Help?
          </h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            While these tips help, sometimes you need expert assistance. Our team of professional
            writers is ready to help you achieve academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/5 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
