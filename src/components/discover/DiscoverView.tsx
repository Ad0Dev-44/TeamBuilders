import React, { useState } from 'react';
import { 
  Users, 
  FolderGit2, 
  Flame, 
  Sparkles, 
  X, 
  UserPlus, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Search, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { UserProfile, Project, TeamEntity } from '../../types';
import { queryAiTeamMatcher, AiMatchResult } from '../../services/geminiService';

interface DiscoverViewProps {
  people: UserProfile[];
  projects: Project[];
  teams: TeamEntity[];
  currentUser: UserProfile;
  onConnectPerson: (person: UserProfile) => void;
  onViewPerson: (person: UserProfile) => void;
  onSelectProject: (project: Project) => void;
  onJoinProject: (project: Project) => void;
  onJoinTeam: (team: TeamEntity) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  people,
  projects,
  teams,
  currentUser,
  onConnectPerson,
  onViewPerson,
  onSelectProject,
  onJoinProject,
  onJoinTeam
}) => {
  const [activeTab, setActiveTab] = useState<'people' | 'projects' | 'teams'>('people');
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});
  const [showCompatibilityExplainer, setShowCompatibilityExplainer] = useState(false);

  // AI Matcher State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiMatchResult | null>(null);

  const activePerson = people[currentPersonIndex % people.length];

  const handlePass = () => {
    setCurrentPersonIndex((prev) => (prev + 1) % people.length);
  };

  const handleConnect = (person: UserProfile) => {
    setConnectedIds((prev) => ({ ...prev, [person.id]: true }));
    onConnectPerson(person);
  };

  const handleRunAiMatch = async (customQuery?: string) => {
    const q = customQuery || aiPrompt || 'Find me 3 people who complement my skills for an AI hackathon';
    setIsAiLoading(true);
    setAiPrompt(q);
    const res = await queryAiTeamMatcher(q, {
      role: currentUser.role,
      skills: currentUser.skills,
      interests: currentUser.interests,
      availability: currentUser.availability
    });
    setAiResult(res);
    setIsAiLoading(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 3-Layer Discovery Switcher */}
      <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/80 dark:border-slate-700/80 transition-colors">
        <button
          onClick={() => setActiveTab('people')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'people'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4 text-sky-500" />
          <span>People</span>
          <span className="text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-1.5 py-0.2 rounded-full font-bold">
            {people.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'projects'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-emerald-500" />
          <span>Projects</span>
          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-bold">
            {projects.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('teams')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'teams'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4 text-orange-500" />
          <span>Teams</span>
          <span className="text-[10px] bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-1.5 py-0.2 rounded-full font-bold">
            {teams.length}
          </span>
        </button>
      </div>

      {/* AI Matcher Banner / Query input */}
      <div className="bg-gradient-to-br from-sky-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-3xl p-4 border border-sky-200/80 dark:border-slate-800 shadow-2xs transition-colors">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-orange-500 text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">AI Team Matcher</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Ask Gemini to find complementary co-builders</p>
            </div>
          </div>
          <button
            onClick={() => setShowCompatibilityExplainer(!showCompatibilityExplainer)}
            className="text-[11px] font-bold text-sky-700 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How Matching Works</span>
          </button>
        </div>

        {/* Explainability drawer */}
        {showCompatibilityExplainer && (
          <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-sky-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 animate-in fade-in">
            <p className="font-bold text-slate-800 dark:text-white">12 Matching Dimensions:</p>
            <p className="text-[11px] leading-relaxed">
              We score profiles based on <span className="font-semibold text-slate-700 dark:text-slate-200">Complementary Skills</span> (e.g. Backend + UX), <span className="font-semibold text-slate-700 dark:text-slate-200">Shared Interests</span> (AI, Climate), <span className="font-semibold text-slate-700 dark:text-slate-200">Synchronized Availability</span> (Weekends), <span className="font-semibold text-slate-700 dark:text-slate-200">Collaboration Style</span>, and <span className="font-semibold text-slate-700 dark:text-slate-200">Sprint Goal</span>. Not a black box—every percentage is explained!
            </p>
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Find me 3 people who complement my skills for an AI hackathon"
              className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRunAiMatch();
              }}
            />
          </div>
          <button
            onClick={() => handleRunAiMatch()}
            disabled={isAiLoading}
            className="px-3.5 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all shrink-0 active:scale-95"
          >
            {isAiLoading ? 'Matching...' : 'Match'}
          </button>
        </div>

        {/* AI Result Card */}
        {aiResult && (
          <div className="mt-3 p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-orange-200 dark:border-orange-900/60 shadow-sm space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                Gemini Match Insights
              </span>
              <button
                onClick={() => setAiResult(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{aiResult.aiSummary}</p>
            <div className="space-y-2 pt-1">
              {aiResult.matches.map((m, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold">
                        {m.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{m.reason}</p>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                      ⚡ Synergy: {m.keySkillSynergy}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-orange-500">{m.compatibility}%</span>
                    <span className="block text-[9px] text-slate-400 dark:text-slate-500 font-bold">Match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LAYER 1: PEOPLE (Compatibility Card Flow) */}
      {activeTab === 'people' && (
        <div className="space-y-4">
          {activePerson ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200/90 dark:border-slate-800 relative overflow-hidden transition-all">
              {/* Background Accent Pill */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-sky-100 to-orange-100 dark:from-sky-950/20 dark:to-orange-950/20 rounded-bl-full -z-0 opacity-60" />

              {/* Top Row: Avatar & Compatibility Score */}
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={activePerson.avatar}
                    alt={activePerson.name}
                    className="w-16 h-16 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
                  />
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{activePerson.name}</h2>
                    <p className="text-xs font-bold text-sky-700 dark:text-sky-400">{activePerson.headline}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{activePerson.organizationOrSchool}</p>
                  </div>
                </div>

                {/* The Signature Compatibility Score */}
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-sky-200 dark:border-sky-800 shadow-sm text-center">
                  <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400 leading-none">
                    {activePerson.compatibility?.overallPercentage || 91}%
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">
                    Compatibility
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="relative z-10 text-xs text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
                {activePerson.bio}
              </p>

              {/* Quick Specs (Location & Availability) */}
              <div className="relative z-10 mt-3 flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  {activePerson.availability}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  {activePerson.location.split('(')[0]}
                </span>
              </div>

              {/* Skills & Looking For */}
              <div className="relative z-10 mt-4 space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Core Skills</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activePerson.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200/60 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Looking For</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activePerson.lookingFor.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-800/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explicit Compatibility Breakdown Card */}
              {activePerson.compatibility && (
                <div className="relative z-10 mt-4 p-3.5 rounded-2xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-200/70 dark:border-sky-900/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      Compatibility Match Breakdown
                    </span>
                    <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400">Calculated Factors</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Shared interests:</strong> {activePerson.compatibility.sharedInterests.join(', ')}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Complementary skills:</strong> {activePerson.compatibility.complementarySkills[0]}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Similar availability:</strong> {activePerson.compatibility.similarAvailability}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Shared goal:</strong> {activePerson.compatibility.sharedGoal}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Pass | Connect | View Profile */}
              <div className="relative z-10 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                {/* Pass Button */}
                <button
                  onClick={handlePass}
                  className="flex-1 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <X className="w-4 h-4 text-slate-400" />
                  <span>Pass</span>
                </button>

                {/* View Profile Button */}
                <button
                  onClick={() => onViewPerson(activePerson)}
                  className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span>Profile</span>
                </button>

                {/* Connect Button */}
                <button
                  onClick={() => handleConnect(activePerson)}
                  disabled={connectedIds[activePerson.id]}
                  className={`flex-1 py-3 rounded-2xl text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                    connectedIds[activePerson.id]
                      ? 'bg-emerald-600 cursor-default'
                      : 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/30'
                  }`}
                >
                  {connectedIds[activePerson.id] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Connected!</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </div>

              {/* Deck Navigation Indicator */}
              <div className="mt-3 text-center">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                  Profile {currentPersonIndex + 1} of {people.length} • Tap Pass to see next candidate
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">No more builder profiles for now. Check back soon!</p>
            </div>
          )}
        </div>
      )}

      {/* LAYER 2: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-3.5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/90 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-2xl shadow-xs">
                    {proj.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{proj.title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{proj.category}</p>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      Stage: {proj.stage}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {proj.members.length}/{proj.maxMembers}
                  </span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500">members</span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 leading-relaxed font-medium">
                {proj.tagline}
              </p>

              {/* Progress Milestones Stepper */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1">
                  <span>Milestone Pipeline:</span>
                  <span className="text-sky-600 dark:text-sky-400">{proj.stage}</span>
                </div>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {(['Idea', 'Research', 'Prototype', 'MVP', 'Launch'] as const).map((stage) => {
                    const isPassed = proj.milestones.find((m) => m.name === stage)?.completed;
                    const isCurrent = proj.stage === stage;
                    return (
                      <div
                        key={stage}
                        className={`py-1 rounded-lg text-[9px] font-bold transition-all ${
                          isCurrent
                            ? 'bg-sky-500 text-white shadow-xs'
                            : isPassed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {stage}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Roles Needed */}
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Looking For:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.lookingFor.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2.5 py-0.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 font-semibold border border-orange-200 dark:border-orange-800/60"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  {proj.members.map((member) => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      title={`${member.name} (${member.role})`}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onJoinProject(proj)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                  >
                    Join Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LAYER 3: TEAMS */}
      {activeTab === 'teams' && (
        <div className="space-y-3.5">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/90 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 flex items-center justify-center text-2xl shadow-xs">
                    {team.emblem}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{team.name}</h3>
                    <p className="text-[11px] font-bold text-sky-700 dark:text-sky-400">{team.project}</p>
                    {team.activeCompetition && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md inline-block mt-0.5">
                        🏆 {team.activeCompetition}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {team.members.length}/{team.maxMembers}
                  </span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500">members</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
                <strong>Goal:</strong> {team.goals}
              </p>

              <div className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Cadence:</span> {team.meetingSchedule}
              </div>

              {/* Needed skills */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Needs:</span>
                {team.neededSkills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[11px] font-semibold bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-300 px-2 py-0.5 rounded-lg border border-sky-200 dark:border-sky-800"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  {team.members.map((m) => (
                    <img
                      key={m.id}
                      src={m.avatar}
                      alt={m.name}
                      title={`${m.name} (${m.role})`}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                    />
                  ))}
                </div>

                <button
                  onClick={() => onJoinTeam(team)}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  Request to Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
