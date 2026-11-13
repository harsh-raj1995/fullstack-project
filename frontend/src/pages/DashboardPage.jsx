import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Code2,
  Zap,
  Flame,
  Trophy,
  Plus,
  RefreshCw,
  BrainCircuit,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { StatCard } from "../components/common/StatCard";
import { ActivityHeatmap } from "../components/dashboard/ActivityHeatmap";
import { DifficultyDistribution } from "../components/dashboard/DifficultyDistribution";
import { TopicPerformanceList } from "../components/dashboard/TopicPerformanceList";
import { WeakTopicsBanner } from "../components/dashboard/WeakTopicsBanner";
import { RecentActivityList } from "../components/dashboard/RecentActivityList";
import { ConnectedPlatformsCard } from "../components/dashboard/ConnectedPlatformsCard";
import { WeeklyLeaderboardPreview } from "../components/dashboard/WeeklyLeaderboardPreview";

export const DashboardPage = () => {
  const { user, topics, weakTopicsList, questions, revisionItems, syncAllPlatforms, isSyncingAll } = useApp();
  const navigate = useNavigate();
  const { openAddModal } = useOutletContext() || {};

  const handlePracticeWeak = () => {
    navigate("/practice?weak=true");
  };

  return (
    <div className="space-y-6">
      {/* Top Greeting & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back, {user.name.split(" ")[0]}.
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Session
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's your coding progress, weekly competitive standing and algorithmic health at a glance.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={syncAllPlatforms}
            disabled={isSyncingAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors shadow-2xs disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-indigo-600 ${
                isSyncingAll ? "animate-spin" : ""
              }`}
            />
            <span>{isSyncingAll ? "Syncing..." : "Sync Platforms"}</span>
          </button>

          {openAddModal && (
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log Problem</span>
            </button>
          )}

          <button
            onClick={() => navigate("/practice")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200/80 transition-colors"
          >
            <BrainCircuit className="h-3.5 w-3.5 text-indigo-600" />
            <span>Practice Studio</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Problems Solved"
          value={user.totalSolved}
          subvalue="across 5 platforms"
          badgeText="+14 this week"
          badgeType="positive"
          icon={Code2}
          iconColor="text-indigo-600 bg-indigo-50 border-indigo-100"
          onClick={() => navigate("/questions")}
        />

        <StatCard
          title="Weekly Points"
          value={user.weeklyPoints}
          subvalue="pts accumulated"
          badgeText="Top 4% globally"
          badgeType="highlight"
          icon={Zap}
          iconColor="text-amber-600 bg-amber-50 border-amber-100"
          onClick={() => navigate("/leaderboard")}
        />

        <StatCard
          title="Current Streak"
          value={`${user.currentStreak} Days`}
          subvalue={`Best: ${user.bestStreak}d`}
          badgeText="Consistent Coder"
          badgeType="positive"
          icon={Flame}
          iconColor="text-rose-600 bg-rose-50 border-rose-100"
        />

        <StatCard
          title="Global Ranking"
          value={`#${user.globalRank}`}
          subvalue={`#${user.collegeRank} in IIT Delhi`}
          badgeText="▲ 4 places this week"
          badgeType="positive"
          icon={Trophy}
          iconColor="text-purple-600 bg-purple-50 border-purple-100"
          onClick={() => navigate("/leaderboard")}
        />
      </div>

      {/* Prominent Weak Topics Callout */}
      <WeakTopicsBanner
        weakTopics={weakTopicsList}
        onPracticeWeak={handlePracticeWeak}
      />

      {/* Middle Grid: Activity Heatmap + Difficulty Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityHeatmap
            totalActiveDays={user.totalActiveDays}
            currentStreak={user.currentStreak}
            consistencyScore={user.consistencyScore}
          />
        </div>

        <div className="lg:col-span-1">
          <DifficultyDistribution
            easy={user.easySolved}
            medium={user.mediumSolved}
            hard={user.hardSolved}
            total={user.totalSolved}
          />
        </div>
      </div>

      {/* Topic Performance Bars */}
      <TopicPerformanceList topics={topics} />

      {/* Bottom 3 Columns: Recent Activity + Connected Platforms + Weekly Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecentActivityList
          questions={questions}
          revisionItems={revisionItems}
        />

        <ConnectedPlatformsCard />

        <WeeklyLeaderboardPreview />
      </div>
    </div>
  );
};
