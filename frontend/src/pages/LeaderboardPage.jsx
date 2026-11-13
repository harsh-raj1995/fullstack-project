import React, { useState } from "react";
import {
  Trophy,
  Crown,
  Medal,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Calendar,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

export const LeaderboardPage = () => {
  const {
    leaderboard,
    leaderboardFilter,
    setLeaderboardFilter,
    selectedWeek,
    setSelectedWeek,
    user,
    toggleFollow,
  } = useApp();

  // Filter options
  const filterOptions = ["Global", "My College", "Following", "Friends"];
  const weekOptions = [
    "Week 46 (Nov 09 - Nov 15) - Current",
    "Week 45 (Nov 02 - Nov 08)",
    "Week 44 (Oct 26 - Nov 01)",
  ];

  // Apply filters
  const filteredList = leaderboard.filter((coder) => {
    if (leaderboardFilter === "My College") {
      return (
        coder.college.toLowerCase().includes("delhi") ||
        coder.college.toLowerCase().includes("iit delhi")
      );
    }
    if (leaderboardFilter === "Following") {
      return coder.isFollowing || coder.isCurrentUser;
    }
    if (leaderboardFilter === "Friends") {
      return coder.isFollowing || coder.isCurrentUser;
    }
    return true; // Global
  });

  const podium = filteredList.slice(0, 3);
  const currentUserRow = leaderboard.find((u) => u.isCurrentUser);

  const getRankMovement = (rank, prevRank) => {
    if (!prevRank || rank === prevRank) {
      return (
        <span className="flex items-center text-slate-400 font-mono text-[11px]" title="No rank change">
          <Minus className="h-3 w-3" />
        </span>
      );
    }
    if (rank < prevRank) {
      return (
        <span className="flex items-center text-emerald-600 font-mono text-[11px] font-semibold" title={`Up ${prevRank - rank} places`}>
          <TrendingUp className="h-3 w-3 mr-0.5" />
          +{prevRank - rank}
        </span>
      );
    }
    return (
      <span className="flex items-center text-rose-600 font-mono text-[11px] font-semibold" title={`Down ${rank - prevRank} places`}>
        <TrendingDown className="h-3 w-3 mr-0.5" />
        -{rank - prevRank}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-700">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Weekly Champions League
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Competitive ranking resets every Sunday midnight. Easy = 1 pt • Med = 2 pts • Hard = 4 pts.
              </p>
            </div>
          </div>
        </div>

        {/* Week Selector Dropdown */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:border-indigo-600 shadow-2xs"
          >
            {weekOptions.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Point System Explainer Ribbon */}
      <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 border border-indigo-400/30 rounded-lg text-amber-400 shrink-0">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Scoring Formula
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Solve algorithmic problems to gain points:{" "}
              <strong className="text-emerald-400">Easy (+1 pt)</strong>,{" "}
              <strong className="text-amber-400">Medium (+2 pts)</strong>,{" "}
              <strong className="text-rose-400">Hard (+4 pts)</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          <span className="px-2 py-1 bg-white/10 rounded border border-white/10 text-slate-200">
            Week Ends: <strong>2d 14h 22m</strong>
          </span>
        </div>
      </div>

      {/* Top Three Podium */}
      {podium.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* #2 Second Place */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col items-center text-center justify-between order-2 md:order-1 relative">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-700 text-xs mb-2">
              #2
            </div>
            <img
              src={podium[1].avatar}
              alt={podium[1].name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-xs mb-2"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{podium[1].name}</h3>
              <span className="text-xs text-slate-500 font-mono">@{podium[1].username}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[200px]">
                {podium[1].college}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs">
              <span className="text-slate-500">{podium[1].solvedTotal} Solved</span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                {podium[1].weeklyPoints} pts
              </span>
            </div>
          </div>

          {/* #1 First Place (Elevated Champion) */}
          <div className="bg-gradient-to-b from-amber-50/50 via-white to-white rounded-xl border-2 border-amber-300 p-6 shadow-sm flex flex-col items-center text-center justify-between order-1 md:order-2 relative">
            <div className="absolute -top-3.5 px-3 py-0.5 bg-amber-500 text-white font-bold text-[10px] tracking-wider uppercase rounded-full shadow-xs flex items-center gap-1">
              <Crown className="h-3 w-3" /> Weekly Leader
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-mono font-bold text-amber-900 text-sm mb-2 mt-1">
              #1
            </div>
            <img
              src={podium[0].avatar}
              alt={podium[0].name}
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-md mb-2"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">{podium[0].name}</h3>
              <span className="text-xs text-indigo-600 font-mono font-medium">@{podium[0].username}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5 truncate max-w-[220px]">
                {podium[0].college}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-amber-100 w-full flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{podium[0].solvedTotal} Solved</span>
              <span className="font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-200">
                {podium[0].weeklyPoints} pts
              </span>
            </div>
          </div>

          {/* #3 Third Place */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col items-center text-center justify-between order-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-100/70 border border-amber-200 flex items-center justify-center font-mono font-bold text-amber-800 text-xs mb-2">
              #3
            </div>
            <img
              src={podium[2].avatar}
              alt={podium[2].name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-xs mb-2"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{podium[2].name}</h3>
              <span className="text-xs text-slate-500 font-mono">@{podium[2].username}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[200px]">
                {podium[2].college}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs">
              <span className="text-slate-500">{podium[2].solvedTotal} Solved</span>
              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                {podium[2].weeklyPoints} pts
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Position Banner for Current User */}
      {currentUserRow && (
        <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="font-mono font-extrabold text-indigo-700 text-lg px-2.5 py-1 rounded-lg bg-white border border-indigo-200">
              #{currentUserRow.rank}
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {user.name} (Your Position)
                </span>
                <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.2 rounded-full">
                  Top 4%
                </span>
              </div>
              <span className="text-xs text-indigo-800">
                {user.college} • +38 pts this week • Need 15 pts to reach Top 10!
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono self-end sm:self-auto">
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">Points Earned</span>
              <span className="text-base font-bold text-indigo-900">{currentUserRow.weeklyPoints} pts</span>
            </div>
            <Link
              to="/practice"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs"
            >
              Solve Problems
            </Link>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs max-w-md">
        {filterOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setLeaderboardFilter(tab)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              leaderboardFilter === tab
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ranking Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-3">Developer</th>
                <th className="py-3 px-3">University / College</th>
                <th className="py-3 px-3">Solved (E / M / H)</th>
                <th className="py-3 px-3">Tags & Accolades</th>
                <th className="py-3 px-4 text-right">Weekly Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((coder) => {
                const isUser = coder.isCurrentUser;
                return (
                  <tr
                    key={coder.id}
                    className={`transition-colors ${
                      isUser
                        ? "bg-indigo-50/50 font-medium"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Rank with movement */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 font-mono font-bold">
                        <span className={coder.rank <= 3 ? "text-amber-700" : "text-slate-700"}>
                          #{coder.rank}
                        </span>
                        {getRankMovement(coder.rank, coder.prevRank)}
                      </div>
                    </td>

                    {/* Developer name & avatar */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={coder.avatar}
                          alt={coder.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/profile/${coder.username}`}
                              className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                            >
                              {coder.name}
                            </Link>
                            {isUser && (
                              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-1 rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            @{coder.username}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* College */}
                    <td className="py-3.5 px-3 text-slate-600 truncate max-w-[200px]">
                      {coder.college}
                    </td>

                    {/* Solved breakdown */}
                    <td className="py-3.5 px-3 font-mono">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="font-bold text-slate-800">{coder.solvedTotal}</span>
                        <span className="text-slate-400">
                          (<span className="text-emerald-700">{coder.easy}</span>/
                          <span className="text-amber-700">{coder.medium}</span>/
                          <span className="text-rose-700">{coder.hard}</span>)
                        </span>
                      </div>
                    </td>

                    {/* Tags */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        {coder.tags?.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Weekly Points */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-mono font-bold text-sm text-slate-900">
                        {coder.weeklyPoints} pts
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold font-mono">
                        {coder.pointsEarnedThisWeek}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
