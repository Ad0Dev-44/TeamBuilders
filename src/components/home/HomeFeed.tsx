import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  Send,
  ArrowUp,
  Flame,
  Lightbulb,
  LifeBuoy,
  Filter
} from 'lucide-react';
import { CommunityPost, PostCategory, UserProfile } from '../../types';

interface HomeFeedProps {
  posts: CommunityPost[];
  currentUser: UserProfile;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onOpenCreate: (initialCategory?: PostCategory) => void;
  onSelectProject: (projectTitle: string) => void;
  onReportPost: (post: CommunityPost) => void;
}

export const CATEGORY_CONFIG: Record<
  PostCategory,
  { label: string; icon: string; bg: string; text: string; border: string; darkBg: string; darkText: string; darkBorder: string }
> = {
  idea: { 
    label: 'Idea', 
    icon: '💡', 
    bg: 'bg-amber-50', 
    text: 'text-amber-800', 
    border: 'border-amber-200',
    darkBg: 'dark:bg-amber-950/40',
    darkText: 'dark:text-amber-300',
    darkBorder: 'dark:border-amber-800/50'
  },
  building: { 
    label: 'Building', 
    icon: '🚧', 
    bg: 'bg-sky-50', 
    text: 'text-sky-800', 
    border: 'border-sky-200',
    darkBg: 'dark:bg-sky-950/40',
    darkText: 'dark:text-sky-300',
    darkBorder: 'dark:border-sky-800/50'
  },
  experiment: { 
    label: 'Experiment', 
    icon: '🧪', 
    bg: 'bg-purple-50', 
    text: 'text-purple-800', 
    border: 'border-purple-200',
    darkBg: 'dark:bg-purple-950/40',
    darkText: 'dark:text-purple-300',
    darkBorder: 'dark:border-purple-800/50'
  },
  failure: { 
    label: 'Failure', 
    icon: '❌', 
    bg: 'bg-rose-50', 
    text: 'text-rose-800', 
    border: 'border-rose-200',
    darkBg: 'dark:bg-rose-950/40',
    darkText: 'dark:text-rose-300',
    darkBorder: 'dark:border-rose-800/50'
  },
  need_help: { 
    label: 'Need help', 
    icon: '🆘', 
    bg: 'bg-orange-50', 
    text: 'text-orange-800', 
    border: 'border-orange-200',
    darkBg: 'dark:bg-orange-950/40',
    darkText: 'dark:text-orange-300',
    darkBorder: 'dark:border-orange-800/50'
  },
  achievement: { 
    label: 'Achievement', 
    icon: '🎉', 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-800', 
    border: 'border-emerald-200',
    darkBg: 'dark:bg-emerald-950/40',
    darkText: 'dark:text-emerald-300',
    darkBorder: 'dark:border-emerald-800/50'
  },
  opportunity: { 
    label: 'Opportunity', 
    icon: '📢', 
    bg: 'bg-blue-50', 
    text: 'text-blue-800', 
    border: 'border-blue-200',
    darkBg: 'dark:bg-blue-950/40',
    darkText: 'dark:text-blue-300',
    darkBorder: 'dark:border-blue-800/50'
  },
  competition: { 
    label: 'Competition', 
    icon: '🏆', 
    bg: 'bg-indigo-50', 
    text: 'text-indigo-800', 
    border: 'border-indigo-200',
    darkBg: 'dark:bg-indigo-950/40',
    darkText: 'dark:text-indigo-300',
    darkBorder: 'dark:border-indigo-800/50'
  }
};

type StreamFilter = 'all' | 'trending' | 'builds' | 'help';

export const HomeFeed: React.FC<HomeFeedProps> = ({
  posts,
  currentUser,
  onLikePost,
  onAddComment,
  onOpenCreate,
  onSelectProject,
  onReportPost
}) => {
  const [streamFilter, setStreamFilter] = useState<StreamFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | 'all'>('all');
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter posts based on both stream preset and category
  const filteredPosts = posts.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (streamFilter === 'trending') {
      return p.likes >= 6 || p.comments.length >= 2;
    }
    if (streamFilter === 'builds') {
      return p.category === 'idea' || p.category === 'building' || p.category === 'experiment';
    }
    if (streamFilter === 'help') {
      return p.category === 'need_help' || p.category === 'failure';
    }
    return true;
  });

  const handleCommentSubmit = (postId: string) => {
    if (!commentInput.trim()) return;
    onAddComment(postId, commentInput.trim());
    setCommentInput('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-slate-700 dark:border-slate-600 animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Compact & Neat Share Prompt Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-3.5 sm:p-4 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-2xl object-cover ring-2 ring-sky-500/20 shrink-0"
          />
          <button
            onClick={() => onOpenCreate()}
            className="flex-1 text-left px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors truncate"
          >
            What are you building or exploring today?
          </button>
          <button
            onClick={() => onOpenCreate()}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-2xs transition-transform active:scale-95 flex items-center gap-1 shrink-0"
            title="Create Post"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="text-xs font-bold hidden sm:inline">Post</span>
          </button>
        </div>

        {/* Quick category triggers */}
        <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0">Quick:</span>
          {(['idea', 'building', 'need_help', 'experiment'] as PostCategory[]).map((cat) => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => onOpenCreate(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-xl font-medium border flex items-center gap-1 transition-transform active:scale-95 shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border} ${cfg.darkBg} ${cfg.darkText} ${cfg.darkBorder}`}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stream Segmented Controls (Quick views so feed isn't tedious) */}
      <div className="flex items-center justify-between gap-2">
        <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/80 dark:border-slate-750 overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => {
              setStreamFilter('all');
              setSelectedCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              streamFilter === 'all' && selectedCategory === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => {
              setStreamFilter('trending');
              setSelectedCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
              streamFilter === 'trending'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => {
              setStreamFilter('builds');
              setSelectedCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
              streamFilter === 'builds'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Builds</span>
          </button>
          <button
            onClick={() => {
              setStreamFilter('help');
              setSelectedCategory('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
              streamFilter === 'help'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5 text-rose-500" />
            <span>Help</span>
          </button>
        </div>

        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 shrink-0 hidden sm:inline">
          {filteredPosts.length} posts
        </span>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 min-w-max px-0.5">
          {(Object.keys(CATEGORY_CONFIG) as PostCategory[]).map((catKey) => {
            const cfg = CATEGORY_CONFIG[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => {
                  setStreamFilter('all');
                  setSelectedCategory(isSelected ? 'all' : catKey);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all border shrink-0 ${
                  isSelected
                    ? `${cfg.bg} ${cfg.text} ${cfg.darkBg} ${cfg.darkText} font-bold ring-2 ring-sky-500/40 border-transparent shadow-2xs`
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Community Feed Stream */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800 transition-colors">
            <span className="text-3xl block mb-2">🔍</span>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No posts match this filter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try choosing another category or share something new with the community!
            </p>
            <button
              onClick={() => {
                setStreamFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const cfg = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.idea;
            const isCommentsOpen = openCommentsPostId === post.id;

            return (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Card Header: Author & Category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold capitalize">
                          {post.author.role.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-1">{post.author.headline}</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{post.timestamp}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border} ${cfg.darkBg} ${cfg.darkText} ${cfg.darkBorder}`}>
                    <span>{cfg.icon}</span>
                    <span className="hidden sm:inline">{cfg.label}</span>
                  </div>
                </div>

                {/* Title & Body Content */}
                <div className="mt-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>

                {/* Associated Project Tag & Hashtags */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  {post.projectTag && (
                    <button
                      onClick={() => onSelectProject(post.projectTag!)}
                      className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>🌱</span>
                      <span>Project: {post.projectTag}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Likes, Comments, Share, Report */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                  <div className="flex items-center gap-4">
                    {/* Like Button */}
                    <button
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 font-bold transition-transform active:scale-125 ${
                        post.hasLiked ? 'text-rose-600 dark:text-rose-400' : 'hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-600 dark:fill-rose-400 stroke-rose-600 dark:stroke-rose-400' : ''}`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment Toggle */}
                    <button
                      onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                      className={`flex items-center gap-1.5 font-bold hover:text-slate-800 dark:hover:text-slate-200 transition-colors ${
                        isCommentsOpen ? 'text-sky-600 dark:text-sky-400' : ''
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </button>

                    {/* Share button */}
                    <button
                      onClick={() => showToast('Post link copied to clipboard!')}
                      className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-1"
                      title="Share post"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Report Content Flag */}
                  <button
                    onClick={() => onReportPost(post)}
                    className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-1"
                    title="Report content or spam"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Inline Comments Section */}
                {isCommentsOpen && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 animate-in fade-in">
                    <div className="space-y-2">
                      {post.comments.length === 0 ? (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">No comments yet. Be the first builder to reply!</p>
                      ) : (
                        post.comments.map((comment) => (
                          <div key={comment.id} className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-2.5 flex items-start gap-2 border border-slate-100 dark:border-slate-800">
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">{comment.author.name}</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCommentSubmit(post.id);
                        }}
                        placeholder="Write a constructive reply..."
                        className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent dark:border-slate-700"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={!commentInput.trim()}
                        className="p-2 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white transition-all shadow-2xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
