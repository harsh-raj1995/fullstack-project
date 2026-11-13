import React from "react";
import { AlertTriangle, ArrowRight, BrainCircuit, Target, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WeakTopicsBanner = ({ weakTopics, onPracticeWeak }) => {
  const navigate = useNavigate();

  const handlePracticeClick = () => {
    if (onPracticeWeak) {
      onPracticeWeak();
    } else {
      navigate("/practice");
    }
  };

  return (
    <div className="bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-indigo-50/30 rounded-xl border border-rose-200/80 p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-rose-100 text-rose-700">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-rose-800">
              Algorithmic Weakness Detected
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Targeted Remediation Required in Dynamic Programming & Graphs
          </h3>

          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Your recent failure rate on <strong>Dynamic Programming (52% error rate)</strong> and{" "}
            <strong>Graphs (46% error rate)</strong> is dragging down your weekly rank. Targeted drills will quickly boost your contest rating.
          </p>

          {/* Cards for each weak topic */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            {weakTopics.slice(0, 2).map((item) => (
              <div
                key={item.topic}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-xs shadow-2xs"
              >
                <Target className="h-3.5 w-3.5 text-rose-600" />
                <span className="font-semibold text-slate-800">{item.topic}</span>
                <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                  {item.accuracy}% Accuracy
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  ({item.failed} failed questions)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            onClick={handlePracticeClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all group cursor-pointer"
          >
            <BrainCircuit className="h-4 w-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <span>Practice Weak Topics</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
