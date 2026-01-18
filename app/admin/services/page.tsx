"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Save,
  Star,
  ChevronDown,
} from "lucide-react";

interface Package {
  name: string;
  price: string;
  description: string;
  popular: boolean;
  features: string[];
}

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  projectsCompleted: number;
  rating: number;
  reviews: number;
  packages: {
    basic: Package;
    medium: Package;
    premium: Package;
  };
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Essay Writing",
      slug: "essay",
      description: "Professional essay writing for all academic levels",
      projectsCompleted: 392,
      rating: 4.9,
      reviews: 142,
      packages: {
        basic: {
          name: "Basic",
          price: "$49",
          description: "Perfect for starting students",
          popular: false,
          features: [
            "500-1000 words",
            "Basic research",
            "Standard formatting",
            "1 revision",
            "5-7 days delivery",
          ],
        },
        medium: {
          name: "Medium",
          price: "$99",
          description: "Most popular choice",
          popular: true,
          features: [
            "Up to 3,000 words",
            "In-depth research",
            "Premium formatting",
            "2 revisions",
            "3-5 days delivery",
          ],
        },
        premium: {
          name: "Premium",
          price: "$199",
          description: "For comprehensive work",
          popular: false,
          features: [
            "Up to 5,000 words",
            "Expert research",
            "Complete editing",
            "Unlimited revisions",
            "2-3 days delivery",
          ],
        },
      },
    },
    {
      id: 2,
      title: "Thesis Writing",
      slug: "thesis",
      description: "Expert guidance and writing support for your thesis",
      projectsCompleted: 287,
      rating: 4.8,
      reviews: 98,
      packages: {
        basic: {
          name: "Basic",
          price: "$299",
          description: "Perfect for starting thesis writers",
          popular: false,
          features: [
            "Up to 50 pages",
            "Basic research",
            "Standard formatting",
            "1 revision",
            "14-21 days delivery",
          ],
        },
        medium: {
          name: "Medium",
          price: "$599",
          description: "Most popular choice",
          popular: true,
          features: [
            "Up to 100 pages",
            "In-depth research",
            "Premium formatting",
            "3 revisions",
            "10-14 days delivery",
          ],
        },
        premium: {
          name: "Premium",
          price: "$999",
          description: "Complete thesis support",
          popular: false,
          features: [
            "Unlimited pages",
            "Expert research",
            "Complete editing",
            "Unlimited revisions",
            "7-10 days delivery",
          ],
        },
      },
    },
    {
      id: 3,
      title: "Research Paper",
      slug: "research",
      description: "In-depth research papers with comprehensive analysis",
      projectsCompleted: 245,
      rating: 4.9,
      reviews: 76,
      packages: {
        basic: {
          name: "Basic",
          price: "$79",
          description: "Perfect for introductory research",
          popular: false,
          features: [
            "2,000-3,000 words",
            "Basic citations",
            "Standard formatting",
            "1 revision",
            "7-10 days delivery",
          ],
        },
        medium: {
          name: "Medium",
          price: "$149",
          description: "Most popular choice",
          popular: true,
          features: [
            "Up to 5,000 words",
            "Advanced citations",
            "APA/MLA/Chicago",
            "2 revisions",
            "5-7 days delivery",
          ],
        },
        premium: {
          name: "Premium",
          price: "$249",
          description: "In-depth comprehensive research",
          popular: false,
          features: [
            "Up to 8,000 words",
            "Expert research",
            "Complete editing",
            "Unlimited revisions",
            "3-5 days delivery",
          ],
        },
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [expandedPackages, setExpandedPackages] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Service, "id" | "reviews">>({
    title: "",
    slug: "",
    description: "",
    projectsCompleted: 0,
    rating: 4.9,
    packages: {
      basic: {
        name: "Basic",
        price: "",
        description: "",
        popular: false,
        features: [],
      },
      medium: {
        name: "Medium",
        price: "",
        description: "",
        popular: false,
        features: [],
      },
      premium: {
        name: "Premium",
        price: "",
        description: "",
        popular: false,
        features: [],
      },
    },
  });

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddService = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      projectsCompleted: 0,
      rating: 4.9,
      packages: {
        basic: {
          name: "Basic",
          price: "",
          description: "",
          popular: false,
          features: [],
        },
        medium: {
          name: "Medium",
          price: "",
          description: "",
          popular: true,
          features: [],
        },
        premium: {
          name: "Premium",
          price: "",
          description: "",
          popular: false,
          features: [],
        },
      },
    });
    setShowModal(true);
  };

  const handleEditService = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      projectsCompleted: service.projectsCompleted,
      rating: service.rating,
      packages: service.packages,
    });
    setShowModal(true);
  };

  const handleSaveService = () => {
    if (editingId) {
      setServices(
        services.map((s) => (s.id === editingId ? { ...s, ...formData } : s)),
      );
    } else {
      setServices([
        ...services,
        {
          id: Math.max(...services.map((s) => s.id), 0) + 1,
          ...formData,
          reviews: 0,
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const updatePackageField = (
    tier: "basic" | "medium" | "premium",
    field: string,
    value: any,
  ) => {
    setFormData({
      ...formData,
      packages: {
        ...formData.packages,
        [tier]: {
          ...formData.packages[tier],
          [field]: value,
        },
      },
    });
  };

  const updatePackageFeature = (
    tier: "basic" | "medium" | "premium",
    index: number,
    value: string,
  ) => {
    const features = [...formData.packages[tier].features];
    features[index] = value;
    updatePackageField(tier, "features", features);
  };

  const addPackageFeature = (tier: "basic" | "medium" | "premium") => {
    const features = [...formData.packages[tier].features, ""];
    updatePackageField(tier, "features", features);
  };

  const removePackageFeature = (
    tier: "basic" | "medium" | "premium",
    index: number,
  ) => {
    const features = formData.packages[tier].features.filter(
      (_, i) => i !== index,
    );
    updatePackageField(tier, "features", features);
  };

  return (
    <div className="p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>
          </div>

          {/* Services Table */}
          <div className="glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80">
                      Service Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80">
                      Projects
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80">
                      Rating
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80">
                      Reviews
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground/80">
                      Packages
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground/80">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            {service.title}
                          </p>
                          <p className="text-xs text-foreground/50 mt-1">
                            {service.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-cyan-400">
                          {service.projectsCompleted}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-yellow-400">
                            {service.rating}
                          </span>
                          <span className="text-foreground/50">⭐</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground/70">{service.reviews}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setExpandedPackages(
                              expandedPackages === service.id
                                ? null
                                : service.id,
                            )
                          }
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-400 text-sm font-medium transition-colors"
                        >
                          <span>View Pricing</span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${expandedPackages === service.id ? "rotate-180" : ""}`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditService(service)}
                            className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Expandable Package Details */}
            {expandedPackages && (
              <div className="border-t border-white/10 bg-white/5 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.find((s) => s.id === expandedPackages)?.packages &&
                    Object.entries(
                      services.find((s) => s.id === expandedPackages)!.packages,
                    ).map(([key, pkg]) => (
                      <div
                        key={key}
                        className={`rounded-xl border p-4 ${pkg.popular ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-white/5"}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-bold text-foreground">
                            {pkg.name}
                          </h4>
                          {pkg.popular && (
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          )}
                        </div>
                        <p className="text-2xl font-bold text-cyan-400 mb-2">
                          {pkg.price}
                        </p>
                        <p className="text-sm text-foreground/70 mb-3">
                          {pkg.description}
                        </p>
                        <ul className="space-y-1 text-xs text-foreground/60">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-cyan-400">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/60">No services found</p>
            </div>
          )}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-4xl glass rounded-2xl border border-white/10 p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Service Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Service Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-cyan-400 transition-all"
                      placeholder="e.g., Essay Writing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-cyan-400 transition-all"
                      placeholder="e.g., essay"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-cyan-400 transition-all"
                      placeholder="Enter service description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Projects Completed
                      </label>
                      <input
                        type="number"
                        value={formData.projectsCompleted}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectsCompleted: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rating: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Pricing Tiers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(["basic", "medium", "premium"] as const).map((tier) => (
                    <div
                      key={tier}
                      className="glass rounded-xl border border-white/10 p-5"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Package Name
                          </label>
                          <input
                            type="text"
                            value={formData.packages[tier].name}
                            onChange={(e) =>
                              updatePackageField(tier, "name", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Price
                          </label>
                          <input
                            type="text"
                            value={formData.packages[tier].price}
                            onChange={(e) =>
                              updatePackageField(tier, "price", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all text-sm"
                            placeholder="e.g., $99"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Description
                          </label>
                          <input
                            type="text"
                            value={formData.packages[tier].description}
                            onChange={(e) =>
                              updatePackageField(
                                tier,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all text-sm"
                            placeholder="e.g., Most popular choice"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.packages[tier].popular}
                            onChange={(e) =>
                              updatePackageField(
                                tier,
                                "popular",
                                e.target.checked,
                              )
                            }
                            className="w-4 h-4 rounded accent-cyan-400"
                            id={`popular-${tier}`}
                          />
                          <label
                            htmlFor={`popular-${tier}`}
                            className="text-sm font-medium text-foreground/80"
                          >
                            Most Popular
                          </label>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground/80 mb-2">
                            Features
                          </label>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {formData.packages[tier].features.map(
                              (feature, idx) => (
                                <div key={idx} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) =>
                                      updatePackageFeature(
                                        tier,
                                        idx,
                                        e.target.value,
                                      )
                                    }
                                    className="flex-1 px-3 py-2 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all text-xs"
                                    placeholder="Feature"
                                  />
                                  <button
                                    onClick={() =>
                                      removePackageFeature(tier, idx)
                                    }
                                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ),
                            )}
                          </div>
                          <button
                            onClick={() => addPackageFeature(tier)}
                            className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-400 text-xs font-medium transition-colors"
                          >
                            <Plus size={14} />
                            Add Feature
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg glass border border-white/20 text-foreground hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                <Save size={18} />
                {editingId ? "Update Service" : "Create Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
