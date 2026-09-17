import React, { useState } from 'react';
import { X, Send, Plus, Sparkles, FolderGit2, Users, FileText } from 'lucide-react';
import { PostCategory, Project, TeamEntity, UserProfile } from '../../types';
import { CATEGORY_CONFIG } from '../home/HomeFeed';

interface CreateModalProps {
  currentUser: UserProfile;
  initialCategory?: PostCategory;
  onClose: () => void;
  onCreatePost: (postData: { category: PostCategory; title: string; content: string; tags: string[]; projectTag?: string }) => void;
  onCreateProject: (projectData: Partial<Project>) => void;
  onCreateTeam: (teamData: Partial<TeamEntity>) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  currentUser,
  initialCategory = 'idea',
  onClose,
  onCreatePost,
  onCreateProject,
  onCreateTeam
}) => {
  const [activeTab, setActiveTab] = useState<'post' | 'project' | 'team'>('post');

  // Post form state
  const [postCategory, setPostCategory] = useState<PostCategory>(initialCategory);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('Hackathon, AI');
  const [projectTag, setProjectTag] = useState('');

  // Project form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectCategory, setProjectCategory] = useState('AI & Machine Learning');
  const [projectRoles, setProjectRoles] = useState('Frontend Developer, UX Designer');
  const [projectMaxMembers, setProjectMaxMembers] = useState(4);

  // Team form state
  const [teamName, setTeamName] = useState('');
  const [teamEmblem, setTeamEmblem] = useState('🚀');
  const [teamProject, setTeamProject] = useState('');
  const [teamGoals, setTeamGoals] = useState('');
  const [teamSkills, setTeamSkills] = useState('React, Python, Design');

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;
    const tagsArray = postTags.split(',').map((t) => t.trim()).filter(Boolean);
    onCreatePost({
      category: postCategory,
      title: postTitle.trim(),
      content: postContent.trim(),
      tags: tagsArray,
      projectTag: projectTag.trim() || undefined
    });
    onClose();
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle.trim() || !projectTagline.trim()) return;
    const rolesArray = projectRoles.split(',').map((r) => r.trim()).filter(Boolean);
    onCreateProject({
      title: projectTitle.trim(),
      tagline: projectTagline.trim(),
      description: projectTagline.trim(),
      category: projectCategory,
      icon: '💡',
      stage: 'Idea',
      maxMembers: projectMaxMembers,
      lookingFor: rolesArray,
      tags: [projectCategory.split(' ')[0]],
      resources: [],
      milestones: [
        { name: 'Idea', completed: true, current: true },
        { name: 'Research', completed: false },
        { name: 'Prototype', completed: false },
        { name: 'MVP', completed: false },
        { name: 'Launch', completed: false }
      ]
    });
    onClose();
  };

  const handleSubmitTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !teamGoals.trim()) return;
    const skillsArray = teamSkills.split(',').map((s) => s.trim()).filter(Boolean);
    onCreateTeam({
      name: teamName.trim(),
      emblem: teamEmblem.trim() || '🔥',
      project: teamProject.trim() || teamName.trim(),
      goals: teamGoals.trim(),
      neededSkills: skillsArray,
      maxMembers: 5,
      meetingSchedule: 'Weekends & Evenings'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Create on TeamBuilders</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Post an update, launch a project, or form a team</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('post')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'post' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-500" />
            <span>Community Post</span>
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'project' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Project</span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'team' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-orange-500" />
            <span>Team</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 flex-1">
          {/* TAB 1: POST */}
          {activeTab === 'post' && (
            <form onSubmit={handleSubmitPost} className="space-y-3.5">
              {/* Category selector */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                  Post Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(Object.keys(CATEGORY_CONFIG) as PostCategory[]).map((cat) => {
                    const cfg = CATEGORY_CONFIG[cat];
                    const isSelected = postCategory === cat;
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setPostCategory(cat)}
                        className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? `${cfg.bg} ${cfg.text} ${cfg.darkBg} ${cfg.darkText} font-bold ring-2 ring-sky-500/40 border-transparent shadow-2xs`
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                        }`}
                      >
                        <span>{cfg.icon}</span>
                        <span className="truncate">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. We just finished the initial prompt pipeline!"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Content / What happened?</label>
                <textarea
                  rows={3}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share details, lessons learned, or what you need help with..."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Link Project (Optional)</label>
                  <input
                    type="text"
                    value={projectTag}
                    onChange={(e) => setProjectTag(e.target.value)}
                    placeholder="e.g. EcoTrack"
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="AI, Hardware, CleanTech"
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/30 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Publish to Community Feed</span>
              </button>
            </form>
          )}

          {/* TAB 2: PROJECT */}
          {activeTab === 'project' && (
            <form onSubmit={handleSubmitProject} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Project Title</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. SolarSync"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Tagline & Core Value</label>
                <textarea
                  rows={2}
                  value={projectTagline}
                  onChange={(e) => setProjectTagline(e.target.value)}
                  placeholder="Platform coordinating microgrid solar sharing between campus dorms."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Category</label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    <option>AI & Machine Learning</option>
                    <option>Climate & CleanTech</option>
                    <option>Education Tech</option>
                    <option>Healthcare & Biotech</option>
                    <option>Assistive Tech & Robotics</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Max Team Members</label>
                  <input
                    type="number"
                    min={2}
                    max={8}
                    value={projectMaxMembers}
                    onChange={(e) => setProjectMaxMembers(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Roles Needed (Looking For)</label>
                <input
                  type="text"
                  value={projectRoles}
                  onChange={(e) => setProjectRoles(e.target.value)}
                  placeholder="ML Engineer, UX Designer, Business Lead"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Launch Project Workspace</span>
              </button>
            </form>
          )}

          {/* TAB 3: TEAM */}
          {activeTab === 'team' && (
            <form onSubmit={handleSubmitTeam} className="space-y-3.5">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Emblem</label>
                  <input
                    type="text"
                    value={teamEmblem}
                    onChange={(e) => setTeamEmblem(e.target.value)}
                    className="w-full text-center text-lg p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Team Name</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Team Hyperion"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Project or Competition</label>
                <input
                  type="text"
                  value={teamProject}
                  onChange={(e) => setTeamProject(e.target.value)}
                  placeholder="e.g. Google AI Hackathon 2026"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Team Goals</label>
                <textarea
                  rows={2}
                  value={teamGoals}
                  onChange={(e) => setTeamGoals(e.target.value)}
                  placeholder="What is the team building, and what is your milestone timeline?"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Needed Skills to Fill</label>
                <input
                  type="text"
                  value={teamSkills}
                  onChange={(e) => setTeamSkills(e.target.value)}
                  placeholder="Backend Developer, Pitch Specialist"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Create Team</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
