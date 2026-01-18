"use client";

import { useState, useRef } from "react";
import { Mail, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { serviceGroups, fieldsOfStudy, languages } from "@/lib/headerData";
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
      <div className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-1 sm:gap-2 md:gap-3">
          {/* Left: Logo and Branding */}
          <Link
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity flex items-center gap-2 sm:gap-2.5 md:gap-3"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
              alt="EduWrites Logo"
              className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px] flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold font-poppins leading-tight whitespace-nowrap">
                <span className="text-primary">Edu</span>
                <span className="text-accent">Writes</span>
              </h1>
              <p className="text-foreground/60 text-[7px] sm:text-[8px] md:text-[9px] mt-0 font-medium whitespace-nowrap">
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
                className="text-[9px] lg:text-[10px] font-medium text-foreground hover:text-primary transition-colors relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-[9px] lg:text-[10px] font-medium text-foreground hover:text-primary transition-colors relative whitespace-nowrap flex items-center gap-1 py-2">
                Services
                <ChevronDown
                  size={12}
                  className="transform group-hover:rotate-180 transition-transform"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-0 bg-white border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-lg min-w-max">
                <div className="grid grid-cols-2 gap-0">
                  {/* Writing Services Section */}
                  <div className="px-3 py-2 border-r border-border">
                    <h3 className="text-[8px] lg:text-[9px] font-bold text-primary mb-1.5 uppercase tracking-wider">
                      {serviceGroups.writing.label}
                    </h3>
                    {serviceGroups.writing.services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block px-2 py-1 text-[7px] lg:text-[8px] text-foreground hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                      >
                        {service.description}
                      </Link>
                    ))}
                  </div>

                  {/* Proofreading Services Section */}
                  <div className="px-3 py-2">
                    <h3 className="text-[8px] lg:text-[9px] font-bold text-primary mb-1.5 uppercase tracking-wider">
                      {serviceGroups.proofreading.label}
                    </h3>
                    {serviceGroups.proofreading.services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="block px-2 py-1 text-[7px] lg:text-[8px] text-foreground hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                      >
                        {service.description}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Link */}
            <a
              href="/#pricing"
              className="text-xs lg:text-sm font-medium text-foreground hover:text-primary transition-colors relative group whitespace-nowrap"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </a>

            {/* Fields of Study Dropdown */}
            <div className="relative group">
              <button className="text-xs lg:text-sm font-medium text-foreground hover:text-primary transition-colors relative whitespace-nowrap flex items-center gap-1 py-2">
                Fields of Study
                <ChevronDown
                  size={14}
                  className="transform group-hover:rotate-180 transition-transform"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-0 w-max bg-white border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 shadow-lg max-w-xs">
                {fieldsOfStudy.map((field, idx) => (
                  <div
                    key={idx}
                    className="block w-full text-left px-4 py-1.5 text-xs text-foreground whitespace-nowrap hover:text-primary hover:bg-primary/5"
                  >
                    <span className="mr-2">{field.icon}</span>
                    {field.category}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Dropdown */}
            <div className="relative group">
              <button className="text-xs lg:text-sm font-medium text-foreground hover:text-primary transition-colors relative whitespace-nowrap flex items-center gap-1 py-2">
                Languages
                <ChevronDown
                  size={14}
                  className="transform group-hover:rotate-180 transition-transform"
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
              <div className="absolute left-0 mt-0 w-max bg-white border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50 shadow-lg">
                {languages.map((language, idx) => (
                  <div
                    key={idx}
                    className="block w-full text-left px-4 py-1.5 text-xs text-foreground whitespace-nowrap hover:text-primary hover:bg-primary/5"
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
                className="text-xs lg:text-sm font-medium text-foreground hover:text-primary transition-colors relative group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right: Contact Info and Profile */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="hidden lg:flex flex-col gap-1 text-xs">
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
                className="px-2 py-1 border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-all text-xs font-medium hover:scale-105 whitespace-nowrap flex items-center gap-1"
              >
                <span>Login</span>
                <User size={12} />
              </Link>
              <Link
                href="/profile"
                className="p-1.5 border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-all hover:scale-105 flex-shrink-0"
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
              className="p-1 bg-[#25D366] text-white rounded hover:bg-[#20BA5B] transition-all flex-shrink-0"
              showIcon={true}
              iconSize={16}
            />

            {/* Mobile Login Button */}
            <Link
              href="/login"
              className="px-2 py-1 border-2 border-primary text-primary rounded hover:bg-primary/5 transition-all text-xs font-medium flex items-center gap-1 flex-shrink-0"
            >
              <span>Login</span>
              <User size={12} />
            </Link>

            <details
              className="group"
              ref={detailsRef}
              onToggle={(e) => setMenuOpen(e.currentTarget.open)}
            >
              <summary className="cursor-pointer text-foreground hover:text-primary transition-colors list-none flex-shrink-0">
                <svg
                  className="w-5 h-5"
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
              <div className="absolute top-full right-0 mt-2 bg-white border-2 border-border rounded-lg p-2 space-y-1 min-w-max z-50 max-h-96 overflow-y-auto shadow-lg w-56">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={closeMenu}
                    className="block text-xs font-medium text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-primary/5"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-border my-1"></div>

                {/* Mobile Pricing Link */}
                <a
                  href="/#pricing"
                  onClick={closeMenu}
                  className="block text-xs font-medium text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-primary/5"
                >
                  Pricing
                </a>

                {/* Mobile Services Dropdown */}
                <details className="group">
                  <summary className="cursor-pointer block text-xs font-medium text-foreground hover:text-primary transition-colors py-2 px-2 list-none rounded hover:bg-primary/5">
                    Services
                  </summary>
                  <div className="pl-4 space-y-1 mt-1">
                    {/* Writing Services */}
                    <div>
                      <p className="text-xs font-bold text-primary uppercase mb-1">
                        Writing
                      </p>
                      <div className="pl-4 space-y-1">
                        {serviceGroups.writing.services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            onClick={closeMenu}
                            className="block text-xs font-medium text-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5"
                          >
                            {service.description}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* Proofreading Services */}
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs font-bold text-primary uppercase mb-1">
                        Proofreading
                      </p>
                      <div className="pl-4 space-y-1">
                        {serviceGroups.proofreading.services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            onClick={closeMenu}
                            className="block text-xs font-medium text-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5"
                          >
                            {service.description}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>

                {/* Mobile Fields of Study Dropdown */}
                <details className="group">
                  <summary className="cursor-pointer block text-xs font-medium text-foreground hover:text-primary transition-colors py-2 px-2 list-none rounded hover:bg-primary/5">
                    Fields of Study
                  </summary>
                  <div className="pl-4 space-y-1 mt-1">
                    {fieldsOfStudy.map((field, idx) => (
                      <div
                        key={idx}
                        className="block w-full text-left text-xs font-medium text-foreground py-1 px-2 rounded hover:bg-primary/5"
                      >
                        <span className="mr-2">{field.icon}</span>
                        {field.category}
                      </div>
                    ))}
                  </div>
                </details>

                {/* Mobile Languages Dropdown */}
                <details className="group">
                  <summary className="cursor-pointer block text-xs font-medium text-foreground hover:text-primary transition-colors py-2 px-2 list-none rounded hover:bg-primary/5">
                    Languages
                  </summary>
                  <div className="pl-4 space-y-1 mt-1">
                    {languages.map((language, idx) => (
                      <div
                        key={idx}
                        className="block w-full text-left text-xs font-medium text-foreground py-1 px-2 rounded hover:bg-primary/5"
                      >
                        <span className="mr-2">{language.flag}</span>
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
                    className="block text-xs font-medium text-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-primary/5"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Divider */}
                <div className="border-t border-border my-1"></div>

                {/* Profile Icon for Mobile */}
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="block w-full text-center px-2 py-2 border-2 border-primary text-primary rounded hover:bg-primary/5 transition-all text-xs font-medium flex items-center justify-center gap-1"
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
