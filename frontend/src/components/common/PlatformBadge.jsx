import React from "react";
import { Code2, Terminal, Award, BookOpen, ChefHat } from "lucide-react";

export const PlatformBadge = ({ platform, showIcon = true, size = "md" }) => {
  const p = (platform || "").toLowerCase();

  const configs = {
    leetcode: {
      name: "LeetCode",
      color: "text-amber-700 bg-amber-50/80 border-amber-200",
      icon: Code2,
    },
    codeforces: {
      name: "Codeforces",
      color: "text-blue-700 bg-blue-50/80 border-blue-200",
      icon: Terminal,
    },
    codechef: {
      name: "CodeChef",
      color: "text-amber-900 bg-amber-50 border-amber-300",
      icon: ChefHat,
    },
    geeksforgeeks: {
      name: "GeeksforGeeks",
      color: "text-emerald-800 bg-emerald-50 border-emerald-200",
      icon: BookOpen,
    },
    hackerrank: {
      name: "HackerRank",
      color: "text-teal-700 bg-teal-50 border-teal-200",
      icon: Award,
    },
  };

  const current = configs[p] || {
    name: platform,
    color: "text-slate-700 bg-slate-100 border-slate-200",
    icon: Code2,
  };

  const IconComp = current.icon;
  const sizeClasses = size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded border ${current.color} ${sizeClasses}`}
    >
      {showIcon && <IconComp className="h-3 w-3 shrink-0" />}
      {current.name}
    </span>
  );
};
