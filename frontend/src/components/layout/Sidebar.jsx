import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  BrainCircuit,
  Repeat,
  Trophy,
  Users2,
  BarChart3,
  Network,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, revisionItems, setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  const dueRevisionCount = revisionItems.filter((r) => r.status === "Due Today").length;

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Questions", path: "/questions", icon: Code2, badge: user.totalSolved },
    { name: "Practice", path: "/practice", icon: BrainCircuit, badge: "New" },
    {
      name: "Revision Sheet",
      path: "/revision",
      icon: Repeat,
      badge: dueRevisionCount > 0 ? `${dueRevisionCount} due` : null,
      badgeColor: "bg-amber-100 text-amber-800",
    },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy, badge: `#${user.globalRank}` },
    { name: "Community", path: "/community", icon: Users2 },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Platforms", path: "/integrations", icon: Network, badge: "5" },
    { name: "My Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-slate-200 transition-all duration-200 flex flex-col justify-between ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top: Logo & Collapse Button */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2.5 overflow-hidden group"
              onClick={() => setIsMobileOpen(false)}
            >
              {/* Logo Icon */}
              <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs group-hover:bg-indigo-700 transition-colors shrink-0">
                <span className="text-sm tracking-tighter font-mono">CA</span>
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-base tracking-tight">
                      CodeArena
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200/60 font-semibold">
                      v2.4
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                    COMPETITIVE SUITE
                  </span>
                </div>
              )}
            </NavLink>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Platform Navigation
              </div>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100/80"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-105" />
                  {!isCollapsed && (
                    <span className="flex-1 truncate">{item.name}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        item.badgeColor ||
                        "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          {!isCollapsed ? (
            <div className="space-y-3">
              {/* User Mini Card */}
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate flex items-center gap-1">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">
                    @{user.username}
                  </div>
                </div>
                <NavLink
                  to="/profile"
                  className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                  title="View Public Profile"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </NavLink>
              </div>

              {/* Streak & Rank Summary Pill */}
              <div className="flex items-center justify-between text-[11px] px-2 text-slate-500">
                <span className="flex items-center gap-1 font-medium text-amber-700">
                  <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  {user.currentStreak}d Streak
                </span>
                <span className="font-mono text-slate-600 font-medium">
                  Rank #{user.globalRank}
                </span>
              </div>

              {/* Quick Logout button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <NavLink to="/profile" title={user.name}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200"
                />
              </NavLink>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
