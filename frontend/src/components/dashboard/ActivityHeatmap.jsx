import React, { useState } from "react";
import { generateHeatmapData } from "../../data/mockData";
import { Calendar, Flame, CheckCircle2, TrendingUp } from "lucide-react";

export const ActivityHeatmap = ({ totalActiveDays = 218, currentStreak = 28, consistencyScore = "92%" }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const days = React.useMemo(() => generateHeatmapData(), []);

  // Split days into weeks of 7 days
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "bg-emerald-200 hover:ring-2 hover:ring-emerald-400";
      case 2:
        return "bg-emerald-400 hover:ring-2 hover:ring-emerald-500";
      case 3:
        return "bg-emerald-500 hover:ring-2 hover:ring-emerald-600";
      case 4:
        return "bg-emerald-700 hover:ring-2 hover:ring-emerald-800";
      default:
        return "bg-slate-100 hover:bg-slate-200";
    }
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-900">
              Coding Activity Heatmap
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active daily problem solving consistency across all connected platforms
          </p>
        </div>

        {/* Quick Consistency Badges */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span><strong className="font-semibold text-slate-900">{totalActiveDays}</strong> Active Days</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span><strong className="font-semibold">{currentStreak}</strong> Day Streak</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
            <span><strong>{consistencyScore}</strong> Consistency</span>
          </div>
        </div>
      </div>

      {/* Heatmap Matrix */}
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="inline-flex gap-1.5">
          {/* Day of Week Labels */}
          <div className="flex flex-col gap-1.5 mr-1 text-[10px] text-slate-400 font-medium justify-between py-0.5">
            {dayLabels.map((label, idx) => (
              <span key={idx} className="h-3 flex items-center">
                {label}
              </span>
            ))}
          </div>

          {/* Grid columns (weeks) */}
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3 h-3 rounded-xs transition-all cursor-pointer ${getLevelColor(
                    day.level
                  )}`}
                  title={`${day.date}: ${day.count} problem${day.count === 1 ? "" : "s"} solved`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Legend & Tooltip status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
        <div className="font-mono text-[11px] text-slate-600 min-h-[16px]">
          {hoveredDay ? (
            <span>
              <strong>{hoveredDay.count} problem{hoveredDay.count === 1 ? "" : "s"}</strong> on {hoveredDay.date}
            </span>
          ) : (
            <span>Hover over any square for daily activity details</span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-xs bg-slate-100" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-200" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-700" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
