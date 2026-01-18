import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  path: string;
}

const SEARCH_DATA: SearchItem[] = [
  // Writing Services
  { id: "essay", title: "Essay & Assignment Writing", category: "Writing", path: "/services/writing/essay" },
  { id: "research", title: "Research Paper Writing", category: "Writing", path: "/services/writing/research" },
  { id: "thesis", title: "Thesis & Dissertation Assistance", category: "Writing", path: "/services/writing/thesis" },
  
  // Design Services
  { id: "logo", title: "Logo Design", category: "Design", path: "/services/design/logo" },
  { id: "poster", title: "Poster & Flyer Design", category: "Design", path: "/services/design/poster" },
  { id: "tshirt", title: "T-Shirt Design", category: "Design", path: "/services/design/tshirt" },
  { id: "ui-ux", title: "App & Website UI/UX Design", category: "Design", path: "/services/design/ui-ux" },
  
  // Marketing Services
  { id: "seo", title: "SEO", category: "Marketing", path: "/services/marketing/seo" },
  { id: "ecommerce-seo", title: "Ecommerce SEO", category: "Marketing", path: "/services/marketing/ecommerce-seo" },
  { id: "email", title: "Email Marketing", category: "Marketing", path: "/services/marketing/email" },
  
  // Development Services
  { id: "website", title: "Website Development", category: "Development", path: "/services/development/website" },
  { id: "wordpress", title: "WordPress Development", category: "Development", path: "/services/development/wordpress" },
  { id: "shopify", title: "Shopify Store Development", category: "Development", path: "/services/development/shopify" },
  { id: "mobile", title: "Mobile Apps Development", category: "Development", path: "/services/development/mobile" },
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return SEARCH_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);
  }, [searchQuery]);

  const handleSelect = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 pointer-events-none" size={20} />
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => searchQuery && setIsOpen(true)}
          className="w-full pl-12 pr-10 py-3 bg-sidebar-background border border-sidebar-border rounded-lg text-sidebar-foreground placeholder-sidebar-foreground/50 focus:outline-none focus:border-sidebar-primary transition-colors"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && searchQuery && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-sidebar-background border border-sidebar-border rounded-lg shadow-xl z-50 overflow-hidden">
            {filteredResults.length > 0 ? (
              <div className="py-2">
                {filteredResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.path)}
                    className="w-full px-4 py-3 text-left hover:bg-sidebar-border transition-colors text-sidebar-foreground border-b border-sidebar-border last:border-b-0 focus:outline-none focus:bg-sidebar-border"
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-sidebar-foreground/50">{item.category}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-sidebar-foreground/50">
                No services found matching "{searchQuery}"
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
