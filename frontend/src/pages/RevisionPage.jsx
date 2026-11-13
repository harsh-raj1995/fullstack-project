import React, { useState } from "react";
import {
  Repeat,
  CheckCircle2,
  Calendar,
  Clock,
  ExternalLink,
  Edit3,
  Trash2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Check,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { PlatformBadge } from "../components/common/PlatformBadge";
import { TopicBadge } from "../components/common/TopicBadge";
import { EmptyState } from "../components/common/EmptyState";

export const RevisionPage = () => {
  const {
    revisionItems,
    markRevisionReviewed,
    markRevisionMastered,
    removeRevisionItem,
    updateRevisionNotes,
  } = useApp();

  const [activeTab, setActiveTab] = useState("due"); // "all", "due", "upcoming", "completed"
  const [editingItem, setEditingItem] = useState(null);
  const [editNoteText, setEditNoteText] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Stats
  const totalCount = revisionItems.length;
  const dueCount = revisionItems.filter((r) => r.status === "Due Today").length;
  const upcomingCount = revisionItems.filter((r) => r.status === "Upcoming").length;
  const completedCount = revisionItems.filter((r) => r.status === "Completed").length;

  // Filter items based on active tab
  const filteredItems = revisionItems.filter((item) => {
    if (activeTab === "due") return item.status === "Due Today";
    if (activeTab === "upcoming") return item.status === "Upcoming";
    if (activeTab === "completed") return item.status === "Completed";
    return true; // "all"
  });

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditNoteText(item.notes || "");
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    updateRevisionNotes(editingItem.id, editNoteText);
    setEditingItem(null);
    showToast("Personal revision notes updated.");
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-700">
            <Repeat className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Revision Sheet
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Turn your previous mistakes into future strengths with spaced-repetition memory schedules.
            </p>
          </div>
        </div>
      </div>

      {/* Revision Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total in Revision
          </span>
          <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
            {totalCount}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Problems tracked
          </span>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
            Due Today
          </span>
          <span className="text-2xl font-bold font-mono text-amber-900 mt-1 block">
            {dueCount}
          </span>
          <span className="text-[11px] text-amber-700 mt-0.5 block">
            Requires active recall
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Upcoming Reviews
          </span>
          <span className="text-2xl font-bold font-mono text-slate-700 mt-1 block">
            {upcomingCount}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Next 7–14 days
          </span>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
            Mastered & Solved
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-900 mt-1 block">
            {completedCount}
          </span>
          <span className="text-[11px] text-emerald-700 mt-0.5 block">
            Retention box 5
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveTab("due")}
          className={`px-3.5 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === "due"
              ? "border-amber-600 text-amber-800"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <span>Due Today</span>
          {dueCount > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">
              {dueCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("all")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "all"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          All Questions ({totalCount})
        </button>

        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "upcoming"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Upcoming ({upcomingCount})
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "completed"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Cards List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <EmptyState
            icon={Repeat}
            title={activeTab === "due" ? "No revisions due today!" : "No questions in this tab"}
            description={
              activeTab === "due"
                ? "Great job staying ahead of your review curve. You can review upcoming questions or practice weak topics."
                : "Questions you fail in practice or flag in the tracker appear here."
            }
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-5 shadow-2xs transition-all space-y-3 ${
                item.status === "Due Today"
                  ? "border-amber-300 ring-1 ring-amber-100"
                  : item.status === "Completed"
                  ? "border-emerald-200 bg-emerald-50/20"
                  : "border-slate-200/90"
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <PlatformBadge platform={item.platform} />
                    <DifficultyBadge difficulty={item.difficulty} size="sm" />
                    <TopicBadge topic={item.topic} />
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        item.status === "Due Today"
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : item.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    {item.title}
                  </h3>
                </div>

                {/* Spaced repetition memory box */}
                <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                  <div className="flex items-center gap-1 font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    <span>Box {item.box || 1}/5</span>
                    <span className="text-[10px] text-slate-400">({item.reviewCount || 0} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Personal Notes & Key Takeaway */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700 uppercase tracking-wide text-[10px] flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-indigo-600" /> Personal Notes & Algorithmic Insight
                  </span>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    <Edit3 className="h-3 w-3" /> Edit
                  </button>
                </div>
                <p className="text-slate-800 leading-relaxed font-mono whitespace-pre-wrap">
                  {item.notes}
                </p>
                {item.keyTakeaway && (
                  <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200/60 font-sans">
                    <strong className="text-slate-700">Crucial Pitfall:</strong> {item.keyTakeaway}
                  </div>
                )}
              </div>

              {/* Dates & Actions Bottom Row */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Dates */}
                <div className="flex items-center gap-4 text-slate-500 text-[11px] font-mono">
                  <span>Added: {item.dateAdded}</span>
                  <span>Last Review: {item.lastReviewed}</span>
                  <span className={item.status === "Due Today" ? "font-bold text-amber-700" : ""}>
                    Next: {item.nextReviewDate}
                  </span>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                    >
                      <span>Solve Again</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}

                  {item.status !== "Completed" && (
                    <button
                      onClick={() => {
                        markRevisionReviewed(item.id);
                        showToast(`Advanced "${item.title}" to Box ${(item.box || 1) + 1}`);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-2xs"
                    >
                      <Check className="h-3 w-3" />
                      <span>Mark Reviewed</span>
                    </button>
                  )}

                  {item.status !== "Completed" && (
                    <button
                      onClick={() => {
                        markRevisionMastered(item.id);
                        showToast(`Marked "${item.title}" as Mastered!`);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Mastered</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      removeRevisionItem(item.id);
                      showToast(`Removed "${item.title}" from Revision Sheet.`);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                    title="Remove from Revision"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Notes Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setEditingItem(null)}
          />

          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <h3 className="text-sm font-semibold text-slate-900">
                Edit Revision Notes: {editingItem.title}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNotes} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Key Intuition, Pitfall, or Recurrence Relation
                </label>
                <textarea
                  rows={4}
                  required
                  value={editNoteText}
                  onChange={(e) => setEditNoteText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 font-mono"
                  placeholder="Record what tripped you up..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs"
                >
                  Save Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
