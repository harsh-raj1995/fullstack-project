import React from "react";
import { Trophy, Crown, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export const WeeklyLeaderboardPreview = () => {
  const { leaderboard, user } = useApp();
  const topThree = leaderboard.slice(0, 3);
  const userRank = leaderboard.find((u) => u.isCurrentUser) || {
    rank: user.globalRank,
    weeklyPoints: user.weeklyPoints,
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <span className="p-1 rounded-full bg-amber-100 text-amber-700">
            <Crown className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          </span>
        );
      case 2:
        return (
          <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
            2
          </span>
        );
      case 3:
        return (
          <span className="h-5 w-5 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center text-[10px] font-bold">
            3
          </span>
        );
      default:
        return <span className="text-xs font-mono text-slate-500">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-900">
                Weekly Champions
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Week 46 • Ends in 2d 14h
            </p>
          </div>
          <Link
            to="/leaderboard"
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-0.5"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Top 3 list */}
        <div className="mt-3 space-y-2">
          {topThree.map((coder) => (
            <div
              key={coder.id}
              className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {getRankBadge(coder.rank)}
                <img
                  src={coder.avatar}
                  alt={coder.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {coder.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {coder.college}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/60 shrink-0">
                <Zap className="h-3 w-3 fill-indigo-600" />
                {coder.weeklyPoints} pts
              </div>
            </div>
          ))}
        </div>

        {/* Current User Sticky Highlight */}
        <div className="mt-3 p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xs font-mono font-bold text-indigo-700">
              #{userRank.rank}
            </span>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-indigo-300 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-indigo-950 truncate">
                {user.name} (You)
              </div>
              <div className="text-[10px] text-indigo-600 truncate">
                Top 4% globally
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono font-bold text-indigo-700">
              {userRank.weeklyPoints} pts
            </div>
            <div className="text-[10px] text-slate-500">
              +38 this week
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <span className="text-[11px] text-slate-400">
          Easy = 1 pt • Med = 2 pts • Hard = 4 pts
        </span>
      </div>
    </div>
  );
};
