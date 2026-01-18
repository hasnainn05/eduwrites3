import { Mail, MessageCircle, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/#services" },
    { label: "Contact Us", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-lg">
      {/* Main Header */}
      <div className="px-8 sm:px-12 lg:px-20 py-2 sm:py-2.5">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-1 sm:gap-2 md:gap-3">
          {/* Left: Logo and Branding */}
          <Link
            to="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity flex items-center gap-0.5 sm:gap-1"
          >
            <div className="min-w-0">
              <h1 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-poppins leading-tight whitespace-nowrap">
                EduWrites
              </h1>
              <p className="text-foreground/60 text-[8px] sm:text-[9px] md:text-[10px] mt-0 font-medium whitespace-nowrap">
                Achieve Excellence
              </p>
            </div>
          </Link>

          {/* Center: Navigation Menu */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-[9px] lg:text-[10px] font-medium text-foreground/80 hover:text-cyan-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right: Contact Info and Profile */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <div className="hidden lg:flex flex-col gap-2 text-[10px]">
              <div className="flex items-center gap-1.5 text-foreground/80 hover:text-cyan-400 transition-colors">
                <Mail size={13} />
                <a
                  href="mailto:info@eduwrites.com"
                  className="whitespace-nowrap font-medium"
                >
                  info@eduwrites.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/80 hover:text-green-400 transition-colors">
                <a
                  href="https://wa.me/12025550123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 whitespace-nowrap font-medium"
                >
                  <MessageCircle size={13} />
                  <span>+1 (202) 555-0123</span>
                </a>
              </div>
            </div>

            {/* Login Button and Profile Icon */}
            <div className="flex items-center gap-1.5">
              <Link
                to="/login"
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 border border-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-foreground/80 rounded-none hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/20 hover:shadow-glow transition-all text-[9px] sm:text-[10px] font-medium animate-pulse-bounce transform hover:scale-105 whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Login</span>
                <User size={11} className="text-foreground/80" />
              </Link>
              <Link
                to="/profile"
                className="p-0.5 sm:p-1 rounded-none glass border border-white/20 hover:border-cyan-400 hover:bg-white/20 hover:shadow-glow transition-all transform hover:scale-110 flex items-center justify-center flex-shrink-0"
                title="Profile"
              >
                <User size={12} className="text-foreground/80" />
              </Link>
            </div>
          </div>

          {/* Mobile: Menu Button (visible on small screens) */}
          <div className="md:hidden">
            <details className="group">
              <summary className="cursor-pointer text-foreground/80 hover:text-cyan-400 transition-colors list-none flex-shrink-0">
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
              <div className="absolute top-full right-0 mt-1.5 glass rounded-lg p-1.5 space-y-0.5 min-w-max">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-[9px] font-medium text-foreground/80 hover:text-cyan-400 transition-colors py-0.5 px-1"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-white/20 my-0.5"></div>
                <Link
                  to="/login"
                  className="block w-full text-center px-1.5 py-0.5 border border-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-foreground/80 rounded-none hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/20 transition-all text-[9px] font-medium"
                >
                  Login
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
