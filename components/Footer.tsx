"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { WhatsAppLink } from "./WhatsAppIcon";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer on admin and profile pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/profile")) {
    return null;
  }

  const services = [
    { label: "Essay Writing", path: "/services/essay" },
    { label: "Assignment Writing", path: "/services/assignment" },
    { label: "Thesis Writing", path: "/services/thesis" },
    { label: "Research Paper", path: "/services/research" },
    { label: "Proofreading & Editing", path: "/services/proofreading" },
    { label: "Dissertation Writing", path: "/services/dissertation" },
  ];

  const company = [
    { label: "About Us", path: "/about" },
    { label: "Pricing", path: "/#pricing" },
  ];

  const legal = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:ml-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
                alt="EduWrites Logo"
                className="w-[46px] h-[46px] sm:w-[51px] sm:h-[51px] flex-shrink-0"
              />
              <span className="font-bold text-lg text-primary">EduWrites</span>
            </Link>
            <p className="text-foreground/70 text-sm mb-4">
              Professional academic writing services trusted by 50,000+
              students.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <div className="space-y-3 text-foreground/70 text-sm">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0 text-primary" />
                <span>info@eduwrites.com</span>
              </div>
              <div className="flex items-start gap-2">
                <WhatsAppLink
                  phoneNumber="13658291551"
                  className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
                  iconSize={16}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-foreground/70 text-sm text-center">
              &copy; {currentYear} EduWrites. All rights reserved.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#"
                className="text-foreground/70 hover:text-primary text-sm transition-colors"
              >
                Status
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary text-sm transition-colors"
              >
                Support
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary text-sm transition-colors"
              >
                Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
