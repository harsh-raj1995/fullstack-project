import React from "react";
import { X, ExternalLink, Repeat, Calendar, Clock, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
import { DifficultyBadge } from "../common/DifficultyBadge";
import { PlatformBadge } from "../common/PlatformBadge";
import { TopicBadge } from "../common/TopicBadge";

export const QuestionDetailModal = ({ question, isOpen, onClose, onAddToRevision }) => {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <PlatformBadge platform={question.platform} />
              <DifficultyBadge difficulty={question.difficulty} />
              <TopicBadge topic={question.topic} />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {question.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Metadata Row */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Status
              </span>
              <span className={`font-semibold inline-flex items-center gap-1 mt-0.5 ${
                question.status === "Solved" ? "text-emerald-700" : "text-rose-700"
              }`}>
                {question.status === "Solved" ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                {question.status}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Time Spent
              </span>
              <span className="font-mono text-slate-700 mt-0.5 block">
                {question.timeSpent || "20 mins"}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Solved Date
              </span>
              <span className="font-mono text-slate-700 mt-0.5 block">
                {question.solvedDate}
              </span>
            </div>
          </div>

          {/* Subtopic */}
          {question.subTopic && (
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
                Subtopic & Pattern
              </span>
              <div className="text-xs text-slate-800 bg-slate-100 px-3 py-1.5 rounded-md inline-block font-medium">
                {question.subTopic}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
              Personal Takeaways & Notes
            </span>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
              {question.notes || "No notes recorded for this problem yet."}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            {question.externalUrl ? (
              <a
                href={question.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                <span>Open problem on {question.platform}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span />
            )}

            <button
              onClick={() => {
                onAddToRevision(question);
                onClose();
              }}
              disabled={question.inRevision}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                question.inRevision
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <Repeat className="h-3.5 w-3.5" />
              {question.inRevision ? "In Revision Sheet" : "Add to Revision Sheet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
