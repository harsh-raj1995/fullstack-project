import React from "react";

export const ProgressBar = ({
  value = 0,
  max = 100,
  color = "indigo",
  height = "h-2",
  showLabel = false,
  className = "",
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colorMap = {
    indigo: "bg-indigo-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    blue: "bg-blue-600",
    slate: "bg-slate-600",
  };

  const barColor = colorMap[color] || colorMap.indigo;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs font-medium text-slate-600">
          <span>{percentage}%</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
