import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, User, Sparkles, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export const LoginPage = () => {
  const { setIsAuthenticated } = useApp();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("ravikumar");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <span className="font-mono text-sm">CA</span>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            CodeArena
          </span>
        </Link>

        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Or{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-800">
            create a new developer profile
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-xl border border-slate-200/90 shadow-sm space-y-5">
          {/* Quick Demo Login Pill */}
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-indigo-900">
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>Demo Account: <strong>Ravi Raj Kumar</strong></span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="px-2.5 py-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors shadow-2xs"
            >
              1-Click Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email or Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                Remember this device for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors"
            >
              <span>Sign In to CodeArena</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
            Secure multi-platform competitive programming environment.
          </div>
        </div>
      </div>
    </div>
  );
};
