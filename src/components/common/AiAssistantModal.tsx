import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, CheckCircle2, ArrowRight, Lightbulb } from 'lucide-react';
import { askAiProjectAssistant, AiAssistantResult } from '../../services/geminiService';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectTitle?: string;
  defaultStage?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  defaultProjectTitle = 'EcoTrack',
  defaultStage = 'Prototype'
}) => {
  const [projectTitle, setProjectTitle] = useState(defaultProjectTitle);
  const [stage, setStage] = useState(defaultStage);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiAssistantResult | null>(null);

  if (!isOpen) return null;

  const handleAsk = async (customPrompt?: string) => {
    const promptToUse = customPrompt || inputMessage || `How should we structure our team milestones to finish the ${projectTitle} prototype this weekend?`;
    setLoading(true);
    setInputMessage(promptToUse);
    const res = await askAiProjectAssistant(promptToUse, projectTitle, stage);
    setResult(res);
    setLoading(false);
  };

  const samplePrompts = [
    `How to split work between 1 UX Designer and 2 Developers for a 48h hackathon?`,
    `What is the fastest way to test product validation with students this week?`,
    `What should our 3-minute hackathon demo pitch structure look like?`
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-orange-400 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Google AI Project & Team Coach</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Gemini 2.5 Flash Server-Side Integration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 flex-1">
          {/* Context selectors */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Target Project</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full text-xs p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">Current Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full text-xs p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
              >
                <option>Idea</option>
                <option>Research</option>
                <option>Prototype</option>
                <option>MVP</option>
                <option>Launch</option>
              </select>
            </div>
          </div>

          {/* Prompt suggestions */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
              Quick builder prompts:
            </span>
            <div className="space-y-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(p)}
                  className="w-full text-left p-2 rounded-xl bg-sky-50/60 dark:bg-slate-800/60 hover:bg-sky-100/70 dark:hover:bg-slate-800 border border-sky-100 dark:border-slate-700 text-[11px] text-sky-900 dark:text-sky-300 font-medium transition-colors flex items-center justify-between gap-2"
                >
                  <span className="line-clamp-1">"{p}"</span>
                  <ArrowRight className="w-3 h-3 text-sky-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Card */}
          {result && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-orange-50 dark:from-sky-950/40 dark:to-orange-950/30 border border-orange-200 dark:border-orange-800/60 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold text-xs">
                <Bot className="w-4 h-4" />
                <span>Gemini Coach Recommendation:</span>
              </div>
              <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {result.reply}
              </div>

              {result.suggestedTasks && result.suggestedTasks.length > 0 && (
                <div className="pt-2 border-t border-orange-200/60 dark:border-orange-800/60 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300 block">
                    Actionable Sprints:
                  </span>
                  {result.suggestedTasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk();
              }}
              placeholder="Ask for roadmap, team roles, or hackathon advice..."
              className="flex-1 text-xs p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-transform active:scale-95 flex items-center gap-1"
            >
              {loading ? (
                <span>Thinking...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
