import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  User,
  Building2,
  Calendar,
  Globe,
  Flame,
  Zap,
  Trophy,
  CheckCircle2,
  Award,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Edit,
  UserPlus,
  UserCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ActivityHeatmap } from "../components/dashboard/ActivityHeatmap";
import { DifficultyDistribution } from "../components/dashboard/DifficultyDistribution";
import { TopicPerformanceList } from "../components/dashboard/TopicPerformanceList";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { PlatformBadge } from "../components/common/PlatformBadge";

export const ProfilePage = () => {
  const { username } = useParams();
  const { user: currentUser, developers, toggleFollow, achievements, questions, topics } = useApp();

  // If username param matches a developer from community, display that coder; otherwise currentUser
  const targetDev = developers.find((d) => d.username === username);
  const isSelf = !username || username === currentUser.username;

  const profileData = isSelf
    ? currentUser
    : {
        ...targetDev,
        email: `${targetDev?.username}@example.edu`,
        department: "Computer Science",
        graduationYear: 2026,
        currentStreak: 21,
        bestStreak: 35,
        totalActiveDays: 184,
        consistencyScore: "88%",
        globalRank: 120,
        collegeRank: 2,
        easySolved: Math.round(targetDev?.totalSolved * 0.4),
        mediumSolved: Math.round(targetDev?.totalSolved * 0.45),
        hardSolved: Math.round(targetDev?.totalSolved * 0.15),
        totalSolved: targetDev?.totalSolved,
        weeklyPoints: targetDev?.weeklyPoints,
        followersCount: targetDev?.followers,
        followingCount: 34,
        performanceTags: targetDev?.tags?.map((t) => ({ label: t, variant: "indigo" })) || [],
        connectedPlatforms: currentUser.connectedPlatforms,
      };

  const [activeProfileTab, setActiveProfileTab] = useState("overview"); // "overview", "solved", "achievements"

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Banner strip */}
        <div className="h-28 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-300 bg-white/10 px-2 py-0.5 rounded border border-white/10">
              Verified Competitive Profile
            </span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            {/* Avatar & Identifiers */}
            <div className="flex items-end gap-4">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900">
                    {profileData.name}
                  </h1>
                  <span title="Verified Coder">
                    <ShieldCheck className="h-4 w-4 text-indigo-600" />
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  @{profileData.username}
                </span>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              {isSelf ? (
                <Link
                  to="/settings"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shadow-2xs"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit Profile</span>
                </Link>
              ) : (
                <button
                  onClick={() => toggleFollow(targetDev.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    targetDev?.isFollowing
                      ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs"
                  }`}
                >
                  {targetDev?.isFollowing ? (
                    <>
                      <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Follow Developer</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bio & Details */}
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
            {profileData.bio}
          </p>

          {/* Meta line */}
          <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              {profileData.college}
            </span>

            {profileData.github && (
              <a
                href={profileData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-medium"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}

            {profileData.linkedin && (
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-medium"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.25a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            )}

            <span className="flex items-center gap-1 font-mono text-slate-700">
              <strong>{profileData.followersCount}</strong> Followers • <strong>{profileData.followingCount}</strong> Following
            </span>
          </div>

          {/* Performance Tags Shelf */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mr-1">
              Badges:
            </span>
            {profileData.performanceTags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
              >
                {tag.label || tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Numerical Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Solved
          </span>
          <span className="font-mono text-xl font-bold text-slate-900 mt-1 block">
            {profileData.totalSolved}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Global Rank
          </span>
          <span className="font-mono text-xl font-bold text-indigo-700 mt-1 block">
            #{profileData.globalRank}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            College Rank
          </span>
          <span className="font-mono text-xl font-bold text-slate-900 mt-1 block">
            #{profileData.collegeRank}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider block">
            Streak
          </span>
          <span className="font-mono text-xl font-bold text-amber-600 mt-1 block flex items-center justify-center gap-1">
            <Flame className="h-4 w-4 fill-amber-500" />
            {profileData.currentStreak}d
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Weekly Pts
          </span>
          <span className="font-mono text-xl font-bold text-indigo-700 mt-1 block">
            {profileData.weeklyPoints} pts
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs text-center">
          <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block">
            Consistency
          </span>
          <span className="font-mono text-xl font-bold text-emerald-600 mt-1 block">
            {profileData.consistencyScore || "92%"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveProfileTab("overview")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeProfileTab === "overview"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Activity & Analytics
        </button>
        <button
          onClick={() => setActiveProfileTab("solved")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeProfileTab === "solved"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Recent Solved Problems
        </button>
        <button
          onClick={() => setActiveProfileTab("achievements")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeProfileTab === "achievements"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Achievements & Badges ({achievements.length})
        </button>
      </div>

      {/* Tab: Overview (Heatmap, Difficulty, Topic Mastery) */}
      {activeProfileTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityHeatmap
                totalActiveDays={profileData.totalActiveDays}
                currentStreak={profileData.currentStreak}
                consistencyScore={profileData.consistencyScore}
              />
            </div>
            <div className="lg:col-span-1">
              <DifficultyDistribution
                easy={profileData.easySolved}
                medium={profileData.mediumSolved}
                hard={profileData.hardSolved}
                total={profileData.totalSolved}
              />
            </div>
          </div>

          <TopicPerformanceList topics={topics} />
        </div>
      )}

      {/* Tab: Recent Solved Questions */}
      {activeProfileTab === "solved" && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <span className="text-xs font-semibold text-slate-900">
              Verified Solved Log
            </span>
            <span className="text-xs text-slate-500">
              Showing recent problem solves across all platforms
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {questions.slice(0, 10).map((q) => (
              <div key={q.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{q.title}</span>
                      <DifficultyBadge difficulty={q.difficulty} size="sm" />
                      <PlatformBadge platform={q.platform} size="sm" />
                    </div>
                    <span className="text-slate-400 text-[11px] block mt-0.5">
                      {q.topic} • Solved on {q.solvedDate} • Time: {q.timeSpent}
                    </span>
                  </div>
                </div>

                {q.externalUrl && (
                  <a
                    href={q.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Achievements & Badges */}
      {activeProfileTab === "achievements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-xl border shadow-2xs flex flex-col justify-between space-y-3 ${
                ach.completed
                  ? "bg-white border-slate-200/90"
                  : "bg-slate-50/60 border-slate-200 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div
                    className={`p-2.5 rounded-lg border text-xs ${
                      ach.tier === "Gold"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : ach.tier === "Platinum"
                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Award className="h-5 w-5" />
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      ach.completed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {ach.completed ? "Unlocked" : "Locked"}
                  </span>
                </div>

                <h4 className="mt-3 text-sm font-bold text-slate-900">
                  {ach.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Progress: {ach.progress}</span>
                {ach.unlockedAt && <span>{ach.unlockedAt}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
