import React from "react";

export const TopicBadge = ({ topic, variant = "default" }) => {
  const isWeak = variant === "weak";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
        isWeak
          ? "bg-rose-50 text-rose-700 border-rose-200"
          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80 transition-colors"
      }`}
    >
      {topic}
    </span>
  );
};
