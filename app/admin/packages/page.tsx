"use client";

import { useState } from "react";
import { Edit2, Save, X, Plus, Star } from "lucide-react";

export default function AdminPackages() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Basic",
      tier: "basic",
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
      cta: "Order Now",
    },
    {
      id: 2,
      name: "Medium",
      tier: "medium",
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
      cta: "Order Now",
    },
    {
      id: 3,
      name: "Premium",
      tier: "premium",
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
      cta: "Order Now",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<(typeof packages)[0] | null>(
    null,
  );

  const handleEditClick = (pkg: (typeof packages)[0]) => {
    setEditingId(pkg.id);
    setEditFormData({ ...pkg });
  };

  const handleSaveClick = () => {
    if (editFormData) {
      setPackages(packages.map((p) => (p.id === editingId ? editFormData : p)));
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (editFormData) {
      const newFeatures = [...editFormData.features];
      newFeatures[index] = value;
      setEditFormData({ ...editFormData, features: newFeatures });
    }
  };

  const handleAddFeature = () => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        features: [...editFormData.features, ""],
      });
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        features: editFormData.features.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="p-6">
          {editingId ? (
            // Edit Mode
            <div className="glass rounded-2xl border border-white/10 p-8">
              {editFormData && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-8">
                    Edit {editFormData.name} Package
                  </h2>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          Package Name
                        </label>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          Price
                        </label>
                        <input
                          type="text"
                          value={editFormData.price}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              price: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={editFormData.description}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={editFormData.cta}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            cta: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={editFormData.popular}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            popular: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded accent-cyan-400"
                      />
                      <label className="text-sm font-medium text-foreground/80">
                        Mark as Most Popular
                      </label>
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-4">
                        Package Features
                      </label>
                      <div className="space-y-3">
                        {editFormData.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-3">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) =>
                                handleFeatureChange(idx, e.target.value)
                              }
                              className="flex-1 px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                              placeholder="Feature name"
                            />
                            <button
                              onClick={() => handleRemoveFeature(idx)}
                              className="p-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleAddFeature}
                        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-400 text-sm font-medium transition-colors"
                      >
                        <Plus size={16} />
                        Add Feature
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={handleCancelClick}
                      className="flex-1 px-6 py-3 rounded-lg glass border border-white/20 text-foreground hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveClick}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold hover:shadow-lg transition-all"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // View Mode
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`group glass rounded-2xl border transition-all overflow-hidden ${
                    pkg.popular
                      ? "border-cyan-400/50 ring-2 ring-cyan-400/20 scale-105"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="h-1 bg-gradient-to-r from-indigo-600 to-cyan-500"></div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {pkg.name}
                          </h3>
                          {pkg.popular && (
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          )}
                        </div>
                        <p className="text-sm text-foreground/60 mt-1">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {pkg.price}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span className="text-sm text-foreground/80">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      className={`w-full py-3 rounded-lg font-semibold mb-4 transition-all ${
                        pkg.popular
                          ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:shadow-lg"
                          : "glass border border-white/20 text-foreground hover:bg-white/10"
                      }`}
                    >
                      {pkg.cta}
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditClick(pkg)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors border border-blue-500/20"
                    >
                      <Edit2 size={16} />
                      Edit Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
    </div>
  );
}
