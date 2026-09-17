import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/common/Header';
import { 
  BottomNav, 
  NavTab 
} from './components/common/BottomNav';
import { 
  HomeFeed 
} from './components/home/HomeFeed';
import { 
  DiscoverView 
} from './components/discover/DiscoverView';
import { 
  ProjectDetailModal 
} from './components/projects/ProjectDetailModal';
import { 
  ProfileView 
} from './components/profile/ProfileView';
import { 
  MessagesView 
} from './components/messages/MessagesView';
import { 
  CreateModal 
} from './components/create/CreateModal';
import { 
  ReportModal 
} from './components/common/ReportModal';
import { 
  AiAssistantModal 
} from './components/common/AiAssistantModal';

import { 
  CURRENT_USER, 
  DISCOVER_PEOPLE, 
  PROJECTS_LIST, 
  TEAMS_LIST, 
  COMMUNITY_POSTS, 
  INITIAL_CONVERSATIONS 
} from './data/mockData';

import { 
  UserProfile, 
  Project, 
  TeamEntity, 
  CommunityPost, 
  Conversation, 
  PostCategory, 
  ProjectStage 
} from './types';

export default function App() {
  // State
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [people, setPeople] = useState<UserProfile[]>(DISCOVER_PEOPLE);
  const [projects, setProjects] = useState<Project[]>(PROJECTS_LIST);
  const [teams, setTeams] = useState<TeamEntity[]>(TEAMS_LIST);
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);

  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tb_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tb_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tb_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Modals
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewingPerson, setViewingPerson] = useState<UserProfile | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createInitialCategory, setCreateInitialCategory] = useState<PostCategory>('idea');
  const [reportingPost, setReportingPost] = useState<CommunityPost | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [aiAssistantProject, setAiAssistantProject] = useState<{ title: string; stage: ProjectStage }>({
    title: 'EcoTrack',
    stage: 'Prototype'
  });

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Handlers ---
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newHasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked: newHasLiked,
            likes: newHasLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c_${Date.now()}`,
            author: {
              name: currentUser.name,
              avatar: currentUser.avatar,
              headline: currentUser.headline
            },
            content: text,
            timestamp: 'Just now'
          };
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
    showToast('Comment posted!');
  };

  const handleConnectPerson = (person: UserProfile) => {
    showToast(`Connected with ${person.name}! You can now collaborate.`);
    // Ensure a conversation exists with this person
    const exists = conversations.some((c) => c.name === person.name);
    if (!exists) {
      const newConv: Conversation = {
        id: `conv_${person.id}`,
        type: 'direct',
        name: person.name,
        avatar: person.avatar,
        subtitle: person.headline,
        unreadCount: 1,
        lastMessage: "Hi! I saw your profile on Discover. Let's build together!",
        lastMessageTime: 'Just now',
        messages: [
          {
            id: `m_${Date.now()}`,
            senderId: person.id,
            senderName: person.name,
            senderAvatar: person.avatar,
            text: `Hi ${currentUser.name}! Thanks for connecting. What are you building this weekend?`,
            timestamp: 'Just now',
            isMe: false
          }
        ]
      };
      setConversations([newConv, ...conversations]);
    }
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          const myMsg = {
            id: `m_${Date.now()}`,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderAvatar: currentUser.avatar,
            text,
            timestamp: 'Just now',
            isMe: true
          };
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, myMsg]
          };
        }
        return c;
      })
    );

    // Friendly auto-response simulation after 1.5s
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            const replyMsg = {
              id: `m_rep_${Date.now()}`,
              senderId: 'partner',
              senderName: c.name,
              senderAvatar: c.avatar,
              text: "Sounds awesome! Let's sync up on the milestones and divide tasks.",
              timestamp: 'Just now'
            };
            return {
              ...c,
              lastMessage: replyMsg.text,
              lastMessageTime: 'Just now',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  const handleAskAiMentorInChat = (conversationId: string, topic: string) => {
    const aiSuggestionMsg = {
      id: `ai_${Date.now()}`,
      senderId: 'gemini',
      senderName: 'Gemini Coach',
      senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      text: `💡 **Collaboration Tip for ${topic}**:
1. Clarify each team member's superpower (e.g. backend logic vs interface design).
2. Agree on a fixed 30-minute daily standup window.
3. Keep PRs small to avoid merge bottlenecks before hackathon submission.`,
      timestamp: 'Just now',
      isAiAdvice: true
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, aiSuggestionMsg]
          };
        }
        return c;
      })
    );
    showToast('AI Coach suggestion added to chat!');
  };

  const handleCreatePost = (postData: {
    category: PostCategory;
    title: string;
    content: string;
    tags: string[];
    projectTag?: string;
  }) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      category: postData.category,
      title: postData.title,
      content: postData.content,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role,
        headline: currentUser.headline,
        avatar: currentUser.avatar
      },
      timestamp: 'Just now',
      likes: 1,
      hasLiked: true,
      comments: [],
      tags: postData.tags,
      projectTag: postData.projectTag
    };
    setPosts([newPost, ...posts]);
    setActiveTab('home');
    showToast('Post published to Community Feed!');
  };

  const handleCreateProject = (projectData: Partial<Project>) => {
    const founderMember = {
      id: currentUser.id,
      name: currentUser.name,
      role: 'Founder & Lead',
      avatar: currentUser.avatar,
      isLeader: true
    };
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      title: projectData.title || 'Untitled Project',
      tagline: projectData.tagline || '',
      description: projectData.description || '',
      category: projectData.category || 'Technology',
      icon: projectData.icon || '🚀',
      stage: 'Idea',
      founder: founderMember,
      maxMembers: projectData.maxMembers || 4,
      members: [founderMember],
      lookingFor: projectData.lookingFor || ['Developer', 'Designer'],
      tags: projectData.tags || ['Innovation'],
      resources: [],
      likes: 1,
      milestones: [
        { name: 'Idea', completed: true, current: true },
        { name: 'Research', completed: false },
        { name: 'Prototype', completed: false },
        { name: 'MVP', completed: false },
        { name: 'Launch', completed: false }
      ]
    };
    setProjects([newProject, ...projects]);
    setSelectedProject(newProject);
    showToast(`Project "${newProject.title}" launched!`);
  };

  const handleCreateTeam = (teamData: Partial<TeamEntity>) => {
    const newTeam: TeamEntity = {
      id: `team_${Date.now()}`,
      name: teamData.name || 'New Team',
      emblem: teamData.emblem || '🔥',
      project: teamData.project || 'Hackathon Sprint',
      goals: teamData.goals || '',
      maxMembers: 5,
      members: [
        {
          id: currentUser.id,
          name: currentUser.name,
          role: 'Captain',
          avatar: currentUser.avatar
        }
      ],
      neededSkills: teamData.neededSkills || ['Fullstack Developer'],
      meetingSchedule: teamData.meetingSchedule || 'Weekends'
    };
    setTeams([newTeam, ...teams]);
    showToast(`Team "${newTeam.name}" created!`);
  };

  const handleSelectProjectByName = (name: string) => {
    const found = projects.find((p) => p.title.toLowerCase() === name.toLowerCase());
    if (found) {
      setSelectedProject(found);
    } else {
      showToast(`Viewing project ${name}`);
    }
  };

  const handleOpenAiAssistantForProject = (title: string, stage: ProjectStage) => {
    setAiAssistantProject({ title, stage });
    setIsAiAssistantOpen(true);
  };

  return (
    <div className={`h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center antialiased transition-colors ${isDarkMode ? 'dark bg-slate-950 text-slate-100 selection:bg-sky-900' : 'bg-slate-100 text-slate-900 selection:bg-sky-200'}`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-2xl border border-slate-700 dark:border-slate-600 animate-in fade-in slide-in-from-top-3 flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container: Supports either Android Device Frame or Fluid Full-Screen */}
      <div
        className={`w-full transition-all duration-300 flex flex-col overflow-hidden ${
          isMobileFrame
            ? 'h-[100dvh] sm:h-[min(780px,calc(100dvh-2rem))] max-w-[440px] my-0 sm:my-auto rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-700 bg-white dark:bg-slate-900 relative'
            : 'h-[100dvh] max-w-4xl bg-white dark:bg-slate-900 shadow-sm relative'
        }`}
      >
        {/* Android Status Bar Emulation (only in frame mode) */}
        {isMobileFrame && (
          <div className="bg-slate-900 text-white px-6 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold select-none shrink-0">
            <span>9:41</span>
            {/* Camera cutout pill */}
            <div className="w-16 h-3 bg-black rounded-full" />
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Global Navigation Header */}
        <Header
          currentUser={currentUser}
          onSelectUser={(u) => {
            setCurrentUser(u);
            showToast(`Switched persona to ${u.name}`);
          }}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        {/* Main Interactive Screen Content with Smooth Scrolling */}
        <main className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
          {/* TAB 1: HOME FEED */}
          {activeTab === 'home' && (
            <HomeFeed
              posts={posts}
              currentUser={currentUser}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onOpenCreate={(cat) => {
                if (cat) setCreateInitialCategory(cat);
                setIsCreateOpen(true);
              }}
              onSelectProject={handleSelectProjectByName}
              onReportPost={(post) => setReportingPost(post)}
            />
          )}

          {/* TAB 2: DISCOVER (People, Projects, Teams) */}
          {activeTab === 'discover' && (
            <DiscoverView
              people={people}
              projects={projects}
              teams={teams}
              currentUser={currentUser}
              onConnectPerson={handleConnectPerson}
              onViewPerson={(p) => setViewingPerson(p)}
              onSelectProject={(p) => setSelectedProject(p)}
              onJoinProject={(p) => {
                setSelectedProject(p);
                showToast(`Choose an open role to join ${p.title}!`);
              }}
              onJoinTeam={(t) => showToast(`Request to join "${t.name}" submitted!`)}
            />
          )}

          {/* TAB 3: CREATE (Handled primarily by modal, but accessible as tab) */}
          {activeTab === 'create' && (
            <div className="p-6 text-center space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Create on TeamBuilders</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tap the center '+' button anytime to publish a post, project or team.
              </p>
              <button
                onClick={() => setIsCreateOpen(true)}
                className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-xs shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
              >
                Open Creator Studio
              </button>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <MessagesView
              conversations={conversations}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onAskAiMentorInChat={handleAskAiMentorInChat}
            />
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <ProfileView
              user={currentUser}
              userProjects={projects.filter((p) =>
                p.members.some((m) => m.id === currentUser.id || m.name === currentUser.name)
              )}
              onSelectProject={(p) => setSelectedProject(p)}
              onUpdateProfile={(updated) => {
                setCurrentUser((prev) => ({ ...prev, ...updated }));
                showToast('Profile updated!');
              }}
            />
          )}
        </main>

        {/* Android Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'create') {
              setIsCreateOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          unreadMessagesCount={1}
        />

        {/* Android Gesture Bar Emulation (only in frame mode) */}
        {isMobileFrame && (
          <div className="bg-white dark:bg-slate-900 py-1 flex justify-center select-none shrink-0 transition-colors">
            <div className="w-28 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        )}
      </div>

      {/* --- MODALS & DRAWERS --- */}

      {/* 1. Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          currentUser={currentUser}
          onClose={() => setSelectedProject(null)}
          onJoinRole={(role) => showToast(`Applied for "${role}" on ${selectedProject.title}!`)}
          onAskAiProjectAdvice={(title, stage) => {
            handleOpenAiAssistantForProject(title, stage);
          }}
        />
      )}

      {/* 2. Person Detail Modal */}
      {viewingPerson && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[85vh] rounded-3xl shadow-2xl p-5 overflow-y-auto border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                Builder Profile
              </span>
              <button
                onClick={() => setViewingPerson(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <ProfileView
                user={viewingPerson}
                userProjects={projects.filter((p) =>
                  p.members.some((m) => m.name === viewingPerson.name)
                )}
                onSelectProject={(p) => {
                  setViewingPerson(null);
                  setSelectedProject(p);
                }}
                onUpdateProfile={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. Create Studio Modal */}
      {isCreateOpen && (
        <CreateModal
          currentUser={currentUser}
          initialCategory={createInitialCategory}
          onClose={() => setIsCreateOpen(false)}
          onCreatePost={handleCreatePost}
          onCreateProject={handleCreateProject}
          onCreateTeam={handleCreateTeam}
        />
      )}

      {/* 4. Report / Safety Moderation Modal */}
      {reportingPost && (
        <ReportModal
          targetPost={reportingPost}
          onClose={() => setReportingPost(null)}
          onSubmitReport={(reason, notes) => {
            showToast(`Report logged for moderation. Thank you.`);
          }}
          onBlockAuthor={(authorName) => {
            setPosts((prev) => prev.filter((p) => p.author.name !== authorName));
            showToast(`Blocked ${authorName}. Their posts are now hidden.`);
          }}
        />
      )}

      {/* 5. Google AI Project & Team Coach Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        defaultProjectTitle={aiAssistantProject.title}
        defaultStage={aiAssistantProject.stage}
      />
    </div>
  );
}
