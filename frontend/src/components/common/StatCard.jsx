import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  subvalue,
  badgeText,
  badgeType = "neutral", // "positive", "negative", "highlight", "neutral"
  icon: Icon,
  iconColor = "text-indigo-600 bg-indigo-50 border-indigo-100",
  onClick,
}) => {
  const badgeStyles = {
    positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
    negative: "bg-rose-50 text-rose-700 border-rose-200",
    highlight: "bg-indigo-50 text-indigo-700 border-indigo-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
  }[badgeType] || "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
              {value}
            </span>
            {subvalue && (
              <span className="text-xs text-slate-500 font-normal">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-lg border ${iconColor} shrink-0`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {badgeText && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${badgeStyles}`}
          >
            {badgeType === "positive" && <TrendingUp className="h-3 w-3" />}
            {badgeType === "negative" && <TrendingDown className="h-3 w-3" />}
            {badgeText}
          </span>
          <span className="text-[11px] text-slate-400">vs last week</span>
        </div>
      )}
    </div>
  );
};
