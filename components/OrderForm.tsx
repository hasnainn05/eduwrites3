"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Upload, X } from "lucide-react";
import { saveOrder, generateOrderId } from "@/lib/orderStorage";
import { getServicePricing, getPackageDetails } from "@/lib/pricing";
import type { Order } from "@/app/admin/orders/page";

interface OrderFormProps {
  preSelectedService?: string;
  preSelectedPackage?: string;
  onSuccess?: () => void;
}

export default function OrderForm({
  preSelectedService,
  preSelectedPackage,
  onSuccess,
}: OrderFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    serviceType: preSelectedService || "essay",
    packageType: preSelectedPackage || "basic",
    wordCount: "",
    deadline: "",
    budget: "",
    academicLevel: "undergraduate",
    subject: "",
    assignmentDetails: "",
    attachments: null as File | null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isBudgetLocked, setIsBudgetLocked] = useState(true);

  const serviceTypes = [
    { value: "essay", label: "Essay Writing" },
    { value: "assignment", label: "Assignment Writing" },
    { value: "research", label: "Research Paper" },
    { value: "thesis", label: "Thesis & Dissertation" },
    { value: "proofreading", label: "Proofreading & Editing" },
    { value: "dissertation", label: "Dissertation Writing" },
  ];

  const academicLevels = [
    { value: "high-school", label: "High School" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "masters", label: "Master's Level" },
    { value: "phd", label: "PhD Level" },
  ];

  // Update budget and word count when service or package changes
  useEffect(() => {
    const service = getServicePricing(formData.serviceType);
    const pkg = getPackageDetails(formData.serviceType, formData.packageType);

    if (pkg) {
      setFormData((prev) => ({
        ...prev,
        wordCount: pkg.words > 0 ? pkg.words.toString() : "",
        budget: pkg.price > 0 ? pkg.price.toString() : "",
      }));
      // Lock budget unless custom package
      setIsBudgetLocked(formData.packageType !== "custom");
    }
  }, [formData.serviceType, formData.packageType]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "attachments") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, attachments: file }));
      setFileName(file ? file.name : "");
    } else if (name === "packageType") {
      setFormData((prev) => ({
        ...prev,
        packageType: value,
      }));
      // Update lock state
      setIsBudgetLocked(value !== "custom");
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceTypeMap: { [key: string]: string } = {
      essay: "Essay Writing",
      assignment: "Assignment Writing",
      research: "Research Paper",
      thesis: "Thesis & Dissertation",
      proofreading: "Proofreading & Editing",
      dissertation: "Dissertation Writing",
    };

    const paperTypeMap: { [key: string]: string } = {
      essay: "Essay",
      assignment: "Assignment",
      research: "Research Paper",
      thesis: "Thesis",
      proofreading: "Edited Document",
      dissertation: "Dissertation",
    };

    const newOrder: Order = {
      id: generateOrderId(),
      fullName: formData.fullName,
      email: formData.email,
      service: serviceTypeMap[formData.serviceType] || formData.serviceType,
      deadline: formData.deadline,
      wordCount: parseInt(formData.wordCount) || 0,
      academicLevel: formData.academicLevel,
      subject: formData.subject,
      paperType: paperTypeMap[formData.serviceType] || "Assignment",
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      description: formData.assignmentDetails,
      attachments: formData.attachments ? [formData.attachments.name] : [],
      price: parseInt(formData.budget) || 0,
    };

    saveOrder(newOrder);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        serviceType: preSelectedService || "essay",
        packageType: preSelectedPackage || "basic",
        wordCount: "",
        deadline: "",
        budget: "",
        academicLevel: "undergraduate",
        subject: "",
        assignmentDetails: "",
        attachments: null,
      });
      setFileName("");
      setIsSubmitted(false);
      setIsBudgetLocked(true);
      onSuccess?.();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="glass p-12 rounded-2xl text-center">
        <div className="text-6xl mb-6">✓</div>
        <h2 className="text-3xl font-bold text-foreground mb-4 font-poppins">
          Order Submitted Successfully!
        </h2>
        <p className="text-foreground/80 mb-6">
          Thank you for your order! We've received your request and will contact
          you shortly to confirm the details.
        </p>
        <div className="bg-white/10 rounded-lg p-4 text-left">
          <p className="text-sm text-foreground/70 mb-2">
            <span className="font-semibold">Order ID:</span>{" "}
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-sm text-foreground/70">
            <span className="font-semibold">Email:</span> {formData.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-8 font-poppins">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            />
          </div>

          {/* Academic Level */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Academic Level *
            </label>
            <select
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            >
              {academicLevels.map((level) => (
                <option
                  key={level.value}
                  value={level.value}
                  className="bg-slate-900"
                >
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Service Details Section */}
      <div className="border-t-4 border-border pt-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 font-poppins">
          Service Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Service Type */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Service Type *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            >
              {serviceTypes.map((service) => (
                <option
                  key={service.value}
                  value={service.value}
                  className="bg-slate-900"
                >
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Package Type */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Package *
            </label>
            <select
              name="packageType"
              value={formData.packageType}
              onChange={handleChange}
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            >
              {getServicePricing(formData.serviceType)?.packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id} className="bg-slate-900">
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          {/* Word Count */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Word Count *
            </label>
            <input
              type="number"
              name="wordCount"
              value={formData.wordCount}
              onChange={handleChange}
              disabled={formData.packageType !== "custom"}
              placeholder="e.g., 5000"
              className={`w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium ${
                formData.packageType !== "custom"
                  ? "opacity-75 cursor-not-allowed"
                  : ""
              }`}
            />
            {formData.packageType !== "custom" && (
              <p className="text-xs text-foreground/50 mt-1 font-medium">
                Auto-set based on package
              </p>
            )}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Budget ($) *
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              disabled={isBudgetLocked}
              required
              placeholder="e.g., 100"
              className={`w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium ${
                isBudgetLocked ? "opacity-75 cursor-not-allowed" : ""
              }`}
            />
            {isBudgetLocked && (
              <p className="text-xs text-foreground/50 mt-1 font-medium">
                Auto-set based on package
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Assignment Details Section */}
      <div className="border-t-4 border-border pt-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 font-poppins">
          Assignment Details
        </h2>

        <div className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Subject/Topic *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g., Shakespeare's Impact on Modern Literature"
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors font-medium"
            />
          </div>

          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Assignment Details & Requirements *
            </label>
            <textarea
              name="assignmentDetails"
              value={formData.assignmentDetails}
              onChange={handleChange}
              required
              placeholder="Describe your assignment, requirements, guidelines, and any specific instructions..."
              rows={6}
              className="w-full bg-white border-4 border-border rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:border-4 transition-colors resize-none font-medium"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-base font-bold text-foreground/95 mb-2">
              Upload Files (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                name="attachments"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full bg-white border-4 border-dashed border-border rounded-lg px-4 py-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                <Upload size={28} className="mx-auto mb-3 text-accent" />
                <p className="text-base font-bold text-foreground mb-2">
                  {fileName || "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-foreground/60 font-medium">
                  PDF, DOC, DOCX, or TXT (Max 10MB)
                </p>
              </div>
            </div>
            {fileName && (
              <div className="mt-3 flex items-center gap-2 bg-white border-3 border-border p-3 rounded-lg">
                <span className="text-base font-bold text-foreground flex-1">
                  {fileName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, attachments: null }));
                    setFileName("");
                  }}
                  className="p-1 hover:bg-primary/10 rounded transition-colors"
                >
                  <X size={20} className="text-foreground/70" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t-4 border-border pt-8">
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 hover:shadow-glow transition-all transform hover:scale-105 duration-300 flex items-center justify-center gap-2 animate-pulse-bounce"
        >
          Submit Order <ArrowRight size={20} />
        </button>
      </div>
    </form>
  );
}
