import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  BrainCircuit,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Target,
  AlertTriangle,
  Award,
  Repeat,
  Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { TopicBadge } from "../components/common/TopicBadge";
import { PlatformBadge } from "../components/common/PlatformBadge";

export const PracticePage = () => {
  const {
    activeTest,
    testResult,
    startPracticeTest,
    setQuestionStatusInTest,
    finishPracticeTest,
    addAllFailedToRevision,
    weakTopicsList,
    setTestResult,
  } = useApp();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialWeak = searchParams.get("weak") === "true";

  // Practice session builder state
  const availableTopics = [
    "Dynamic Programming",
    "Graphs",
    "Trees",
    "Arrays",
    "Strings",
    "Binary Search",
    "Linked Lists",
    "Greedy",
    "Backtracking",
    "Stack and Queue",
    "Heap",
    "Sliding Window",
  ];

  const [selectedTopics, setSelectedTopics] = useState(
    initialWeak ? ["Dynamic Programming", "Graphs"] : ["Dynamic Programming", "Graphs", "Trees"]
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState("Mixed");
  const [questionCount, setQuestionCount] = useState(4);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(45);
  const [excludeSolved, setExcludeSolved] = useState(true);
  const [includeFailed, setIncludeFailed] = useState(true);
  const [focusWeak, setFocusWeak] = useState(initialWeak);
  const [randomMode, setRandomMode] = useState(false);

  // Active test runner state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [failedAddedToast, setFailedAddedToast] = useState(false);

  // Toggle topic
  const toggleTopic = (t) => {
    setSelectedTopics((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  // Timer effect during active test
  useEffect(() => {
    if (!activeTest || isTimerPaused) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishPracticeTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTest, isTimerPaused]);

  // Handler: Start test
  const handleGenerateTest = () => {
    startPracticeTest({
      selectedTopics: focusWeak
        ? ["Dynamic Programming", "Graphs"]
        : selectedTopics.length > 0
        ? selectedTopics
        : ["Arrays", "Dynamic Programming"],
      difficulty: selectedDifficulty,
      questionCount,
      timeLimitMinutes,
      focusWeakTopics: focusWeak,
    });
    setCurrentQIndex(0);
    setSecondsRemaining(timeLimitMinutes * 60);
    setIsTimerPaused(false);
  };

  // Format timer
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Handle batch add failed to revision
  const handleBatchAddToRevision = () => {
    addAllFailedToRevision();
    setFailedAddedToast(true);
    setTimeout(() => setFailedAddedToast(false), 3000);
  };

  // --------------------------------------------------------------------------
  // STAGE 3: TEST RESULTS SCREEN
  // --------------------------------------------------------------------------
  if (testResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Toast */}
        {failedAddedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Failed questions added to Revision Sheet with spaced-repetition schedules!</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-1">
            <Award className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Practice Session Completed!
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You completed <strong>{testResult.title}</strong>. Your points have been applied to this week's leaderboard!
          </p>

          {/* Big Score Card */}
          <div className="pt-2 flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="text-3xl font-extrabold font-mono text-indigo-600">
                {testResult.score}%
              </span>
              <span className="text-[11px] uppercase font-semibold text-slate-400 block mt-0.5">
                Accuracy Score
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-center">
              <span className="text-3xl font-extrabold font-mono text-slate-800">
                {testResult.solvedCount}/{testResult.totalQuestions}
              </span>
              <span className="text-[11px] uppercase font-semibold text-slate-400 block mt-0.5">
                Problems Solved
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-center">
              <span className="text-3xl font-extrabold font-mono text-emerald-600">
                +{testResult.solvedCount * 2} pts
              </span>
              <span className="text-[11px] uppercase font-semibold text-slate-400 block mt-0.5">
                Weekly Points
              </span>
            </div>
          </div>
        </div>

        {/* Question Breakdown List */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">
              Question Breakdown & Mistakes
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Time taken: {testResult.timeTaken}
            </span>
          </div>

          <div className="divide-y divide-slate-100 space-y-2">
            {testResult.questions.map((q, idx) => (
              <div
                key={q.id}
                className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono font-bold text-slate-400 shrink-0 mt-0.5">
                    Q{idx + 1}.
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900 text-sm">
                        {q.title}
                      </span>
                      <DifficultyBadge difficulty={q.difficulty} size="sm" />
                      <TopicBadge topic={q.topic} />
                    </div>
                    {q.subTopic && (
                      <span className="text-slate-400 text-[11px] block mt-0.5">
                        Pattern: {q.subTopic}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {q.userStatus === "solved" ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Solved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                      <XCircle className="h-3.5 w-3.5" />
                      Failed
                    </span>
                  )}

                  {q.externalUrl && (
                    <a
                      href={q.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setTestResult(null)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Practice Another Session</span>
          </button>

          {testResult.failedCount > 0 && (
            <button
              onClick={handleBatchAddToRevision}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-2xs"
            >
              <Repeat className="h-3.5 w-3.5" />
              <span>Add {testResult.failedCount} Failed Problem{testResult.failedCount > 1 ? "s" : ""} to Revision Sheet</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // STAGE 2: LIVE TEST RUNNER SCREEN
  // --------------------------------------------------------------------------
  if (activeTest) {
    const currentQ = activeTest.questions[currentQIndex];
    const totalQ = activeTest.questions.length;
    const answeredCount = activeTest.questions.filter((q) => q.userStatus !== "unattempted").length;

    return (
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Top Live Test Header Bar */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-xs">
              LIVE
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {activeTest.title}
              </h2>
              <span className="text-[11px] text-slate-500">
                Question {currentQIndex + 1} of {totalQ} • {answeredCount} answered
              </span>
            </div>
          </div>

          {/* Timer and Finish Buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Timer Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-mono text-sm font-semibold shadow-xs">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={finishPracticeTest}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-2xs"
            >
              Submit & Finish Test
            </button>
          </div>
        </div>

        {/* Test Main Grid (Left Question Nav, Right Question Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Left: Question Navigation List */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-2xs space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
                Questions
              </span>

              <div className="grid grid-cols-4 lg:grid-cols-1 gap-1.5">
                {activeTest.questions.map((q, idx) => {
                  const isCurrent = idx === currentQIndex;
                  const isSolved = q.userStatus === "solved";
                  const isFailed = q.userStatus === "failed";

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${
                        isCurrent
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold"
                          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono">Q{idx + 1}</span>
                        <span className="truncate hidden lg:inline">{q.title}</span>
                      </div>

                      {isSolved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                      {isFailed && <XCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
              <span className="font-semibold block text-slate-700 mb-1">
                Practice Guidelines
              </span>
              Simulate real coding interviews: formulate constraints, analyze complexity, then mark your result.
            </div>
          </div>

          {/* Right: Question Viewer & Actions */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
              {/* Question Header */}
              <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <PlatformBadge platform={currentQ.platform} />
                    <DifficultyBadge difficulty={currentQ.difficulty} />
                    <TopicBadge topic={currentQ.topic} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {currentQIndex + 1}. {currentQ.title}
                  </h3>
                </div>

                {currentQ.externalUrl && (
                  <a
                    href={currentQ.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200/60 self-start sm:self-auto"
                  >
                    <span>Solve in {currentQ.platform}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              {/* Problem Description */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <p>{currentQ.description}</p>

                {/* Examples */}
                {currentQ.examples && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-900 uppercase tracking-wide block">
                      Examples
                    </span>
                    {currentQ.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-xs space-y-1"
                      >
                        <div>
                          <strong className="text-slate-500">Input: </strong>
                          <span className="text-slate-900">{ex.input}</span>
                        </div>
                        <div>
                          <strong className="text-slate-500">Output: </strong>
                          <span className="text-slate-900">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-slate-500 font-sans pt-0.5">
                            Explanation: {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {currentQ.constraints && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-900 uppercase tracking-wide block mb-1">
                      Constraints
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-xs font-mono text-slate-600">
                      {currentQ.constraints.map((c, cIdx) => (
                        <li key={cIdx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Marking Controls */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuestionStatusInTest(currentQIndex, "solved")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      currentQ.userStatus === "solved"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark as Solved</span>
                  </button>

                  <button
                    onClick={() => setQuestionStatusInTest(currentQIndex, "failed")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      currentQ.userStatus === "failed"
                        ? "bg-rose-600 text-white shadow-2xs"
                        : "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
                    }`}
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Mark as Failed</span>
                  </button>
                </div>

                {/* Previous / Next */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentQIndex((i) => Math.max(i - 1, 0))}
                    disabled={currentQIndex === 0}
                    className="p-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Previous Question"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-500">
                    {currentQIndex + 1}/{totalQ}
                  </span>
                  <button
                    onClick={() => setCurrentQIndex((i) => Math.min(i + 1, totalQ - 1))}
                    disabled={currentQIndex === totalQ - 1}
                    className="p-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Next Question"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // STAGE 1: TEST BUILDER SCREEN ("Build Your Practice Session")
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Build Your Practice Session
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Generate targeted, timed coding assessments tailored to your weak topics, failed problems, and competitive goals.
        </p>
      </div>

      {/* Weak Topic Alert Callout */}
      {focusWeak && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>
              <strong>Targeted Mode Active:</strong> Focusing primarily on your algorithmic weaknesses (Dynamic Programming & Graphs).
            </span>
          </div>
          <button
            onClick={() => setFocusWeak(false)}
            className="text-[11px] text-indigo-700 hover:underline font-semibold"
          >
            Custom select
          </button>
        </div>
      )}

      {/* Main Builder Form */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
        {/* Section 1: Topics Multi-Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
              1. Select Topics ({selectedTopics.length} selected)
            </label>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setSelectedTopics([...availableTopics])}
                className="text-indigo-600 hover:underline font-medium text-[11px]"
              >
                Select All
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => setSelectedTopics(["Dynamic Programming", "Graphs"])}
                className="text-indigo-600 hover:underline font-medium text-[11px]"
              >
                Weak Topics Only
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {availableTopics.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              const isWeak = topic === "Dynamic Programming" || topic === "Graphs";

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>{topic}</span>
                  {isWeak && (
                    <span
                      className={`text-[9px] font-bold px-1 rounded ${
                        isSelected ? "bg-indigo-700 text-amber-200" : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      Weak
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Difficulty Selection */}
        <div>
          <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2">
            2. Choose Difficulty Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "Easy", label: "Easy (Warmup)", desc: "1 pt each" },
              { id: "Medium", label: "Medium (Standard)", desc: "2 pts each" },
              { id: "Hard", label: "Hard (Challenger)", desc: "4 pts each" },
              { id: "Mixed", label: "Mixed Contest", desc: "Balanced set" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDifficulty(d.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedDifficulty === d.id
                    ? "border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{d.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Question Count & Time Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
          <div>
            <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2">
              3. Question Count
            </label>
            <div className="flex items-center gap-2">
              {[2, 4, 6, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    questionCount === num
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {num} Problems
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Standard competitive set default: 4 questions
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block mb-2">
              4. Time Allocation
            </label>
            <div className="flex items-center gap-2">
              {[30, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimeLimitMinutes(mins)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    timeLimitMinutes === mins
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Auto-counts down with alert chime upon completion
            </span>
          </div>
        </div>

        {/* Section 4: Advanced Tuning Toggles */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <label className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">
            5. Additional Session Options
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100/50">
              <input
                type="checkbox"
                checked={excludeSolved}
                onChange={(e) => setExcludeSolved(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-slate-700 font-medium">
                Exclude previously solved questions
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100/50">
              <input
                type="checkbox"
                checked={includeFailed}
                onChange={(e) => setIncludeFailed(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-slate-700 font-medium">
                Prioritize previously failed problems
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100/50">
              <input
                type="checkbox"
                checked={focusWeak}
                onChange={(e) => setFocusWeak(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-slate-700 font-medium">
                Focus on weak topics (DP & Graphs)
              </span>
            </label>

            <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100/50">
              <input
                type="checkbox"
                checked={randomMode}
                onChange={(e) => setRandomMode(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-slate-700 font-medium">
                Pure random selection from entire bank
              </span>
            </label>
          </div>
        </div>

        {/* Generate CTA Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Selected: <strong className="text-slate-800">{questionCount} questions</strong> ({selectedDifficulty}) • <strong className="text-slate-800">{timeLimitMinutes} minutes</strong>
          </div>

          <button
            onClick={handleGenerateTest}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all group cursor-pointer"
          >
            <BrainCircuit className="h-4 w-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
            <span>Generate Practice Test</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
