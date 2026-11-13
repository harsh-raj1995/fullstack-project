import React, { useState } from "react";
import {
  Settings,
  User,
  Shield,
  Bell,
  Key,
  Network,
  Download,
  Trash2,
  Check,
  Save,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const SettingsPage = () => {
  const { user, setUser, platforms } = useApp();

  const [activeSection, setActiveSection] = useState("personal");
  const [toastMsg, setToastMsg] = useState("");

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    college: user.college,
    targetRole: user.targetRole,
    bio: user.bio,
    publicProfile: true,
    showLeaderboardRank: true,
    showCollege: true,
    emailDailyDigest: false,
    streakReminders: true,
    leaderboardUpdates: true,
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      college: formData.college,
      targetRole: formData.targetRole,
      bio: formData.bio,
    }));
    showToast("Settings updated successfully.");
  };

  const handleExportData = () => {
    showToast("CodeArena archive generated and downloaded (JSON format).");
  };

  const navItems = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "visibility", label: "Profile Visibility", icon: Shield },
    { id: "platforms", label: "Connected Platforms", icon: Network },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Password & Security", icon: Key },
    { id: "account", label: "Data & Account", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200 text-indigo-700">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Account Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your personal credentials, privacy, notifications, and platform synchronization preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Left Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1">
          <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors text-left ${
                    activeSection === item.id
                      ? "bg-indigo-50 text-indigo-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Right Form Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs">
            {/* Section: Personal Info */}
            {activeSection === "personal" && (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Personal Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your public developer identity across CodeArena
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Username / Handle
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Role / Engineering Goal
                  </label>
                  <input
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bio & Competitive Focus
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}

            {/* Section: Visibility */}
            {activeSection === "visibility" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Profile Visibility & Privacy
                  </h3>
                  <p className="text-xs text-slate-500">
                    Control who can view your coding metrics and leaderboard ranks
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        Public Developer Profile
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Allow other developers to view your solved questions and achievements.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.publicProfile}
                      onChange={(e) => setFormData({ ...formData, publicProfile: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        Display Global Leaderboard Ranking
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Show your handle on weekly competitive leaderboard podiums.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.showLeaderboardRank}
                      onChange={(e) => setFormData({ ...formData, showLeaderboardRank: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Section: Platforms */}
            {activeSection === "platforms" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Connected Platforms
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage third-party handles and sync intervals
                  </p>
                </div>

                <div className="space-y-3">
                  {platforms.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-lg border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{p.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">@{p.handle}</span>
                      </div>
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                        Connected
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Notifications */}
            {activeSection === "notifications" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose what alerts you receive via email and in-app bell
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        Daily Streak Reminders
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Receive an evening reminder if you haven't solved a problem today.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.streakReminders}
                      onChange={(e) => setFormData({ ...formData, streakReminders: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">
                        Weekly Leaderboard Surge Alerts
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Alert when you gain or lose places in the top 20 rankings.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.leaderboardUpdates}
                      onChange={(e) => setFormData({ ...formData, leaderboardUpdates: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Section: Security */}
            {activeSection === "security" && (
              <form onSubmit={(e) => { e.preventDefault(); showToast("Password updated successfully."); }} className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Password & Security
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ensure your account is protected with a strong passphrase
                  </p>
                </div>

                <div className="space-y-3 max-w-sm">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* Section: Account & Export */}
            {activeSection === "account" && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Data Portability & Account Deletion
                  </h3>
                  <p className="text-xs text-slate-500">
                    Export your notes, revision history, and problem solve archives
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Export CodeArena Workspace Data
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Download full CSV / JSON format with all notes and spaced intervals.
                    </span>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export JSON</span>
                  </button>
                </div>

                <div className="p-4 rounded-lg border border-rose-200 bg-rose-50/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-rose-800 block">
                      Danger Zone: Delete Account
                    </span>
                    <span className="text-[11px] text-rose-600">
                      Irreversibly wipe your account, streak records, and revision schedules.
                    </span>
                  </div>
                  <button
                    onClick={() => alert("Account deletion confirmation requested.")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
