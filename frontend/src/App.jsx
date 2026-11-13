import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppLayout } from "./components/layout/AppLayout";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { PracticePage } from "./pages/PracticePage";
import { RevisionPage } from "./pages/RevisionPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { CommunityPage } from "./pages/CommunityPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Authenticated Application routes inside AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/revision" element={<RevisionPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
