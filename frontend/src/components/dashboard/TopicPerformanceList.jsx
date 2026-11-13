import React from "react";
import { ProgressBar } from "../common/ProgressBar";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const TopicPerformanceList = ({ topics }) => {
  const getBadgeStyle = (status) => {
    switch (status) {
      case "Strong":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Moderate":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Weak":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getBarColor = (accuracy) => {
    if (accuracy >= 80) return "emerald";
    if (accuracy >= 65) return "amber";
    return "rose";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Algorithmic Topic Mastery
          </h3>
          <p className="text-xs text-slate-500">
            Accuracy and completion across standard DSA topics
          </p>
        </div>
        <Link
          to="/analytics"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
        >
          Detailed analytics
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {topics.slice(0, 8).map((item) => (
          <div key={item.topic} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-800">{item.topic}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-500 text-[11px]">
                  {item.solved}/{item.total}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getBadgeStyle(
                    item.status
                  )}`}
                >
                  {item.accuracy}%
                </span>
              </div>
            </div>
            <ProgressBar
              value={item.accuracy}
              max={100}
              color={getBarColor(item.accuracy)}
              height="h-1.5"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
