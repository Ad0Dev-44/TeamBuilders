import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Edit3, 
  Trophy, 
  Briefcase, 
  Calendar, 
  MapPin, 
  HeartHandshake, 
  Clock, 
  ExternalLink,
  Plus,
  Check,
  Tag,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { UserProfile, Project } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  userProjects: Project[];
  onSelectProject: (project: Project) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

type ProfileTab = 'overview' | 'projects' | 'skills' | 'activity' | 'all';

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  userProjects,
  onSelectProject,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState(user.bio);
  const [editHeadline, setEditHeadline] = useState(user.headline);
  const [editAvailability, setEditAvailability] = useState(user.availability);
  const [newSkill, setNewSkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(user.skills);

  const handleSaveProfile = () => {
    onUpdateProfile({
      bio: editBio,
      headline: editHeadline,
      availability: editAvailability,
      skills: skillsList
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (!newSkill.trim() || skillsList.includes(newSkill.trim())) return;
    setSkillsList([...skillsList, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-3.5 pb-16">
      {/* Top Banner & Main Identity Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 relative overflow-hidden transition-colors">
        {/* Background gradient banner */}
        <div className="h-20 -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 bg-gradient-to-r from-sky-400 via-sky-500 to-orange-400 rounded-t-3xl opacity-90 relative" />

        {/* Profile Avatar & Action */}
        <div className="flex items-end justify-between -mt-10 mb-3 relative z-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md bg-white dark:bg-slate-800"
          />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>{isEditing ? 'Cancel' : 'Edit Portfolio'}</span>
          </button>
        </div>

        {/* Name, Headline, Organization */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{user.name}</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/60 capitalize">
              {user.role.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs font-bold text-sky-700 dark:text-sky-400 mt-0.5">{user.headline}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{user.organizationOrSchool}</p>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="block text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {userProjects.length}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Projects</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="block text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {user.skills.length}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Skills</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="block text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {user.achievements.length}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Honors</span>
          </div>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 space-y-3 animate-in fade-in">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Edit Builder Profile</span>
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Headline</label>
              <input
                type="text"
                value={editHeadline}
                onChange={(e) => setEditHeadline(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 mt-0.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">About (Bio)</label>
              <textarea
                rows={2}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 mt-0.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Availability</label>
              <input
                type="text"
                value={editAvailability}
                onChange={(e) => setEditAvailability(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 mt-0.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Add Skill</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Next.js, Rust"
                  className="flex-1 text-xs p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-3.5 py-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skillsList.map((sk) => (
                  <span
                    key={sk}
                    onClick={() => handleRemoveSkill(sk)}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-semibold cursor-pointer hover:line-through"
                    title="Click to remove"
                  >
                    {sk} ✕
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Meta details badges */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-100 dark:border-slate-800">
            <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="font-semibold">{user.availability}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-100 dark:border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-100 dark:border-slate-800">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Style: <strong>{user.collaborationStyle}</strong></span>
          </div>
        </div>
      </div>

      {/* Segmented Profile Navigation Tabs (Keeps profile clean and not overly long) */}
      <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'projects'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Projects</span>
          <span className="text-[10px] px-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            {userProjects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'skills'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'activity'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Activity</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          title="View All Sections"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">All</span>
        </button>
      </div>

      {/* TAB CONTENT: 1. OVERVIEW */}
      {(activeTab === 'overview' || activeTab === 'all') && (
        <div className="space-y-3.5">
          {/* About Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>About Builder</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{user.bio}</p>
          </div>

          {/* Looking For Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-orange-500" />
              <span>Looking For & Open Roles</span>
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {user.lookingFor.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 font-bold border border-orange-200 dark:border-orange-800/60 flex items-center gap-1"
                >
                  <span>🎯</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Project Preview (Compact teaser inside overview) */}
          {userProjects.length > 0 && activeTab === 'overview' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Featured Project
                </h2>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  <span>View all ({userProjects.length})</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div
                onClick={() => onSelectProject(userProjects[0])}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-2xs">
                    {userProjects[0].icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{userProjects[0].title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{userProjects[0].tagline}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md shrink-0 border border-emerald-200/50 dark:border-emerald-800/50">
                  {userProjects[0].stage}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. PROJECTS */}
      {(activeTab === 'projects' || activeTab === 'all') && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-sky-500" />
              <span>Projects & Workspaces ({userProjects.length})</span>
            </h2>
            <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full">
              Active Builder
            </span>
          </div>

          {userProjects.length === 0 ? (
            <div className="text-center py-6 text-slate-400 dark:text-slate-500 text-xs">
              No active projects yet. Create one or join a team!
            </div>
          ) : (
            <div className="space-y-2.5">
              {userProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-2xs">
                      {proj.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{proj.title}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{proj.tagline}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/50">
                      {proj.stage}
                    </span>
                    <span className="block text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{proj.members.length} members</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 3. SKILLS & HONORS */}
      {(activeTab === 'skills' || activeTab === 'all') && (
        <div className="space-y-3.5">
          {/* Skills Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              Technical Proficiencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200/80 dark:border-slate-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Achievements & Honors</span>
            </h2>
            <div className="space-y-2">
              {user.achievements.map((ach, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              Interests & Problem Spaces
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="text-xs px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800/60"
                >
                  #{interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. ACTIVITY */}
      {(activeTab === 'activity' || activeTab === 'all') && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/90 dark:border-slate-800 transition-colors">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-sky-500" />
            <span>Recent Activity & Sprints</span>
          </h2>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {user.recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{act}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
