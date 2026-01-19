"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Star, Search } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alex Chen",
      service: "Essay Writing",
      rating: 5,
      content:
        "Amazing essay writing service! My paper was well-researched, properly formatted, and delivered on time.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "Jamie Rodriguez",
      service: "Thesis Writing",
      rating: 5,
      content:
        "Outstanding thesis assistance. The team understood my research perfectly and delivered exceptional results.",
      date: "2024-01-14",
      verified: true,
    },
    {
      id: 3,
      name: "Morgan Taylor",
      service: "Research Paper",
      rating: 4,
      content:
        "Great proofreading service. My assignment was polished to perfection with incredible attention to detail.",
      date: "2024-01-13",
      verified: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    service: "Essay Writing",
    rating: 5,
    content: "",
    verified: true,
  });

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddReview = () => {
    setEditingId(null);
    setFormData({
      name: "",
      service: "Essay Writing",
      rating: 5,
      content: "",
      verified: true,
    });
    setShowModal(true);
  };

  const handleEditReview = (review: (typeof reviews)[0]) => {
    setEditingId(review.id);
    setFormData({
      name: review.name,
      service: review.service,
      rating: review.rating,
      content: review.content,
      verified: review.verified,
    });
    setShowModal(true);
  };

  const handleSaveReview = () => {
    if (editingId) {
      setReviews(
        reviews.map((r) =>
          r.id === editingId ? { ...r, ...formData, date: r.date } : r,
        ),
      );
    } else {
      setReviews([
        ...reviews,
        {
          id: Math.max(...reviews.map((r) => r.id), 0) + 1,
          ...formData,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="p-4 sm:p-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-poppins">
              Reviews
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage customer reviews and ratings
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all">
              <p className="text-slate-600 text-sm mb-2">Total Reviews</p>
              <h3 className="text-4xl font-bold text-slate-900">
                {reviews.length}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all">
              <p className="text-slate-600 text-sm mb-2">Average Rating</p>
              <div className="flex items-center gap-3">
                <h3 className="text-4xl font-bold text-yellow-600">
                  {avgRating}
                </h3>
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all">
              <p className="text-slate-600 text-sm mb-2">
                Verified Reviews
              </p>
              <h3 className="text-4xl font-bold text-green-600">
                {reviews.filter((r) => r.verified).length}
              </h3>
            </div>
          </div>

          {/* Search and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
              />
            </div>
            <button
              onClick={handleAddReview}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all whitespace-nowrap"
            >
              <Plus size={20} />
              Add Review
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900">
                        {review.name}
                      </h3>
                      {review.verified && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {review.service}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-slate-700 mb-4">{review.content}</p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{review.date}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingId ? "Edit Review" : "Add New Review"}
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  >
                    <option>Essay Writing</option>
                    <option>Thesis Writing</option>
                    <option>Research Paper</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                    >
                      <Star
                        size={24}
                        className={
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Review Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="Enter review content"
                  rows={5}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) =>
                    setFormData({ ...formData, verified: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-slate-700">
                  Mark as Verified Review
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReview}
                className="flex-1 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
              >
                {editingId ? "Update Review" : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
