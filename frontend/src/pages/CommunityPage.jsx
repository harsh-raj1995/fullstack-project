import React, { useState } from "react";
import {
  Users2,
  Search,
  UserPlus,
  UserCheck,
  Heart,
  MessageSquare,
  Award,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  Filter,
  Flame,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { PlatformBadge } from "../components/common/PlatformBadge";

export const CommunityPage = () => {
  const {
    developers,
    toggleFollow,
    activities,
    toggleActivityLike,
    user,
  } = useApp();

  const [activeTab, setActiveTab] = useState("feed"); // "feed", "discover", "following"
  const [searchQuery, setSearchQuery] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All");

  // Filter developers
  const filteredDevs = developers.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.college.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCollege =
      collegeFilter === "All" ||
      (collegeFilter === "IIT Delhi" && dev.college.toLowerCase().includes("delhi"));

    if (activeTab === "following") {
      return matchesSearch && matchesCollege && dev.isFollowing;
    }
    return matchesSearch && matchesCollege;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200 text-indigo-700">
            <Users2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Developer Community & Feed
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Connect with fellow competitive programmers, follow peers, and cheer on daily coding milestones.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "feed"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Following Activity Feed
        </button>

        <button
          onClick={() => setActiveTab("discover")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "discover"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Discover Developers ({developers.length})
        </button>

        <button
          onClick={() => setActiveTab("following")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "following"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Following ({user.followingCount})
        </button>
      </div>

      {/* Activity Feed Tab */}
      {activeTab === "feed" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-all space-y-3"
              >
                {/* Event Top Bar */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={act.avatar}
                      alt={act.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/profile/${act.username}`}
                          className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors"
                        >
                          {act.name}
                        </Link>
                        <span className="text-xs text-slate-400 font-mono">
                          @{act.username}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {act.college} • {act.timestamp}
                      </span>
                    </div>
                  </div>

                  {act.difficulty && <DifficultyBadge difficulty={act.difficulty} size="sm" />}
                  {act.actionType === "earned_badge" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full">
                      <Award className="h-3 w-3" /> Badge Unlocked
                    </span>
                  )}
                  {act.actionType === "completed_test" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                      <BrainCircuit className="h-3 w-3" /> Practice Test
                    </span>
                  )}
                </div>

                {/* Event Content Description */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1">
                  <div className="font-semibold text-slate-900">{act.title}</div>
                  <p className="text-slate-600 leading-relaxed">{act.detail}</p>
                </div>

                {/* Interactive Like / Cheer Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => toggleActivityLike(act.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                      act.hasLiked
                        ? "text-rose-600 font-semibold bg-rose-50 border border-rose-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        act.hasLiked ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                    <span>{act.likes} Cheers</span>
                  </button>

                  <span className="text-[11px] text-slate-400">
                    Shared via CodeArena Feed
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar: Suggested Developers */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-900 block">
                Suggested Developers
              </span>

              <div className="space-y-3">
                {developers.slice(0, 4).map((dev) => (
                  <div key={dev.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/profile/${dev.username}`}
                          className="text-xs font-semibold text-slate-900 truncate block hover:text-indigo-600"
                        >
                          {dev.name}
                        </Link>
                        <span className="text-[10px] text-slate-400 truncate block">
                          {dev.college}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollow(dev.id)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors shrink-0 ${
                        dev.isFollowing
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {dev.isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Banner */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-amber-50 rounded-xl border border-indigo-100 text-xs text-slate-700 space-y-2">
              <span className="font-bold text-indigo-900 block flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                Solve Together
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Developers who follow at least 5 peers show a 42% higher coding consistency on CodeArena.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Discover & Following Tabs */}
      {(activeTab === "discover" || activeTab === "following") && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search coders by name, username or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Affiliation:</span>
              <select
                value={collegeFilter}
                onChange={(e) => setCollegeFilter(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value="All">All Universities</option>
                <option value="IIT Delhi">IIT Delhi</option>
              </select>
            </div>
          </div>

          {/* Developers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDevs.map((dev) => (
              <div
                key={dev.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top user header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <Link
                          to={`/profile/${dev.username}`}
                          className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors block"
                        >
                          {dev.name}
                        </Link>
                        <span className="text-xs text-slate-400 font-mono">
                          @{dev.username}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5 truncate max-w-[180px]">
                          {dev.college}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dev.bio}
                  </p>

                  {/* Stats Row */}
                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-center">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                        Solved
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {dev.totalSolved}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                        Weekly
                      </span>
                      <span className="font-mono font-bold text-indigo-700">
                        {dev.weeklyPoints} pts
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">
                        Followers
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {dev.followers}
                      </span>
                    </div>
                  </div>

                  {/* Performance tags */}
                  <div className="mt-3 flex items-center gap-1 flex-wrap">
                    {dev.tags?.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Follow Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/profile/${dev.username}`}
                    className="flex-1 py-1.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={() => toggleFollow(dev.id)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      dev.isFollowing
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs"
                    }`}
                  >
                    {dev.isFollowing ? (
                      <>
                        <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
