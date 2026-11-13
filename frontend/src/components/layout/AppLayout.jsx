import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  BrainCircuit,
  Repeat,
  Trophy,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { GlobalSearchModal } from "../common/GlobalSearchModal";
import { AddQuestionModal } from "../questions/AddQuestionModal";
import { useApp } from "../../context/AppContext";

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { revisionItems } = useApp();

  const dueRevisionCount = revisionItems.filter((r) => r.status === "Due Today").length;

  const mobileNavItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Questions", path: "/questions", icon: Code2 },
    { name: "Practice", path: "/practice", icon: BrainCircuit },
    {
      name: "Revision",
      path: "/revision",
      icon: Repeat,
      badge: dueRevisionCount > 0 ? dueRevisionCount : null,
    },
    { name: "Leaders", path: "/leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Fixed Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Wrapper that shifts based on sidebar width */}
      <div
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Navbar */}
        <Navbar
          setIsMobileOpen={setIsMobileOpen}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8">
          <Outlet context={{ openAddModal: () => setIsAddModalOpen(true) }} />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 lg:hidden px-2 py-1 flex items-center justify-around shadow-lg">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-3 rounded-lg text-[10px] font-medium transition-colors relative ${
                  isActive
                    ? "text-indigo-600 font-bold"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 h-4 min-w-[16px] px-1 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Global Modals */}
      <GlobalSearchModal />
      <AddQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
