"use client";

import { useState, useRef } from "react";
import { Mail, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { services, fieldsOfStudy, languages } from "@/lib/headerData";
import { WhatsAppIcon, WhatsAppLink, WhatsAppButton } from "./WhatsAppIcon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const navItems = [{ label: "Home", path: "/" }];

  const footerNavItems = [
    { label: "Contact Us", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      {/* Main Header */}
      <div className="px-8 sm:px-12 lg:px-20 py-3 sm:py-3.5">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-1 sm:gap-2 md:gap-3">
          {/* Left: Logo and Branding */}
          <Link
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity flex items-center gap-2 sm:gap-2.5 md:gap-3"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
              alt="EduWrites Logo"
              className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px] lg:w-[32px] lg:h-[32px] flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-bold font-poppins leading-tight whitespace-nowrap">
                <span className="text-primary">Edu</span>
                <span className="text-accent">Writes</span>
              </h1>
              <p className="text-foreground/60 text-[8px] sm:text-[9px] md:text-[10px] mt-0 font-medium whitespace-nowrap">
                We Write, You Shine
              </p>
            </div>
          </Link>

          {/* Center: Navigation Menu */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-[10px] lg:text-[11px] font-medium text-foreground hover:text-primary transition-colors relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-[10px] lg:text-[11px] font-medium text-foreground hover:text-primary transition-colors relative whitespace-nowrap flex items-center gap-1 py-2">
                Services
                <ChevronDown
                  size={12}
                  className="transform group-hover:rotate-180 transition-transform"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-0 w-max bg-white border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 shadow-lg">
                {services.map((service) => (
                  <a
                    key={service.id}
                    href="/#pricing"
                    className="block px-4 py-2 text-[9px] lg:text-[10px] text-foreground hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Pricing Link */}
            <a
              href="/#pricing"
              className="text-[10px] lg:text-[11px] font-medium text-foreground hover:text-primary transition-colors relative group whitespace-nowrap"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>

            {/* Fields of Study Dropdown */}
            <div className="relative group">
              <button className="text-[10px] lg:text-[11px] font-medium text-foreground hover:text-primary transition-colors relative whitespace-nowrap flex items-center gap-1 py-2">
                Fields of Study
                <ChevronDown
                  size={12}
                  className="transform group-hover:rotate-180 transition-transform"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-0 w-max bg-white border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 shadow-lg max-w-xs">
                {fieldsOfStudy.map((field, idx) => (
                  <div
                    key={idx}
                    className="block w-full text-left px-4 py-2 text-[9px] lg:text-[10px] text-foreground whitespace-nowrap hover:text-primary hover:bg-primary/5"
                  >
                    <span className="mr-2">{field.icon}</span>
                    {field.category}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Dropdown */}
            <div className="relative group">
              <button className="text-[10px] lg:text-[11px] font-medium text-foreground hover:text-primary transition-colors relative whitespace-nowrap flex items-center gap-1 py-2">
                Languages
                <ChevronDown
                  size={12}
                  className="transform group-hover:rotate-180 transition-transform"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-0 w-max bg-white border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 shadow-lg">
                {languages.map((language, idx) => (
                  <div
                    key={idx}
                    className="block w-full text-left px-4 py-2 text-[9px] lg:text-[10px] text-foreground whitespace-nowrap hover:text-primary hover:bg-primary/5"
                  >
                    <span className="mr-2">{language.flag}</span>
                    {language.lang}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Navigation Items */}
            {footerNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-[10px] lg:text-[11px] font-medium text-foreground hover:text-primary transition-colors relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right: Contact Info and Profile */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <div className="hidden lg:flex flex-col gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors">
                <Mail size={14} />
                <a
                  href="mailto:info@eduwrites.com"
                  className="whitespace-nowrap font-medium"
                >
                  info@eduwrites.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/80 hover:text-[#25D366] transition-colors">
                <WhatsAppLink
                  phoneNumber="13658291551"
                  className="flex items-center gap-1.5 whitespace-nowrap font-medium"
                />
              </div>
            </div>

            {/* Auth Buttons and WhatsApp */}
            <div className="hidden sm:flex gap-1.5 items-center">
              <Link
                href="/login"
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all text-[9px] sm:text-[10px] font-medium hover:scale-105 whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Login</span>
                <User size={11} />
              </Link>
              <Link
                href="/profile"
                className="p-1.5 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all hover:scale-105 flex-shrink-0"
                title="User Profile"
              >
                <User size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile: Menu Button + Login (visible on small screens) */}
          <div className="md:hidden flex items-center gap-1">
            {/* Mobile WhatsApp Button */}
            <WhatsAppButton
              phoneNumber="13658291551"
              className="p-1 bg-[#25D366] text-white rounded-md hover:bg-[#20BA5B] transition-all flex-shrink-0"
              showIcon={true}
              iconSize={14}
            />

            {/* Mobile Login Button */}
            <Link
              href="/login"
              className="px-1.5 py-0.5 border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-all text-[8px] font-medium flex items-center gap-0.5 flex-shrink-0"
            >
              <span>Login</span>
              <User size={10} />
            </Link>

            <details
              className="group"
              ref={detailsRef}
              onToggle={(e) => setMenuOpen(e.currentTarget.open)}
            >
              <summary className="cursor-pointer text-foreground hover:text-primary transition-colors list-none flex-shrink-0">
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <div className="absolute top-full right-0 mt-1.5 bg-white border border-border rounded-lg p-1.5 space-y-0.5 min-w-max z-50 max-h-96 overflow-y-auto shadow-lg">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className="block text-[9px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-border my-0.5"></div>

                {/* Mobile Pricing Link */}
                <a
                  href="/#pricing"
                  onClick={closeMenu}
                  className="block text-[9px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1"
                >
                  Pricing
                </a>

                {/* Mobile Services Dropdown */}
                <details className="group">
                  <summary className="cursor-pointer block text-[9px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1 list-none">
                    Services
                  </summary>
                  <div className="pl-3 space-y-0.5 mt-0.5">
                    {services.map((service) => (
                      <a
                        key={service.id}
                        href="/#pricing"
                        onClick={closeMenu}
                        className="block text-[8px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </details>

                {/* Mobile Fields of Study Dropdown */}
                <details className="group">
                  <summary className="cursor-pointer block text-[9px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1 list-none">
                    Fields of Study
                  </summary>
                  <div className="pl-3 space-y-0.5 mt-0.5">
                    {fieldsOfStudy.map((field, idx) => (
                      <div
                        key={idx}
                        className="block w-full text-left text-[8px] font-medium text-foreground py-0.5 px-1"
                      >
                        <span className="mr-1">{field.icon}</span>
                        {field.category}
                      </div>
                    ))}
                  </div>
                </details>

                {/* Mobile Languages Dropdown */}
                <details className="group">
                  <summary className="cursor-pointer block text-[9px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1 list-none">
                    Languages
                  </summary>
                  <div className="pl-3 space-y-0.5 mt-0.5">
                    {languages.map((language, idx) => (
                      <div
                        key={idx}
                        className="block w-full text-left text-[8px] font-medium text-foreground py-0.5 px-1"
                      >
                        <span className="mr-1">{language.flag}</span>
                        {language.lang}
                      </div>
                    ))}
                  </div>
                </details>

                {/* Mobile Footer Navigation Items */}
                {footerNavItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className="block text-[9px] font-medium text-foreground hover:text-primary transition-colors py-0.5 px-1"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-border my-0.5"></div>

                {/* Profile Icon for Mobile */}
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="block w-full text-center px-1.5 py-0.5 border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-all text-[9px] font-medium flex items-center justify-center gap-1"
                  title="User Profile"
                >
                  <User size={14} />
                  <span>Profile</span>
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
