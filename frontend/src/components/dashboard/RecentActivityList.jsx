import React from "react";
import { CheckCircle2, Repeat, BrainCircuit, Award, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { DifficultyBadge } from "../common/DifficultyBadge";
import { PlatformBadge } from "../common/PlatformBadge";

export const RecentActivityList = ({ questions, revisionItems }) => {
  // Recent 5 activities
  const recentItems = [
    {
      id: "rec-1",
      type: "solved",
      title: "Trapping Rain Water",
      difficulty: "Hard",
      platform: "LeetCode",
      time: "Today, 4:15 PM",
      topic: "Arrays",
      status: "Solved in 24m",
    },
    {
      id: "rec-2",
      type: "revision_added",
      title: "Edit Distance",
      difficulty: "Hard",
      platform: "LeetCode",
      time: "Yesterday",
      topic: "Dynamic Programming",
      status: "Added to Spaced Revision",
    },
    {
      id: "rec-3",
      type: "test",
      title: "Practice Test: Dynamic Programming & Trees",
      score: "3/4 (75%)",
      time: "Nov 10",
      status: "Completed in 28 mins",
    },
    {
      id: "rec-4",
      type: "solved",
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
      platform: "LeetCode",
      time: "Nov 09",
      topic: "Dynamic Programming",
      status: "Solved in 18m",
    },
    {
      id: "rec-5",
      type: "badge",
      title: "Centurion Streak (25+ Days)",
      time: "Nov 08",
      status: "Gold Achievement Unlocked",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "solved":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case "revision_added":
        return <Repeat className="h-4 w-4 text-amber-600" />;
      case "test":
        return <BrainCircuit className="h-4 w-4 text-indigo-600" />;
      case "badge":
        return <Award className="h-4 w-4 text-purple-600" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
          <p className="text-xs text-slate-500">
            Log of solves, revisions, practice tests & milestones
          </p>
        </div>
        <Link
          to="/questions"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
        >
          View all questions
        </Link>
      </div>

      <div className="mt-3 divide-y divide-slate-100">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-start justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 -mx-2 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                {getIcon(item.type)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-800">
                    {item.title}
                  </span>
                  {item.difficulty && (
                    <DifficultyBadge difficulty={item.difficulty} size="sm" />
                  )}
                  {item.platform && (
                    <PlatformBadge platform={item.platform} size="sm" />
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{item.status}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                  {item.topic && (
                    <>
                      <span>•</span>
                      <span className="text-slate-400">{item.topic}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
