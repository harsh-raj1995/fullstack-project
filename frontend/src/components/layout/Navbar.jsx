import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Flame,
  Zap,
  Bell,
  Plus,
  BrainCircuit,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { NotificationDropdown } from "../common/NotificationDropdown";

export const Navbar = ({ setIsMobileOpen, onOpenAddModal }) => {
  const { user, setIsSearchOpen, notifications, setIsAuthenticated } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  // Breadcrumbs title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith("/questions")) return "My Questions Tracker";
    if (path.startsWith("/practice")) return "Practice Session Studio";
    if (path.startsWith("/revision")) return "Spaced Revision Sheet";
    if (path.startsWith("/leaderboard")) return "Weekly Champions League";
    if (path.startsWith("/community")) return "Developer Community";
    if (path.startsWith("/analytics")) return "Performance Analytics";
    if (path.startsWith("/integrations")) return "Platform Integrations";
    if (path.startsWith("/profile")) return "Developer Profile";
    if (path.startsWith("/settings")) return "Account Settings";
    return "Dashboard Overview";
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-800 lg:hidden rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            {getPageTitle()}
          </h1>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium">
            CodeArena Competitive Platform
          </span>
        </div>
      </div>

      {/* Middle: Global Search Input trigger */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span>Search questions, topics, handles...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-800 md:hidden rounded-lg hover:bg-slate-100 transition-colors"
          title="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Streak Pill */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold"
          title="Consecutive daily active coding streak"
        >
          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span>{user.currentStreak}d Streak</span>
        </div>

        {/* Weekly Points Pill */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-semibold"
          title="Points accumulated this competitive week"
        >
          <Zap className="h-3.5 w-3.5 text-indigo-600 fill-indigo-600" />
          <span>{user.weeklyPoints} pts</span>
        </div>

        {/* Quick Add Problem / Practice CTA */}
        {onOpenAddModal && (
          <button
            onClick={onOpenAddModal}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Log Question</span>
          </button>
        )}

        <Link
          to="/practice"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
        >
          <BrainCircuit className="h-3.5 w-3.5 text-indigo-600" />
          <span>Practice</span>
        </Link>

        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            )}
          </button>
          <NotificationDropdown
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover border border-slate-200"
            />
            <ChevronDown className="h-3.5 w-3.5 text-slate-500 hidden sm:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2.5 border-b border-slate-100">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {user.name}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {user.email}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-indigo-600">
                  <Sparkles className="h-3 w-3" /> Global Rank #{user.globalRank}
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  Developer Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  Account Settings
                </Link>
                <Link
                  to="/integrations"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Flame className="h-4 w-4 text-slate-400" />
                  Connected Platforms
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
