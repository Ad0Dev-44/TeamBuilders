import React from 'react';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';

export type NavTab = 'home' | 'discover' | 'create' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadMessagesCount = 1
}) => {
  return (
    <nav className="shrink-0 sticky bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 shadow-lg transition-colors pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Tab 1: Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-2xl transition-all select-none active:scale-90 ${
            activeTab === 'home'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Home Feed"
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'home' ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400' : ''}`}>
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] mt-0.5 font-semibold">Home</span>
        </button>

        {/* Tab 2: Discover */}
        <button
          onClick={() => onSelectTab('discover')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-2xl transition-all select-none active:scale-90 ${
            activeTab === 'discover'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Discover"
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'discover' ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400' : ''}`}>
            <Compass className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] mt-0.5 font-semibold">Discover</span>
        </button>

        {/* Tab 3: Create (Center Highlighted Action) */}
        <button
          onClick={() => onSelectTab('create')}
          className="flex flex-col items-center justify-center -mt-4 min-w-[52px] select-none active:scale-90 transition-transform"
          aria-label="Create Post, Project or Team"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-white dark:ring-slate-900 transition-all hover:scale-105 active:scale-95">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-[10px] mt-1 font-bold text-orange-600 dark:text-orange-400">Create</span>
        </button>

        {/* Tab 4: Messages */}
        <button
          onClick={() => onSelectTab('messages')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-2xl transition-all select-none active:scale-90 relative ${
            activeTab === 'messages'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Messages"
        >
          <div className={`p-1 rounded-xl transition-all relative ${activeTab === 'messages' ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400' : ''}`}>
            <MessageSquare className="w-5 h-5 stroke-[2.2]" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {unreadMessagesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 font-semibold">Messages</span>
        </button>

        {/* Tab 5: Profile */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-2xl transition-all select-none active:scale-90 ${
            activeTab === 'profile'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Profile"
        >
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400' : ''}`}>
            <User className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] mt-0.5 font-semibold">Profile</span>
        </button>
      </div>
    </nav>
  );
};
