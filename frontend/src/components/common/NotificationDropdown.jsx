import React, { useRef, useEffect } from "react";
import { Bell, CheckCheck, Repeat, Trophy, UserPlus, RefreshCw, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const NotificationDropdown = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsRead } = useApp();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "revision":
        return <Repeat className="h-4 w-4 text-amber-600" />;
      case "leaderboard":
        return <Trophy className="h-4 w-4 text-indigo-600" />;
      case "social":
        return <UserPlus className="h-4 w-4 text-emerald-600" />;
      case "sync":
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-slate-600" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[11px] font-bold bg-indigo-100 text-indigo-700 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No notifications right now.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 flex items-start gap-3 transition-colors ${
                notif.read ? "bg-white hover:bg-slate-50" : "bg-indigo-50/30 hover:bg-indigo-50/50"
              }`}
            >
              <div className="mt-0.5 p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-semibold text-slate-800 truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                  {notif.message}
                </p>
              </div>
              {!notif.read && (
                <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 text-center">
        <span className="text-[11px] text-slate-500">
          Showing real-time platform & study updates
        </span>
      </div>
    </div>
  );
};
