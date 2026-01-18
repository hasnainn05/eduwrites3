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
    <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/10">
              <p className="text-foreground/70 text-sm mb-2">Total Reviews</p>
              <h3 className="text-3xl font-bold text-foreground">
                {reviews.length}
              </h3>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/10">
              <p className="text-foreground/70 text-sm mb-2">Average Rating</p>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold text-yellow-400">
                  {avgRating}
                </h3>
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/10">
              <p className="text-foreground/70 text-sm mb-2">
                Verified Reviews
              </p>
              <h3 className="text-3xl font-bold text-green-400">
                {reviews.filter((r) => r.verified).length}
              </h3>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
            />
          </div>

          {/* Reviews Grid */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">
                        {review.name}
                      </h3>
                      {review.verified && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">
                      {review.service}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-foreground/30"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-foreground/80 mb-4">{review.content}</p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground/50">{review.date}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
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
          <div className="w-full max-w-2xl glass rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingId ? "Edit Review" : "Add New Review"}
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">
                    Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
                  >
                    <option>Essay Writing</option>
                    <option>Thesis Writing</option>
                    <option>Research Paper</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
                    >
                      <Star
                        size={24}
                        className={
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-foreground/30"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">
                  Review Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-foreground focus:outline-none focus:border-cyan-400 transition-all"
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
                  className="w-5 h-5 rounded accent-cyan-400"
                />
                <label className="text-sm font-medium text-foreground/80">
                  Mark as Verified Review
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 rounded-lg glass border border-white/20 text-foreground hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReview}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all"
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
