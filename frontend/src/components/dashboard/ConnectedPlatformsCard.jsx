import React from "react";
import { RefreshCw, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export const ConnectedPlatformsCard = () => {
  const { platforms, syncAllPlatforms, isSyncingAll, syncStatusMsg } = useApp();

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Connected Platforms
            </h3>
            <p className="text-xs text-slate-500">
              Multi-platform data synchronization
            </p>
          </div>
          <button
            onClick={syncAllPlatforms}
            disabled={isSyncingAll}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors border border-slate-200 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-indigo-600 ${
                isSyncingAll ? "animate-spin" : ""
              }`}
            />
            <span>{isSyncingAll ? "Syncing..." : "Sync All"}</span>
          </button>
        </div>

        {syncStatusMsg && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] font-medium flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span>{syncStatusMsg}</span>
          </div>
        )}

        <div className="mt-3 space-y-2">
          {platforms.map((p) => (
            <div
              key={p.id}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: p.color }}
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-800">
                      {p.name}
                    </span>
                    {p.verified && (
                      <span title="Verified handle">
                        <ShieldCheck className="h-3 w-3 text-indigo-600" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    @{p.handle}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold text-slate-900">
                  {p.solved} Solved
                </div>
                <div className="text-[10px] text-slate-400">
                  {p.lastSync}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <Link
          to="/integrations"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
        >
          Manage all credentials & API keys
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};
