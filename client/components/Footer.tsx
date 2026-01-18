import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: "Writing Services", path: "/services/writing" },
    { label: "Design Services", path: "/services/design" },
    { label: "Marketing Services", path: "/services/marketing" },
    { label: "IT & Development", path: "/services/development" },
  ];

  const company = [
    { label: "About Us", path: "/about" },
    { label: "Testimonials", path: "/#testimonials" },
    { label: "Blog", path: "/blog" },
    { label: "Pricing", path: "/#pricing" },
  ];

  const legal = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-sidebar-background border-t border-sidebar-border text-sidebar-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:ml-0">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold bg-gradient-to-r from-sidebar-primary to-sidebar-accent bg-clip-text text-transparent">
                EduWrites
              </span>
            </Link>
            <p className="text-sidebar-foreground/60 text-sm">
              Your trusted partner for comprehensive digital solutions.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sidebar-foreground">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sidebar-foreground">
              Company
            </h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sidebar-foreground">
              Legal
            </h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sidebar-foreground">
              Contact
            </h4>
            <div className="space-y-3 text-sidebar-foreground/60 text-sm">
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>info@eduwrites.com</span>
              </div>
              <div className="flex items-start gap-2">
                <a
                  href="https://wa.me/12025550123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sidebar-foreground transition-colors"
                >
                  <MessageCircle size={16} className="flex-shrink-0" />
                  <span>+1 (202) 555-0123</span>
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Business Ave, Suite 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sidebar-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sidebar-foreground/60 text-sm">
              &copy; {currentYear} EduWrites. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm transition-colors"
              >
                Status
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm transition-colors"
              >
                Support
              </a>
              <a
                href="#"
                className="text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm transition-colors"
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
