import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Building2, User, Mail, Lock, Image } from "lucide-react";
import { useApp } from "../context/AppContext";

export const SignupPage = () => {
  const { setIsAuthenticated, setUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    college: "",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setUser((prev) => ({
      ...prev,
      name: formData.name,
      username: formData.username || formData.email.split("@")[0],
      email: formData.email,
      college: formData.college || "Indian Institute of Technology",
    }));

    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <span className="font-mono text-sm">CA</span>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">
            CodeArena
          </span>
        </Link>

        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Create your developer profile
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-8 rounded-xl border border-slate-200/90 shadow-sm space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Ravi Raj Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username / Handle *
              </label>
              <input
                type="text"
                required
                placeholder="ravikumar"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="ravi.kumar@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                College / University *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Indian Institute of Technology, Delhi"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-xs transition-colors"
              >
                <span>Create Account & Start Solving</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            By signing up, you agree to CodeArena's Fair Play Competitive Coding Terms.
          </p>
        </div>
      </div>
    </div>
  );
};
