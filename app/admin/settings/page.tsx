"use client";

import { useState } from "react";
import {
  Save,
  Mail,
  MessageCircle,
  MapPin,
  Globe,
  Users,
  TrendingUp,
  Settings as SettingsIcon,
} from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: "EduWrites",
    email: "info@eduwrites.com",
    phone: "+1 (202) 555-0123",
    address: "123 Academic Street, Education City, EC 12345",
    website: "www.eduwrites.com",
    description:
      "Professional academic writing services for students worldwide",
    totalStudents: 10000,
    projectsCompleted: 1234,
    satisfactionRate: 98,
    expertWriters: 50,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setSettings({ ...settings, [field]: value });
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-poppins">
              Settings
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage your platform settings and information
            </p>
          </div>

          {/* Success Message */}
          {isSaved && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm font-medium flex items-center gap-2">
              <span className="text-lg">✓</span>
              Settings saved successfully!
            </div>
          )}

          {/* Company Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Company Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MessageCircle size={16} />
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Globe size={16} />
                  Website
                </label>
                <input
                  type="text"
                  value={settings.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Company Description
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Statistics & Metrics */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Statistics & Metrics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Students */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Users size={16} />
                  Total Students
                </label>
                <input
                  type="number"
                  value={settings.totalStudents}
                  onChange={(e) =>
                    handleChange("totalStudents", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Projects Completed */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Projects Completed
                </label>
                <input
                  type="number"
                  value={settings.projectsCompleted}
                  onChange={(e) =>
                    handleChange("projectsCompleted", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Expert Writers */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Expert Writers
                </label>
                <input
                  type="number"
                  value={settings.expertWriters}
                  onChange={(e) =>
                    handleChange("expertWriters", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>

              {/* Satisfaction Rate */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Satisfaction Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.satisfactionRate}
                  onChange={(e) =>
                    handleChange("satisfactionRate", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
    </div>
  );
}
