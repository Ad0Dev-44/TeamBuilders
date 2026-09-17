import React, { useState } from 'react';
import { ShieldAlert, X, CheckCircle, Flag, Ban } from 'lucide-react';
import { CommunityPost } from '../../types';

interface ReportModalProps {
  targetPost: CommunityPost | null;
  onClose: () => void;
  onSubmitReport: (reason: string, notes: string) => void;
  onBlockAuthor: (authorName: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  targetPost,
  onClose,
  onSubmitReport,
  onBlockAuthor
}) => {
  const [reason, setReason] = useState('spam');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!targetPost) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(reason, notes);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  const handleBlock = () => {
    onBlockAuthor(targetPost.author.name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-5 border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Report & Safety Moderation</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">Report Submitted</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Our safety review team will evaluate this content within 2 hours. Thank you for keeping TeamBuilders safe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-800 dark:text-slate-200">Reporting post by:</span> {targetPost.author.name}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-0.5 truncate">"{targetPost.title}"</p>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Reason for Reporting
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="spam">Spam, Promotional Abuse, or Phishing</option>
                <option value="harassment">Harassment or Bullying</option>
                <option value="hate_speech">Hate Speech or Discrimination</option>
                <option value="inappropriate">Inappropriate / Nudity / Explicit Content</option>
                <option value="copyright">Copyright or IP Infringement</option>
                <option value="other">Other Violation of Community Guidelines</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                Additional Context (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Explain why this violates safety guidelines..."
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleBlock}
                className="px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Block User</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
