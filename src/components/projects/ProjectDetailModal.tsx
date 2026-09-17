import React, { useState } from 'react';
import { X, CheckCircle, FileText, Github, Link2, UserPlus, Sparkles, Send } from 'lucide-react';
import { Project, ProjectStage, UserProfile } from '../../types';

interface ProjectDetailModalProps {
  project: Project;
  currentUser: UserProfile;
  onClose: () => void;
  onJoinRole: (role: string) => void;
  onAskAiProjectAdvice: (projectTitle: string, stage: ProjectStage) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  currentUser,
  onClose,
  onJoinRole,
  onAskAiProjectAdvice
}) => {
  const [selectedRoleToApply, setSelectedRoleToApply] = useState<string | null>(null);
  const [applyNote, setApplyNote] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => {
    if (!selectedRoleToApply) return;
    onJoinRole(selectedRoleToApply);
    setHasApplied(true);
    setTimeout(() => {
      setHasApplied(false);
      setSelectedRoleToApply(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-3xl shadow-2xs">
              {project.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{project.title}</h2>
                <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/50">
                  {project.stage}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{project.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 space-y-5 flex-1">
          {/* Tagline & Full Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Description</h3>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">{project.tagline}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">{project.description}</p>
          </div>

          {/* Progress Pipeline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Progress Pipeline</h3>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400">Currently: {project.stage}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {(['Idea', 'Research', 'Prototype', 'MVP', 'Launch'] as ProjectStage[]).map((st) => {
                const isCurrent = project.stage === st;
                const isDone = project.milestones.find((m) => m.name === st)?.completed;

                return (
                  <div
                    key={st}
                    className={`py-2 px-1 rounded-xl text-center border transition-all ${
                      isCurrent
                        ? 'bg-sky-500 text-white border-sky-500 shadow-2xs font-bold'
                        : isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px]">{st}</div>
                    {isDone && !isCurrent && (
                      <CheckCircle className="w-3 h-3 text-emerald-500 dark:text-emerald-400 mx-auto mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Team ({project.members.length}/{project.maxMembers})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.members.map((m) => (
                <div key={m.id} className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.name}</span>
                      {m.isLeader && (
                        <span className="text-[9px] bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-1 py-0.2 rounded-md font-bold">
                          Lead
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Looking For (Join Opportunity) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Open Positions (Looking For)
            </h3>
            <div className="space-y-2">
              {project.lookingFor.map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/70 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60"
                >
                  <div>
                    <span className="text-xs font-bold text-orange-950 dark:text-orange-200 block">{role}</span>
                    <span className="text-[10px] text-orange-700 dark:text-orange-400">Sprint commitments: ~10 hrs/week</span>
                  </div>
                  <button
                    onClick={() => setSelectedRoleToApply(role)}
                    className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-2xs transition-transform active:scale-95"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Application Box */}
          {selectedRoleToApply && (
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-900 dark:text-sky-300">
                  Apply for: <span className="underline">{selectedRoleToApply}</span>
                </span>
                <button
                  onClick={() => setSelectedRoleToApply(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                rows={2}
                value={applyNote}
                onChange={(e) => setApplyNote(e.target.value)}
                placeholder="Briefly state your relevant skills and weekend availability..."
                className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-200"
              />
              <button
                onClick={handleApply}
                disabled={hasApplied}
                className="w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                {hasApplied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Application Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application to Founder</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Project Resources</h3>
            <div className="space-y-1.5">
              {project.resources.map((res, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
                >
                  <div className="flex items-center gap-2">
                    {res.type === 'github' ? (
                      <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
                    ) : res.type === 'doc' ? (
                      <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    ) : (
                      <Link2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{res.title}</span>
                  </div>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase hover:underline cursor-pointer">
                    View
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between gap-2">
          <button
            onClick={() => onAskAiProjectAdvice(project.title, project.stage)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold hover:bg-sky-50 dark:hover:bg-slate-750 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Ask AI Mentor for Advice</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
