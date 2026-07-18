'use client';

import { HiCheckCircle, HiExclamationCircle, HiXMark } from 'react-icons/hi2';

interface AdminPageHeaderProps {
  title: string;
  description: string;
  error: string | null;
  success: string | null;
  dirty?: boolean;
  lastSavedAt?: Date | null;
  onClearMessages: () => void;
}

export default function AdminPageHeader({
  title,
  description,
  error,
  success,
  dirty,
  lastSavedAt,
  onClearMessages,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">{title}</h1>
          <p className="font-sans text-sm text-warm-gray/60">{description}</p>
        </div>
        {dirty && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full font-sans text-[10px] text-amber-700 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            Unsaved changes
          </span>
        )}
      </div>

      {(error || success) && (
        <div
          className={`mt-4 p-4 rounded-lg flex items-center justify-between ${
            error
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {error ? (
              <HiExclamationCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-sans text-sm">{error || success}</span>
          </div>
          <button onClick={onClearMessages} className="text-current opacity-70 hover:opacity-100">
            <HiXMark className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
