import React, { useState } from "react";
import { X, Plus, ExternalLink, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AddQuestionModal = ({ isOpen, onClose }) => {
  const { addQuestion } = useApp();

  const [formData, setFormData] = useState({
    title: "",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    subTopic: "",
    status: "Solved",
    attempts: 1,
    timeSpent: "25 mins",
    externalUrl: "",
    notes: "",
    addToRevision: false,
  });

  if (!isOpen) return null;

  const topicsList = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Binary Search",
    "Greedy",
    "Backtracking",
    "Stack and Queue",
    "Heap / Priority Queue",
    "Sliding Window",
    "Bit Manipulation",
    "Math",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addQuestion(formData);
    onClose();
    // Reset form
    setFormData({
      title: "",
      platform: "LeetCode",
      difficulty: "Medium",
      topic: "Dynamic Programming",
      subTopic: "",
      status: "Solved",
      attempts: 1,
      timeSpent: "25 mins",
      externalUrl: "",
      notes: "",
      addToRevision: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Log Coding Question
            </h2>
            <p className="text-xs text-slate-500">
              Record a manual question solve or review entry
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Question Title */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Problem Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Longest Palindromic Substring"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Grid: Platform & Difficulty */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              >
                <option value="LeetCode">LeetCode</option>
                <option value="Codeforces">Codeforces</option>
                <option value="CodeChef">CodeChef</option>
                <option value="GeeksforGeeks">GeeksforGeeks</option>
                <option value="HackerRank">HackerRank</option>
                <option value="AtCoder">AtCoder</option>
                <option value="Manual / Other">Manual / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              >
                <option value="Easy">Easy (Green - 1 pt)</option>
                <option value="Medium">Medium (Amber - 2 pts)</option>
                <option value="Hard">Hard (Red - 4 pts)</option>
              </select>
            </div>
          </div>

          {/* Grid: Topic & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Algorithmic Topic
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              >
                {topicsList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Result Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              >
                <option value="Solved">Solved (Success)</option>
                <option value="Failed">Failed (Needs Revision)</option>
              </select>
            </div>
          </div>

          {/* Grid: Subtopic, Time & Attempts */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Subtopic / Pattern
              </label>
              <input
                type="text"
                placeholder="e.g. 2D DP, Monotonic Stack"
                value={formData.subTopic}
                onChange={(e) => setFormData({ ...formData, subTopic: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Time Spent
              </label>
              <input
                type="text"
                placeholder="e.g. 25 mins"
                value={formData.timeSpent}
                onChange={(e) => setFormData({ ...formData, timeSpent: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Attempts
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.attempts}
                onChange={(e) => setFormData({ ...formData, attempts: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>
          </div>

          {/* External Problem Link */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              External Problem URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                placeholder="https://leetcode.com/problems/..."
                value={formData.externalUrl}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 font-mono"
              />
            </div>
          </div>

          {/* Notes & Key Takeaways */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Notes & Key Algorithmic Insight
            </label>
            <textarea
              rows={3}
              placeholder="Record the core intuition, edge cases, or complexity..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          {/* Auto Revision Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="addToRev"
              checked={formData.addToRevision || formData.status === "Failed"}
              disabled={formData.status === "Failed"}
              onChange={(e) => setFormData({ ...formData, addToRevision: e.target.checked })}
              className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label htmlFor="addToRev" className="text-xs text-slate-700 cursor-pointer">
              Add directly to <strong>Revision Sheet</strong> for spaced repetition
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
