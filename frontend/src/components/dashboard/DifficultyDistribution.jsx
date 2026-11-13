import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const DifficultyDistribution = ({
  easy = 340,
  medium = 392,
  hard = 110,
  total = 842,
}) => {
  const easyPct = Math.round((easy / total) * 100);
  const medPct = Math.round((medium / total) * 100);
  const hardPct = Math.round((hard / total) * 100);

  const data = [
    { name: "Easy", value: easy, color: "#10b981", percent: easyPct },
    { name: "Medium", value: medium, color: "#f59e0b", percent: medPct },
    { name: "Hard", value: hard, color: "#ef4444", percent: hardPct },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Difficulty Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Breakdown across {total} verified problems
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            {total} Solved
          </span>
        </div>

        {/* Donut Chart and Center Total */}
        <div className="relative h-44 my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg border border-slate-700">
                        <span className="font-semibold">{d.name}:</span> {d.value} ({d.percent}%)
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold font-mono text-slate-900 leading-none">
              {total}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
              Solved
            </span>
          </div>
        </div>

        {/* Clean Stacked Bar */}
        <div className="h-2 w-full flex rounded-full overflow-hidden bg-slate-100 gap-0.5">
          <div style={{ width: `${easyPct}%` }} className="bg-emerald-500 transition-all" />
          <div style={{ width: `${medPct}%` }} className="bg-amber-500 transition-all" />
          <div style={{ width: `${hardPct}%` }} className="bg-rose-500 transition-all" />
        </div>
      </div>

      {/* Numerical Rows */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-700">Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-slate-900">{easy}</span>
            <span className="text-slate-400 text-[11px]">({easyPct}%)</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="font-medium text-slate-700">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-slate-900">{medium}</span>
            <span className="text-slate-400 text-[11px]">({medPct}%)</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="font-medium text-slate-700">Hard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-slate-900">{hard}</span>
            <span className="text-slate-400 text-[11px]">({hardPct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
