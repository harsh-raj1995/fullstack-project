import React, { useState, useMemo } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  ExternalLink,
  Repeat,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { PlatformBadge } from "../components/common/PlatformBadge";
import { TopicBadge } from "../components/common/TopicBadge";
import { EmptyState } from "../components/common/EmptyState";
import { QuestionDetailModal } from "../components/questions/QuestionDetailModal";

export const QuestionsPage = () => {
  const { questions, addToRevision, user } = useApp();
  const { openAddModal } = useOutletContext() || {};
  const location = useLocation();

  // Parse potential ?search query param from global search
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";

  // State filters
  const [search, setSearch] = useState(initialSearch);
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // "newest", "oldest", "difficulty", "title"

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected question for detail modal
  const [inspectQuestion, setInspectQuestion] = useState(null);

  // Success toast indicator for adding to revision
  const [toastMsg, setToastMsg] = useState("");

  const handleAddToRev = (q) => {
    addToRevision(q);
    setToastMsg(`Added "${q.title}" to Revision Sheet`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // Unique topics
  const allTopics = useMemo(() => {
    const set = new Set(questions.map((q) => q.topic));
    return ["All", ...Array.from(set).sort()];
  }, [questions]);

  // Unique platforms
  const allPlatforms = ["All", "LeetCode", "Codeforces", "CodeChef", "GeeksforGeeks", "HackerRank"];

  // Filtered & Sorted list
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        const matchesSearch =
          q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.topic.toLowerCase().includes(search.toLowerCase()) ||
          (q.subTopic && q.subTopic.toLowerCase().includes(search.toLowerCase()));

        const matchesPlatform =
          selectedPlatform === "All" || q.platform.toLowerCase() === selectedPlatform.toLowerCase();

        const matchesDiff =
          selectedDifficulty === "All" || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

        const matchesTopic =
          selectedTopic === "All" || q.topic.toLowerCase() === selectedTopic.toLowerCase();

        const matchesStatus =
          selectedStatus === "All" || q.status.toLowerCase() === selectedStatus.toLowerCase();

        return (
          matchesSearch &&
          matchesPlatform &&
          matchesDiff &&
          matchesTopic &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        if (sortBy === "newest") return new Date(b.solvedDate) - new Date(a.solvedDate);
        if (sortBy === "oldest") return new Date(a.solvedDate) - new Date(b.solvedDate);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "difficulty") {
          const rank = { Easy: 1, Medium: 2, Hard: 3 };
          return (rank[b.difficulty] || 0) - (rank[a.difficulty] || 0);
        }
        return 0;
      });
  }, [questions, search, selectedPlatform, selectedDifficulty, selectedTopic, selectedStatus, sortBy]);

  // Paginated items
  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Questions Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Comprehensive archive of solved and attempted algorithmic problems across all connected platforms.
          </p>
        </div>

        {openAddModal && (
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Manually Log Question</span>
          </button>
        )}
      </div>

      {/* Stats Counter Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="border-r border-slate-100 last:border-none pr-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Solved
          </span>
          <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
            {user.totalSolved}
          </span>
        </div>

        <div className="border-r border-slate-100 last:border-none pr-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Easy Solved
            </span>
          </div>
          <span className="text-xl font-bold font-mono text-emerald-700 mt-1 block">
            {user.easySolved}
          </span>
        </div>

        <div className="border-r border-slate-100 last:border-none pr-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Medium Solved
            </span>
          </div>
          <span className="text-xl font-bold font-mono text-amber-700 mt-1 block">
            {user.mediumSolved}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Hard Solved
            </span>
          </div>
          <span className="text-xl font-bold font-mono text-rose-700 mt-1 block">
            {user.hardSolved}
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        {/* Row 1: Search + Quick Selects */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by problem title, topic, or subpattern..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-indigo-600"
            >
              <option value="newest">Newest Solved</option>
              <option value="oldest">Oldest Solved</option>
              <option value="difficulty">Difficulty (Hard to Easy)</option>
              <option value="title">Problem Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Filter chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filters:
          </span>

          {/* Platform */}
          <select
            value={selectedPlatform}
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-700"
          >
            <option value="All">All Platforms</option>
            {allPlatforms.filter((p) => p !== "All").map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-700"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic */}
          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-700"
          >
            {allTopics.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Topics" : t}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved</option>
            <option value="Failed">Failed</option>
          </select>

          {/* Clear Filters Reset */}
          {(search || selectedPlatform !== "All" || selectedDifficulty !== "All" || selectedTopic !== "All" || selectedStatus !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedPlatform("All");
                setSelectedDifficulty("All");
                setSelectedTopic("All");
                setSelectedStatus("All");
                setCurrentPage(1);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Question Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {paginatedQuestions.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No questions match your criteria"
              description="Try clearing some filters or search for another problem name."
              actionLabel="Add this problem"
              onAction={openAddModal}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Problem Title</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Difficulty</th>
                  <th className="py-3 px-3">Topic</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date Solved</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {paginatedQuestions.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Title */}
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInspectQuestion(q)}
                          className="font-medium text-slate-900 hover:text-indigo-600 transition-colors text-left"
                        >
                          {q.title}
                        </button>
                        {q.inRevision && (
                          <span
                            className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded"
                            title="In Revision Sheet"
                          >
                            Revising
                          </span>
                        )}
                      </div>
                      {q.subTopic && (
                        <span className="text-[11px] text-slate-400 block font-normal mt-0.5">
                          {q.subTopic}
                        </span>
                      )}
                    </td>

                    {/* Platform */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <PlatformBadge platform={q.platform} size="sm" />
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <DifficultyBadge difficulty={q.difficulty} size="sm" />
                    </td>

                    {/* Topic */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <TopicBadge topic={q.topic} />
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {q.status === "Solved" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Solved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-medium">
                          <XCircle className="h-3.5 w-3.5 text-rose-600" />
                          Failed
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                      {q.solvedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Inspect detail */}
                        <button
                          onClick={() => setInspectQuestion(q)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                          title="View Details & Notes"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>

                        {/* Add to Revision */}
                        <button
                          onClick={() => handleAddToRev(q)}
                          disabled={q.inRevision}
                          className={`p-1.5 rounded transition-colors ${
                            q.inRevision
                              ? "text-slate-300 cursor-not-allowed"
                              : "text-amber-600 hover:bg-amber-50"
                          }`}
                          title={q.inRevision ? "Already in Revision" : "Add to Revision Sheet"}
                        >
                          <Repeat className="h-3.5 w-3.5" />
                        </button>

                        {/* External URL */}
                        {q.externalUrl && (
                          <a
                            href={q.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                            title={`Open on ${q.platform}`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong>{filteredQuestions.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> to{" "}
            <strong>{Math.min(currentPage * pageSize, filteredQuestions.length)}</strong> of{" "}
            <strong>{filteredQuestions.length}</strong> questions
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Inspect Detail Modal */}
      <QuestionDetailModal
        question={inspectQuestion}
        isOpen={!!inspectQuestion}
        onClose={() => setInspectQuestion(null)}
        onAddToRevision={handleAddToRev}
      />
    </div>
  );
};
