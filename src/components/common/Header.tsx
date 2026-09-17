import React, { useState } from 'react';
import { Sparkles, Smartphone, Monitor, ChevronDown, Hammer, GraduationCap, Sun, Moon } from 'lucide-react';
import { UserProfile } from '../../types';
import { ALTERNATIVE_PROFILES } from '../../data/mockData';

interface HeaderProps {
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenAiAssistant: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectUser,
  isMobileFrame,
  onToggleFrame,
  onOpenAiAssistant,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3.5 py-2.5 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 relative group shrink-0">
            <div className="flex items-center justify-center relative">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 -rotate-6" />
              <Hammer className="w-3 h-3 sm:w-3.5 sm:h-3.5 absolute -bottom-1 -right-1 text-orange-400 rotate-45 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base sm:text-lg">TeamBuilders</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded-md border border-sky-200/50 dark:border-sky-800/50">
                v0.1
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">Build teams. Win hackathons. Ship projects.</p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* AI Spark Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-orange-50 dark:from-sky-950/40 dark:to-orange-950/40 hover:from-sky-100 hover:to-orange-100 dark:hover:from-sky-900/60 dark:hover:to-orange-900/60 border border-sky-200 dark:border-sky-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-all active:scale-95"
            title="Google AI Assistant & Matcher"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse shrink-0" />
            <span className="hidden sm:inline font-bold text-sky-700 dark:text-sky-400">AI Spark</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Device Frame Viewport Toggle */}
          <button
            onClick={onToggleFrame}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
            title={isMobileFrame ? "Switch to Full Screen Responsive Mode" : "Switch to Android Frame Emulation"}
          >
            {isMobileFrame ? (
              <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            ) : (
              <Smartphone className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            )}
          </button>

          {/* User Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 pl-1.5 pr-2 sm:pr-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-sky-500"
              />
              <div className="text-left hidden md:block">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[80px]">
                  {currentUser.name.split(' ')[0]}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400 capitalize leading-tight">
                  {currentUser.role.replace('_', ' ')}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Switch Persona</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Test TeamBuilders from various user angles:</p>
                </div>
                {ALTERNATIVE_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      onSelectUser(profile);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-sky-50 dark:hover:bg-slate-800/80 transition-colors ${
                      currentUser.id === profile.id ? 'bg-sky-50/70 dark:bg-slate-800 border-l-2 border-sky-500' : ''
                    }`}
                  >
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{profile.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">{profile.role.replace('_', ' ')} • {profile.headline.split('•')[0]}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
