import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Code, BookOpen, User, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { DifficultyBadge } from "./DifficultyBadge";

export const GlobalSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, questions, developers } = useApp();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Filter matching questions
  const filteredQuestions = questions
    .filter(
      (q) =>
        q.title.toLowerCase().includes(query.toLowerCase()) ||
        q.topic.toLowerCase().includes(query.toLowerCase()) ||
        q.platform.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  // Filter matching developers
  const filteredDevs = developers
    .filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.username.toLowerCase().includes(query.toLowerCase()) ||
        d.college.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  // Navigation shortcuts
  const navShortcuts = [
    { label: "Dashboard Overview", path: "/dashboard", desc: "Main metrics & activity" },
    { label: "Practice Session Builder", path: "/practice", desc: "Custom test generator" },
    { label: "Spaced Revision Sheet", path: "/revision", desc: "Review failed problems" },
    { label: "Weekly Champions Leaderboard", path: "/leaderboard", desc: "Global & college ranks" },
    { label: "Platform Integrations", path: "/integrations", desc: "LeetCode, Codeforces sync" },
  ].filter((s) => s.label.toLowerCase().includes(query.toLowerCase()) || query === "");

  const handleSelect = (path) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, topics, developers, or jump to page... (Esc to close)"
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Questions */}
          {filteredQuestions.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="h-3 w-3" /> Problems ({filteredQuestions.length})
              </div>
              <div className="mt-1 space-y-0.5">
                {filteredQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSelect(`/questions?search=${encodeURIComponent(q.title)}`)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-600">
                        {q.title}
                      </span>
                      <DifficultyBadge difficulty={q.difficulty} size="sm" />
                      <span className="text-xs text-slate-400">{q.topic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono">{q.platform}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Navigation Pages */}
          {navShortcuts.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" /> Navigation Pages
              </div>
              <div className="mt-1 space-y-0.5">
                {navShortcuts.slice(0, 3).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-800 group-hover:text-indigo-600">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                    <div className="flex items-center text-xs text-slate-400">
                      <CornerDownLeft className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Developers */}
          {filteredDevs.length > 0 && (
            <div>
              <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="h-3 w-3" /> Developers
              </div>
              <div className="mt-1 space-y-0.5">
                {filteredDevs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/profile/${d.username}`)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={d.avatar}
                        alt={d.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-600">
                        {d.name}
                      </span>
                      <span className="text-xs text-slate-400">@{d.username}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {d.weeklyPoints} pts
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredQuestions.length === 0 &&
            navShortcuts.length === 0 &&
            filteredDevs.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-500">
                No matching questions, pages, or coders found for "{query}".
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↓</kbd></span>
            <span>Select: <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">↵</kbd></span>
          </div>
          <span className="flex items-center gap-1 text-indigo-600 font-medium">
            <Sparkles className="h-3 w-3" /> CodeArena Global Index
          </span>
        </div>
      </div>
    </div>
  );
};
