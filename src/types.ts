export type UserRole = 
  | 'student' 
  | 'young_professional' 
  | 'mentor' 
  | 'sponsor' 
  | 'marketplace_partner';

export type ProjectStage = 'Idea' | 'Research' | 'Prototype' | 'MVP' | 'Launch';

export type PostCategory = 
  | 'idea' 
  | 'building' 
  | 'experiment' 
  | 'failure' 
  | 'need_help' 
  | 'achievement' 
  | 'opportunity' 
  | 'competition';

export interface CompatibilityBreakdown {
  overallPercentage: number;
  sharedInterests: string[];
  complementarySkills: string[];
  similarAvailability: string;
  sharedGoal: string;
  preferredRole: string;
  preferredTeamSize: string;
  matchHighlights: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  headline: string;
  organizationOrSchool: string;
  bio: string;
  avatar: string;
  skills: string[];
  lookingFor: string[];
  interests: string[];
  availability: string;
  location: string;
  collaborationStyle: 'Leader' | 'Builder' | 'Researcher' | 'Coordinator';
  commitmentLevel: 'Casual' | 'Moderate' | 'Highly Committed';
  preferredRole: string;
  projectsCount: number;
  achievements: string[];
  recentActivity: string[];
  compatibility?: CompatibilityBreakdown;
  portfolioLinks?: { label: string; url: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isLeader?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  stage: ProjectStage;
  founder: TeamMember;
  members: TeamMember[];
  maxMembers: number;
  lookingFor: string[];
  tags: string[];
  resources: { title: string; type: 'doc' | 'link' | 'github' }[];
  milestones: { name: ProjectStage; completed: boolean; current?: boolean }[];
  associatedCompetition?: string;
  likes: number;
}

export interface TeamEntity {
  id: string;
  name: string;
  emblem: string;
  project: string;
  members: TeamMember[];
  maxMembers: number;
  goals: string;
  neededSkills: string[];
  meetingSchedule: string;
  activeCompetition?: string;
}

export interface PostComment {
  id: string;
  author: {
    name: string;
    avatar: string;
    headline: string;
  };
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    headline: string;
    avatar: string;
    role: UserRole;
  };
  category: PostCategory;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  comments: PostComment[];
  tags: string[];
  projectTag?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  isAiAdvice?: boolean;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'team' | 'project';
  name: string;
  subtitle: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  membersCount?: number;
  messages: ChatMessage[];
}

export interface ReportPayload {
  targetType: 'post' | 'user' | 'project';
  targetId: string;
  targetTitle: string;
  reason: 'spam' | 'harassment' | 'hate_speech' | 'inappropriate' | 'copyright' | 'other';
  notes?: string;
}
