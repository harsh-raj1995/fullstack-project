import React from "react";
import { FolderSearch, Plus } from "lucide-react";

export const EmptyState = ({
  icon: Icon = FolderSearch,
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="py-12 px-4 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
      <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-3 border border-slate-200">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
