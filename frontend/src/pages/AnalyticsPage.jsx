import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const AnalyticsPage = () => {
  const { user, topics, weakTopicsList, platforms } = useApp();
  const navigate = useNavigate();

  // Growth over time data (Past 8 months)
  const cumulativeGrowthData = [
    { month: "Apr", solved: 320, weeklyPts: 140 },
    { month: "May", solved: 410, weeklyPts: 180 },
    { month: "Jun", solved: 490, weeklyPts: 210 },
    { month: "Jul", solved: 580, weeklyPts: 240 },
    { month: "Aug", solved: 660, weeklyPts: 290 },
    { month: "Sep", solved: 730, weeklyPts: 260 },
    { month: "Oct", solved: 810, weeklyPts: 320 },
    { month: "Nov", solved: 842, weeklyPts: 340 },
  ];

  // Weekly points history (Past 8 weeks)
  const weeklyPointsData = [
    { week: "W39", points: 210, easy: 10, medium: 40, hard: 25 },
    { week: "W40", points: 260, easy: 12, medium: 54, hard: 35 },
    { week: "W41", points: 240, easy: 8, medium: 46, hard: 35 },
    { week: "W42", points: 290, easy: 14, medium: 62, hard: 40 },
    { week: "W43", points: 310, easy: 12, medium: 65, hard: 45 },
    { week: "W44", points: 280, easy: 10, medium: 55, hard: 40 },
    { week: "W45", points: 320, easy: 15, medium: 68, hard: 45 },
    { week: "W46 (Curr)", points: 340, easy: 18, medium: 72, hard: 50 },
  ];

  // Platform distribution
  const platformData = platforms.map((p) => ({
    name: p.name,
    solved: p.solved,
    color: p.color,
  }));

  // Topic accuracy data sorted
  const sortedTopics = [...topics].sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200 text-indigo-700">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Performance Analytics & Diagnostics
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Deep algorithmic metrics, cumulative problem trajectories, and automated weakness detection.
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Weak Topic Alert */}
      <div className="bg-gradient-to-r from-rose-50/70 via-white to-amber-50/50 p-5 rounded-xl border border-rose-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-rose-100 text-rose-700 rounded-lg mt-0.5 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Diagnostic Priority: Dynamic Programming (48%) & Graphs (54%)
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Your overall algorithmic mastery is <strong>82%</strong>, but complex recurrence formulations and DAG traversal problems exhibit a <strong>52% failure rate</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/practice?weak=true")}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs shrink-0 self-start md:self-auto cursor-pointer"
        >
          <BrainCircuit className="h-3.5 w-3.5" />
          <span>Launch Weak Topics Drill</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Row 1: Cumulative Solved Trajectory */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Problem Trajectory Over Time
            </h3>
            <p className="text-xs text-slate-500">
              Cumulative count of verified solved problems across all platforms
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100">
            842 Total Solved (+522 in 8 months)
          </span>
        </div>

        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cumulativeGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700">
                        <span className="font-bold">{label}:</span> {payload[0].value} problems solved
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="solved" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSolved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Topic Accuracy Breakdown + Weekly Points History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Accuracy Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Topic Accuracy (% Success Rate)
              </h3>
              <p className="text-xs text-slate-500">
                Identifies weak topics at the bottom vs strong topics at the top
              </p>
            </div>

            <div className="h-72 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedTopics} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis type="category" dataKey="topic" tick={{ fontSize: 11, fill: "#334155" }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2 rounded shadow">
                            <strong>{d.topic}:</strong> {d.accuracy}% ({d.solved}/{d.total} solved)
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="accuracy"
                    radius={[0, 4, 4, 0]}
                    fill="#4f46e5"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Points Progression */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Weekly Competition Points History
                </h3>
                <p className="text-xs text-slate-500">
                  Consistent weekly point accumulation trend
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                340 pts this week
              </span>
            </div>

            <div className="h-72 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPointsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded shadow">
                            <strong>{label}:</strong> {payload[0].value} points
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="points" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Platform Contributions */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Platform-Wise Contribution Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of questions across connected competitive accounts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-4">
          {platforms.map((p) => {
            const pct = Math.round((p.solved / user.totalSolved) * 100);
            return (
              <div
                key={p.id}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-xs font-semibold text-slate-800 truncate">{p.name}</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-lg font-bold text-slate-900">{p.solved}</span>
                  <span className="text-xs font-mono text-slate-400">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
