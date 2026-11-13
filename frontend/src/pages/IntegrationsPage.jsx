import React, { useState } from "react";
import {
  Network,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Database,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { PlatformBadge } from "../components/common/PlatformBadge";

export const IntegrationsPage = () => {
  const { platforms, syncPlatform, syncAllPlatforms, isSyncingAll, user, questions } = useApp();

  const [activeTab, setActiveTab] = useState("all"); // "all", "synced", "manual"
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedPlatformToConnect, setSelectedPlatformToConnect] = useState("LeetCode");
  const [newHandle, setNewHandle] = useState("");

  // Consolidated numbers
  const totalSyncedProblems = platforms.reduce((acc, p) => acc + p.solved, 0);
  const manualCount = questions.filter((q) => q.platform === "Manual / Other").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Platform Integrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Synchronize, manage and verify your coding handles across competitive programming platforms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={syncAllPlatforms}
            disabled={isSyncingAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isSyncingAll ? "animate-spin" : ""}`}
            />
            <span>{isSyncingAll ? "Syncing All Accounts..." : "Synchronize All"}</span>
          </button>
        </div>
      </div>

      {/* Consolidated Summary Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 shrink-0">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Consolidated Sync Metrics
                </h3>
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  All Systems Operational
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {platforms.length} active platform integrations • Auto-polled every 6 hours
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Synced Problems</span>
              <span className="font-mono text-lg font-bold text-slate-900 block mt-0.5">
                {totalSyncedProblems}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Manual Logs</span>
              <span className="font-mono text-lg font-bold text-slate-900 block mt-0.5">
                {manualCount}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Verified Handles</span>
              <span className="font-mono text-lg font-bold text-indigo-700 block mt-0.5">
                5 / 5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-px text-xs font-semibold">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "all"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Connected Platforms ({platforms.length})
        </button>
        <button
          onClick={() => setActiveTab("synced")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "synced"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Data Sync Log
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`px-3.5 py-2 border-b-2 transition-colors ${
            activeTab === "manual"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Manual Records ({manualCount})
        </button>
      </div>

      {/* Platforms Grid */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Platform Top Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-xs"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                        {p.verified && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded"
                            title="Cryptographically verified profile"
                          >
                            <ShieldCheck className="h-3 w-3 text-emerald-600" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        @{p.handle}
                      </span>
                    </div>
                  </div>

                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                </div>

                {/* Body Details */}
                <div className="py-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Solved Problems:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {p.solved}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Competitive Rating:</span>
                    <span className="font-mono font-medium text-slate-800">
                      {p.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Global Rank on Site:</span>
                    <span className="font-mono text-slate-600">
                      #{p.globalRanking?.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-slate-400 text-[11px]">Last Sync:</span>
                    <span className="text-slate-600 font-mono text-[11px]">
                      {p.lastSync}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => syncPlatform(p.id)}
                  disabled={p.isSyncing}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 text-indigo-600 ${
                      p.isSyncing ? "animate-spin" : ""
                    }`}
                  />
                  <span>{p.isSyncing ? "Syncing..." : "Sync"}</span>
                </button>

                <button
                  onClick={() => alert(`Configured ${p.name} handle: @${p.handle}`)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
                  title="Configure"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}

          {/* Connect Another Platform Card */}
          <div className="bg-slate-50/50 rounded-xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3">
              <Plus className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-slate-800">
              Connect Another Platform
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Link AtCoder, Spoj, Project Euler or another custom competition feed.
            </p>
            <button
              onClick={() => alert("Custom platform integration credentials opened.")}
              className="mt-4 px-3.5 py-1.5 text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors shadow-2xs"
            >
              Add Platform
            </button>
          </div>
        </div>
      )}

      {/* Sync Log Tab */}
      {activeTab === "synced" && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <span className="text-xs font-semibold text-slate-800">
              Synchronization Audit Log
            </span>
            <span className="text-[11px] text-slate-400">
              All events verified via official REST / GraphQL endpoints
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {platforms.map((p) => (
              <div key={p.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="font-semibold text-slate-900">
                      {p.name} Sync Event
                    </span>
                    <span className="text-slate-500 block text-[11px]">
                      Polled @{p.handle} • {p.solved} total problems acknowledged
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-slate-500 text-[11px]">
                    {p.lastSync}
                  </span>
                  <span className="block text-[10px] text-emerald-700 font-medium">
                    Status: 200 OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Records Tab */}
      {activeTab === "manual" && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">
              Manual Question Archive
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              When working on offline contest problems, custom college assignments, or non-API platforms, you can log questions manually. They count toward your practice metrics and Revision Sheet.
            </p>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-left">
              <span className="font-semibold text-slate-800 block mb-1">
                Data Verification Protocol:
              </span>
              <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                <li>Synced platform entries carry a verified badge on leaderboards.</li>
                <li>Manual entries are flagged as self-reported for fair weekly competitions.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
