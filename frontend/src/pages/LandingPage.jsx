import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2,
  BrainCircuit,
  Repeat,
  Trophy,
  Users2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
  Zap,
  ShieldCheck,
  ChevronRight,
  Database,
  BarChart3,
  Terminal,
} from "lucide-react";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { PlatformBadge } from "../components/common/PlatformBadge";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Public Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
              <span className="text-sm font-mono tracking-tighter">CA</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-base tracking-tight">
                  CodeArena
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200/60 font-semibold">
                  v2.4
                </span>
              </div>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">
              Platform Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <Link to="/leaderboard" className="hover:text-indigo-600 transition-colors">
              Weekly Leaderboard
            </Link>
            <a href="#integrations" className="hover:text-indigo-600 transition-colors">
              Integrations
            </a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-semibold shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          <span>Built for competitive programmers & engineering aspirants</span>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Your Coding Journey. <br className="hidden sm:inline" />
            <span className="text-indigo-600">One Unified Platform.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Track your coding progress across platforms, challenge yourself with personalized practice, compete with developers and turn every mistake into an opportunity to improve.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md transition-all group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/leaderboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Explore Leaderboard</span>
          </Link>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/50 transition-colors"
          >
            <span>Live Product Demo</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Product Preview Mockup */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl p-2 sm:p-4 text-left">
            {/* Mock Window Top Bar */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-100 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-slate-500">
                  codearena.app/dashboard
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-600 font-semibold">● 5 Connected Platforms</span>
                <span>Week 46 • Rank #14</span>
              </div>
            </div>

            {/* Mock Dashboard Preview Content */}
            <div className="p-4 sm:p-6 bg-slate-50/50 rounded-xl mt-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Welcome back, Ravi.
                  </h3>
                  <span className="text-xs text-slate-500">
                    842 Problems Solved • 28 Day Streak • 340 Weekly Points
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                    Top 4% Globally
                  </span>
                </div>
              </div>

              {/* Mock Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Problems Solved</span>
                  <span className="text-lg font-bold font-mono text-slate-900 block mt-0.5">842</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-amber-700 uppercase font-semibold">Weekly Points</span>
                  <span className="text-lg font-bold font-mono text-amber-600 block mt-0.5">340 pts</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Coding Streak</span>
                  <span className="text-lg font-bold font-mono text-rose-600 block mt-0.5">28 Days</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Global Rank</span>
                  <span className="text-lg font-bold font-mono text-indigo-700 block mt-0.5">#342</span>
                </div>
              </div>

              {/* Mock Weak Topics Alert */}
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-rose-900">
                  <span className="font-bold">Algorithmic Weakness:</span>
                  <span>Dynamic Programming (48%) & Graphs (54%)</span>
                </div>
                <span className="text-indigo-600 font-semibold">Practice Drill →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-slate-900 text-white py-12 px-4 border-y border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            The CodeArena Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            TRACK. PRACTICE. REVISE. COMPETE. IMPROVE.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Not a generic dashboard. A rigorous engineering platform designed to turn coding consistency into algorithmic mastery.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Engineered For Excellence
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Everything You Need To Crack Top Tier Roles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Designed with visual inspirations from LeetCode, Codeforces, HackerRank, and Codolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="p-2.5 w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Multi-Platform Aggregation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synchronize LeetCode, Codeforces, CodeChef, GeeksforGeeks, and HackerRank in real-time. Say goodbye to scattered profiles.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="p-2.5 w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Repeat className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Spaced-Repetition Revision Sheets
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based on the proven Leitner box system. Automatically resurfaces problems you previously failed until you reach 100% mastery.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="p-2.5 w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Adaptive Practice Test Studio
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate custom timed tests tailored to your weak topics, excluding solved questions and testing real interview pressure.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="p-2.5 w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Weak Topic Diagnostics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated failure rate analysis across Arrays, Strings, DP, Trees, and Graphs spotlights exactly where you lose contest rating.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="p-2.5 w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Weekly Champions League
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Participate in weekly points-based competitions (Easy=1, Med=2, Hard=4). Climb global and university leaderboards.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="p-2.5 w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center">
              <Users2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Developer Social Graph
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Follow peers, inspect solved problems, cheer on milestones, and observe what problems top competitive coders solve daily.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Simple 4-Step Cycle
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              How CodeArena Powers Your Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="font-mono text-2xl font-black text-indigo-600">01</span>
              <h4 className="text-sm font-bold text-slate-900">Connect Handles</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Link LeetCode, Codeforces, CodeChef and GFG in 30 seconds with automatic verification.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-2xl font-black text-indigo-600">02</span>
              <h4 className="text-sm font-bold text-slate-900">Track & Heatmap</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Watch your consistency grow with daily contribution heatmaps and streak counters.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-2xl font-black text-indigo-600">03</span>
              <h4 className="text-sm font-bold text-slate-900">Diagnose & Revise</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Failed questions automatically feed into spaced-repetition revision cycles.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-2xl font-black text-indigo-600">04</span>
              <h4 className="text-sm font-bold text-slate-900">Compete & Excel</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Earn weekly points, climb podiums, and break into top candidate percentiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="integrations" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Supported Coding Platforms
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Works with the Platforms You Already Use
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <PlatformBadge platform="LeetCode" size="lg" />
          <PlatformBadge platform="Codeforces" size="lg" />
          <PlatformBadge platform="CodeChef" size="lg" />
          <PlatformBadge platform="GeeksforGeeks" size="lg" />
          <PlatformBadge platform="HackerRank" size="lg" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-white border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <span className="font-mono text-xs">CA</span>
              </div>
              <span className="font-bold text-sm">CodeArena</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The competitive coding and developer progress suite. Track, practice, revise, compete, and improve.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Platform
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link to="/questions" className="hover:text-white">Questions Tracker</Link></li>
              <li><Link to="/practice" className="hover:text-white">Practice Studio</Link></li>
              <li><Link to="/revision" className="hover:text-white">Revision Sheet</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Community
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/leaderboard" className="hover:text-white">Weekly Champions</Link></li>
              <li><Link to="/community" className="hover:text-white">Developer Network</Link></li>
              <li><Link to="/integrations" className="hover:text-white">Platform Sync</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Account
            </h5>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-white">Create Account</Link></li>
              <li><Link to="/settings" className="hover:text-white">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-6 text-center text-slate-500">
          © 2026 CodeArena. All rights reserved. Designed for serious competitive programmers.
        </div>
      </footer>
    </div>
  );
};
