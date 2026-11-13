import React from "react";

export const DifficultyBadge = ({ difficulty, size = "md" }) => {
  const diff = (difficulty || "Medium").toLowerCase();

  const styles = {
    easy: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Easy",
    },
    medium: {
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      label: "Medium",
    },
    hard: {
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
      label: "Hard",
    },
  }[diff] || {
    bg: "bg-slate-50 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
    label: difficulty,
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold",
  }[size] || "px-2.5 py-1 text-xs font-semibold";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${styles.bg} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {styles.label}
    </span>
  );
};
