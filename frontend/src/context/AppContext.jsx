import React, { createContext, useContext, useState, useEffect } from "react";
import {
  currentUser as initialUser,
  initialQuestions,
  initialRevisionItems,
  leaderboardUsers,
  communityActivityFeed,
  discoverDevelopers as initialDiscover,
  topicPerformance as initialTopicPerformance,
  weakTopics as initialWeakTopics,
  userAchievements,
  practiceQuestionPool,
} from "../data/mockData";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Authentication & User state
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Global search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Questions Tracker State
  const [questions, setQuestions] = useState(initialQuestions);

  // Revision Sheet State
  const [revisionItems, setRevisionItems] = useState(initialRevisionItems);

  // Topic Performance & Weak Topics State
  const [topics, setTopics] = useState(initialTopicPerformance);
  const [weakTopicsList] = useState(initialWeakTopics);

  // Platforms State
  const [platforms, setPlatforms] = useState(initialUser.connectedPlatforms);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState(leaderboardUsers);
  const [leaderboardFilter, setLeaderboardFilter] = useState("Global");
  const [selectedWeek, setSelectedWeek] = useState("Week 46 (Nov 09 - Nov 15)");

  // Community State
  const [developers, setDevelopers] = useState(initialDiscover);
  const [activities, setActivities] = useState(communityActivityFeed);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      title: "Spaced Revision Due",
      message: "You have 3 questions due for revision today: Edit Distance & Course Schedule II.",
      time: "15m ago",
      read: false,
      type: "revision",
    },
    {
      id: "n-2",
      title: "Weekly Leaderboard Surge",
      message: "You gained +38 points! Now ranked #14 in Global League.",
      time: "2h ago",
      read: false,
      type: "leaderboard",
    },
    {
      id: "n-3",
      title: "New Follower",
      message: "Alexey Danilov (@tourist_fan) started following your coding progress.",
      time: "5h ago",
      read: false,
      type: "social",
    },
    {
      id: "n-4",
      title: "Platform Sync Succeeded",
      message: "LeetCode: 482 solved (+3 new problems synced).",
      time: "1d ago",
      read: true,
      type: "sync",
    },
  ]);

  // Practice Test Module State
  const [activeTest, setActiveTest] = useState(null);
  const [testResult, setTestResult] = useState(null);

  // Keyboard shortcut listener for Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- ACTIONS ---

  // Add Question to tracker
  const addQuestion = (newQ) => {
    const formatted = {
      id: `q-${Date.now()}`,
      title: newQ.title,
      platform: newQ.platform || "LeetCode",
      difficulty: newQ.difficulty || "Medium",
      topic: newQ.topic || "Arrays",
      subTopic: newQ.subTopic || "General",
      status: newQ.status || "Solved",
      solvedDate: new Date().toISOString().split("T")[0],
      timeSpent: newQ.timeSpent || "20 mins",
      attempts: parseInt(newQ.attempts, 10) || 1,
      externalUrl: newQ.externalUrl || "https://leetcode.com",
      inRevision: false,
      notes: newQ.notes || "",
    };

    setQuestions((prev) => [formatted, ...prev]);

    // Update user stats
    setUser((prev) => {
      const isSolved = formatted.status === "Solved";
      const easyInc = formatted.difficulty === "Easy" && isSolved ? 1 : 0;
      const medInc = formatted.difficulty === "Medium" && isSolved ? 1 : 0;
      const hardInc = formatted.difficulty === "Hard" && isSolved ? 1 : 0;
      const ptsInc = formatted.difficulty === "Easy" ? 1 : formatted.difficulty === "Medium" ? 2 : 4;

      return {
        ...prev,
        totalSolved: isSolved ? prev.totalSolved + 1 : prev.totalSolved,
        easySolved: prev.easySolved + easyInc,
        mediumSolved: prev.mediumSolved + medInc,
        hardSolved: prev.hardSolved + hardInc,
        weeklyPoints: isSolved ? prev.weeklyPoints + ptsInc : prev.weeklyPoints,
      };
    });

    if (newQ.status === "Failed" || newQ.addToRevision) {
      addToRevision(formatted);
    }
  };

  // Toggle or add item to revision
  const addToRevision = (question, customNotes = "") => {
    // Check if already in revision
    const existing = revisionItems.find((r) => r.questionId === question.id || r.title === question.title);
    if (existing) return;

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1); // due tomorrow or today

    const newRevItem = {
      id: `rev-${Date.now()}`,
      questionId: question.id,
      title: question.title,
      platform: question.platform,
      difficulty: question.difficulty,
      topic: question.topic,
      dateAdded: new Date().toISOString().split("T")[0],
      lastReviewed: new Date().toISOString().split("T")[0],
      nextReviewDate: nextDate.toISOString().split("T")[0],
      status: "Due Today",
      box: 1,
      reviewCount: 0,
      notes: customNotes || question.notes || "Added for revision after failing or needing reinforcement.",
      keyTakeaway: "Review edge cases and space-time complexity.",
      externalUrl: question.externalUrl,
    };

    setRevisionItems((prev) => [newRevItem, ...prev]);

    // Update in questions list
    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, inRevision: true } : q))
    );
  };

  const markRevisionReviewed = (revId) => {
    setRevisionItems((prev) =>
      prev.map((item) => {
        if (item.id === revId) {
          const nextBox = Math.min((item.box || 1) + 1, 5);
          const daysToAdd = Math.pow(2, nextBox); // 2, 4, 8, 16, 32 days
          const nextD = new Date();
          nextD.setDate(nextD.getDate() + daysToAdd);

          return {
            ...item,
            box: nextBox,
            reviewCount: (item.reviewCount || 0) + 1,
            lastReviewed: new Date().toISOString().split("T")[0],
            nextReviewDate: nextD.toISOString().split("T")[0],
            status: nextBox >= 4 ? "Completed" : "Upcoming",
          };
        }
        return item;
      })
    );
  };

  const markRevisionMastered = (revId) => {
    setRevisionItems((prev) =>
      prev.map((item) =>
        item.id === revId
          ? { ...item, status: "Completed", box: 5, lastReviewed: new Date().toISOString().split("T")[0] }
          : item
      )
    );
  };

  const removeRevisionItem = (revId) => {
    const item = revisionItems.find((r) => r.id === revId);
    setRevisionItems((prev) => prev.filter((r) => r.id !== revId));
    if (item?.questionId) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === item.questionId ? { ...q, inRevision: false } : q))
      );
    }
  };

  const updateRevisionNotes = (revId, notes) => {
    setRevisionItems((prev) =>
      prev.map((r) => (r.id === revId ? { ...r, notes } : r))
    );
  };

  // Follow / Unfollow user
  const toggleFollow = (userId) => {
    setDevelopers((prev) =>
      prev.map((dev) => {
        if (dev.id === userId) {
          const newFollowing = !dev.isFollowing;
          return {
            ...dev,
            isFollowing: newFollowing,
            followers: newFollowing ? dev.followers + 1 : dev.followers - 1,
          };
        }
        return dev;
      })
    );

    setLeaderboard((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u))
    );

    setUser((prev) => ({
      ...prev,
      followingCount: developers.find((d) => d.id === userId)?.isFollowing
        ? prev.followingCount - 1
        : prev.followingCount + 1,
    }));
  };

  // Like Activity in community
  const toggleActivityLike = (actId) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === actId) {
          return {
            ...act,
            hasLiked: !act.hasLiked,
            likes: act.hasLiked ? act.likes - 1 : act.likes + 1,
          };
        }
        return act;
      })
    );
  };

  // Sync specific platform
  const syncPlatform = (platformId) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === platformId ? { ...p, isSyncing: true } : p))
    );

    setTimeout(() => {
      setPlatforms((prev) =>
        prev.map((p) => {
          if (p.id === platformId) {
            return {
              ...p,
              isSyncing: false,
              solved: p.solved + 2,
              lastSync: "Just now",
            };
          }
          return p;
        })
      );
      setUser((prev) => ({ ...prev, totalSolved: prev.totalSolved + 2 }));
    }, 1200);
  };

  const syncAllPlatforms = () => {
    setIsSyncingAll(true);
    setSyncStatusMsg("Fetching latest solved questions from LeetCode, Codeforces, CodeChef...");

    setTimeout(() => {
      setPlatforms((prev) =>
        prev.map((p) => ({
          ...p,
          solved: p.solved + 1,
          lastSync: "Just now",
        }))
      );
      setIsSyncingAll(false);
      setSyncStatusMsg("All 5 platforms synchronized successfully!");
      setTimeout(() => setSyncStatusMsg(""), 3000);
    }, 1800);
  };

  // Practice Test Runner
  const startPracticeTest = ({
    selectedTopics = ["Dynamic Programming", "Graphs"],
    difficulty = "Mixed",
    questionCount = 4,
    timeLimitMinutes = 45,
    focusWeakTopics = true,
  }) => {
    // Pick questions matching topics or fallback to pool
    let eligible = practiceQuestionPool.filter(
      (q) => selectedTopics.length === 0 || selectedTopics.includes(q.topic)
    );
    if (eligible.length < questionCount) {
      eligible = [...practiceQuestionPool];
    }
    // Shuffle and pick questionCount
    const shuffled = [...eligible].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount).map((q, idx) => ({
      ...q,
      testIndex: idx,
      userStatus: "unattempted", // "solved", "failed", "skipped"
      notes: "",
    }));

    setActiveTest({
      id: `test-${Date.now()}`,
      title: `${selectedTopics.join(" & ")} Practice Test`,
      topics: selectedTopics,
      difficulty,
      questions: selected,
      totalQuestions: selected.length,
      currentQuestionIndex: 0,
      timeLimitMinutes,
      startTime: Date.now(),
      status: "in_progress",
    });
    setTestResult(null);
  };

  const setQuestionStatusInTest = (testIndex, status) => {
    if (!activeTest) return;
    setActiveTest((prev) => {
      const updated = [...prev.questions];
      updated[testIndex] = { ...updated[testIndex], userStatus: status };
      return { ...prev, questions: updated };
    });
  };

  const finishPracticeTest = () => {
    if (!activeTest) return;
    const questions = activeTest.questions;
    const solvedCount = questions.filter((q) => q.userStatus === "solved").length;
    const failedCount = questions.filter((q) => q.userStatus === "failed").length;
    const skippedCount = questions.filter((q) => q.userStatus === "unattempted").length;
    const score = Math.round((solvedCount / questions.length) * 100);

    const result = {
      testId: activeTest.id,
      title: activeTest.title,
      totalQuestions: questions.length,
      solvedCount,
      failedCount,
      skippedCount,
      score,
      timeTaken: "24m 18s",
      questions,
      completedAt: new Date().toISOString(),
    };

    setTestResult(result);
    setActiveTest(null);

    // Give points for practice
    const pts = solvedCount * 2;
    setUser((prev) => ({
      ...prev,
      weeklyPoints: prev.weeklyPoints + pts,
      totalSolved: prev.totalSolved + solvedCount,
    }));
  };

  const addAllFailedToRevision = () => {
    if (!testResult) return;
    const failed = testResult.questions.filter((q) => q.userStatus === "failed");
    failed.forEach((f) => {
      addToRevision(f, "Failed during practice test session. Need deep review.");
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isSearchOpen,
        setIsSearchOpen,
        questions,
        addQuestion,
        revisionItems,
        addToRevision,
        markRevisionReviewed,
        markRevisionMastered,
        removeRevisionItem,
        updateRevisionNotes,
        topics,
        weakTopicsList,
        platforms,
        isSyncingAll,
        syncStatusMsg,
        syncPlatform,
        syncAllPlatforms,
        leaderboard,
        leaderboardFilter,
        setLeaderboardFilter,
        selectedWeek,
        setSelectedWeek,
        developers,
        toggleFollow,
        activities,
        toggleActivityLike,
        notifications,
        markAllNotificationsRead,
        activeTest,
        setActiveTest,
        testResult,
        setTestResult,
        startPracticeTest,
        setQuestionStatusInTest,
        finishPracticeTest,
        addAllFailedToRevision,
        achievements: userAchievements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
