import { UserProfile, Project, TeamEntity, CommunityPost, Conversation } from '../types';

export const CURRENT_USER: UserProfile = {
  id: 'user_alex',
  name: 'Alex Haddad',
  role: 'student',
  headline: 'Computer Science & AI Student',
  organizationOrSchool: 'Stanford University',
  bio: 'Building systems at the intersection of AI, robotics, and climate tech. Love fast prototyping, hackathons, and finding passionate co-builders.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  skills: ['Python', 'React', 'Machine Learning', 'Product', 'FastAPI', 'PyTorch'],
  lookingFor: ['Frontend Developer', 'Hackathon Teammates', 'Startup Co-founder'],
  interests: ['AI', 'Robotics', 'Climate', 'Startups', 'Education Tech'],
  availability: 'Weekends & Evenings (~15 hrs/wk)',
  location: 'San Francisco, CA (or Remote)',
  collaborationStyle: 'Builder',
  commitmentLevel: 'Highly Committed',
  preferredRole: 'Full Stack & AI Engineer',
  projectsCount: 2,
  achievements: [
    '🏆 Hackathon Finalist (CalHacks 2025)',
    '🥇 University Innovation Cup 1st Place',
    '📜 Published paper in Student AI Conference'
  ],
  recentActivity: [
    'Posted an update in #building on EcoTrack Prototype',
    'Connected with Sarah Chen (UX Designer)',
    'Joined Team Phoenix for Google AI Hackathon'
  ],
  portfolioLinks: [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'Portfolio', url: 'https://alexhaddad.dev' }
  ]
};

export const ALTERNATIVE_PROFILES: UserProfile[] = [
  CURRENT_USER,
  {
    id: 'user_maya',
    name: 'Maya Lin',
    role: 'young_professional',
    headline: 'Product Designer & UX Researcher',
    organizationOrSchool: 'Figma Community Fellow',
    bio: 'Obsessed with human-centered AI interfaces. 3 years exp in design systems and mobile UX. Looking to mentor student founders or join ambitious weekend sprints.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    skills: ['Figma', 'UX Research', 'Design Systems', 'Prototyping', 'User Testing'],
    lookingFor: ['Technical Co-founder', 'Mobile Engineers'],
    interests: ['AI UX', 'Climate Tech', 'Civic Tech', 'Product Strategy'],
    availability: 'Evenings (~10 hrs/wk)',
    location: 'New York, NY (Hybrid)',
    collaborationStyle: 'Researcher',
    commitmentLevel: 'Moderate',
    preferredRole: 'UX & Product Lead',
    projectsCount: 4,
    achievements: [
      '🌟 Best UI Award at TechCrunch Disrupt Hack',
      '💬 Mentored 12 student teams in 2025'
    ],
    recentActivity: [
      'Published UX teardown on team matching dynamics',
      'Joined EcoTrack as Lead UX'
    ]
  },
  {
    id: 'user_marcus',
    name: 'Dr. Marcus Vance',
    role: 'mentor',
    headline: 'Principal AI Scientist & Industry Mentor',
    organizationOrSchool: 'Ex-DeepMind / AI Fellow',
    bio: 'Over 12 years in production ML & agentic systems. Passionate about guiding energetic early-stage builders through model evaluation, technical architecture, and fundraising.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    skills: ['AI Architecture', 'Distributed Systems', 'Fundraising', 'Team Mentorship'],
    lookingFor: ['Promising Student Projects', 'Hackathon Teams to Advise'],
    interests: ['AI Safety', 'Edge AI', 'HealthTech', 'Education'],
    availability: 'Weekends (Office Hours: 3 hrs/wk)',
    location: 'Boston, MA (Remote)',
    collaborationStyle: 'Leader',
    commitmentLevel: 'Casual',
    preferredRole: 'Mentor & Technical Advisor',
    projectsCount: 8,
    achievements: [
      '🎓 Ph.D. in Computer Science',
      '🚀 Advised 5 YC-funded startups',
      '🏅 20+ Citations in Top AI Journals'
    ],
    recentActivity: [
      'Held Office Hours for 4 student hackathon teams',
      'Reviewed EcoTrack architecture blueprint'
    ]
  }
];

export const DISCOVER_PEOPLE: UserProfile[] = [
  {
    id: 'person_sarah',
    name: 'Sarah Chen',
    role: 'student',
    headline: 'UX Designer & Visual Strategist',
    organizationOrSchool: 'UC Berkeley',
    bio: 'Bridging technical capabilities with delightful human experiences. Experienced in multi-platform design, micro-interactions, and usability testing.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    skills: ['UX Design', 'Figma', 'User Research', 'Design Systems', 'Prototyping'],
    lookingFor: ['Developer', 'Business Lead'],
    interests: ['AI', 'Education', 'Startups', 'Mental Health'],
    availability: 'Weekends & Evenings',
    location: 'San Francisco, CA',
    collaborationStyle: 'Builder',
    commitmentLevel: 'Highly Committed',
    preferredRole: 'Lead Designer',
    projectsCount: 3,
    achievements: ['🏆 Winner at Berkeley AI Design Sprint', '🎨 Designed 3 live iOS apps'],
    recentActivity: ['Explored new micro-interactions for learning apps'],
    compatibility: {
      overallPercentage: 92,
      sharedInterests: ['AI', 'Education', 'Startups'],
      complementarySkills: ['UX Design (Hers) + Backend & ML (Yours)'],
      similarAvailability: 'Both available Weekends & Evenings',
      sharedGoal: 'Hackathon & Early MVP Creation',
      preferredRole: 'Lead Designer & User Journey',
      preferredTeamSize: '3 to 5 builders',
      matchHighlights: [
        'Complementary skill balance: Backend + UX synergy',
        'Shared passion for AI-driven education tools',
        'Aligned weekend hackathon sprint cadence'
      ]
    }
  },
  {
    id: 'person_daniel',
    name: 'Daniel O’Connor',
    role: 'young_professional',
    headline: 'Backend & Cloud Infrastructure Engineer',
    organizationOrSchool: 'Tech Infrastructure Co.',
    bio: 'Specializing in high-throughput distributed systems, PostgreSQL, and Go. Looking for a weekend hackathon crew to build clean, impactful open-source tools.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    skills: ['Go', 'PostgreSQL', 'Docker', 'FastAPI', 'Kubernetes', 'Redis'],
    lookingFor: ['Frontend Engineer', 'Product Manager'],
    interests: ['FinTech', 'Climate', 'Developer Tools', 'Open Source'],
    availability: 'Weekends (~12 hrs)',
    location: 'Seattle, WA (Remote OK)',
    collaborationStyle: 'Builder',
    commitmentLevel: 'Highly Committed',
    preferredRole: 'Backend & Database Lead',
    projectsCount: 5,
    achievements: ['⚙️ Open source contributor with 1.5k GitHub stars', '🥈 AWS FinTech Finalist'],
    recentActivity: ['Published Go starter template for serverless'],
    compatibility: {
      overallPercentage: 88,
      sharedInterests: ['Climate', 'Developer Tools'],
      complementarySkills: ['Cloud Infrastructure + Product/AI modeling'],
      similarAvailability: 'Both available on Weekends',
      sharedGoal: 'Competitive Hackathon & Production MVP',
      preferredRole: 'Backend Lead',
      preferredTeamSize: '4 builders',
      matchHighlights: [
        'Robust engineering foundation for scalable backends',
        'Proven track record in 48-hour sprints',
        'Synchronized weekend work schedule'
      ]
    }
  },
  {
    id: 'person_priya',
    name: 'Priya Patel',
    role: 'student',
    headline: 'Mobile & Flutter / Kotlin Developer',
    organizationOrSchool: 'Georgia Tech',
    bio: 'Passionate Android and cross-platform developer. Love creating native-feeling mobile experiences with smooth animations and offline persistence.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    skills: ['Kotlin', 'Jetpack Compose', 'Flutter', 'Firebase', 'REST APIs'],
    lookingFor: ['AI Engineer', 'UI Designer'],
    interests: ['HealthTech', 'Education', 'Mobile Systems', 'Social Impact'],
    availability: 'Weekdays 6-9pm & Saturdays',
    location: 'Atlanta, GA (Remote)',
    collaborationStyle: 'Coordinator',
    commitmentLevel: 'Moderate',
    preferredRole: 'Mobile App Lead',
    projectsCount: 2,
    achievements: ['📱 Created campus navigation app with 4,000 active students'],
    recentActivity: ['Tested Jetpack Compose navigation animations'],
    compatibility: {
      overallPercentage: 84,
      sharedInterests: ['Education', 'Mobile Systems'],
      complementarySkills: ['Mobile Frontend + Your Python/ML skills'],
      similarAvailability: 'Overlaps on Saturdays',
      sharedGoal: 'Campus Hackathon submission',
      preferredRole: 'Android Lead',
      preferredTeamSize: '3–4 builders',
      matchHighlights: [
        'Extremely strong mobile execution speed',
        'Direct synergy between mobile client and AI APIs'
      ]
    }
  },
  {
    id: 'person_elena',
    name: 'Elena Rostova',
    role: 'young_professional',
    headline: 'Growth Marketer & Startup Business Lead',
    organizationOrSchool: 'Growth Catalyst Lab',
    bio: 'Bridging engineering excellence with market traction. Experience conducting user interviews, go-to-market strategies, and pitching to early-stage angel investors.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    skills: ['GTM Strategy', 'User Interviews', 'Pitch Decks', 'Product Analytics', 'B2B Sales'],
    lookingFor: ['Technical Builders', 'Hackathon Teams with MVP'],
    interests: ['Climate Tech', 'AI Tools', 'Circular Economy'],
    availability: 'Weekends',
    location: 'Austin, TX',
    collaborationStyle: 'Leader',
    commitmentLevel: 'Highly Committed',
    preferredRole: 'Business & Pitch Lead',
    projectsCount: 3,
    achievements: ['🎤 1st Place Pitch Winner at VentureSouth', '📈 Scaled student newsletter to 15k subs'],
    recentActivity: ['Interviewed 20 campus dining staff for food waste insights'],
    compatibility: {
      overallPercentage: 89,
      sharedInterests: ['Climate Tech', 'Startups'],
      complementarySkills: ['Business & Pitching + Your Engineering/Product'],
      similarAvailability: 'Weekends',
      sharedGoal: 'Startup Pitch & Hackathon Demo',
      preferredRole: 'Pitch & Business Strategy',
      preferredTeamSize: '4 builders',
      matchHighlights: [
        'Turns technical prototypes into high-scoring pitch presentations',
        'Strong validation and user interview capabilities'
      ]
    }
  }
];

export const PROJECTS_LIST: Project[] = [
  {
    id: 'proj_ecotrack',
    title: 'EcoTrack',
    tagline: 'Platform helping universities reduce food waste via dining hall logistics',
    description: 'EcoTrack connects campus dining halls with student food recovery volunteers and local food banks. Uses computer vision weighing stations and real-time alerts to predict food waste patterns and coordinate redistribution before spoilage occurs.',
    icon: '🌱',
    category: 'Climate & Sustainability',
    stage: 'Prototype',
    founder: {
      id: 'user_alex',
      name: 'Alex Haddad',
      role: 'Founder & AI Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isLeader: true
    },
    members: [
      {
        id: 'user_alex',
        name: 'Alex Haddad',
        role: 'Founder & AI Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        isLeader: true
      },
      {
        id: 'user_maya',
        name: 'Maya Lin',
        role: 'UX & Product Lead',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250'
      },
      {
        id: 'person_daniel',
        name: 'Daniel O’Connor',
        role: 'Backend Infrastructure',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
      }
    ],
    maxMembers: 5,
    lookingFor: ['Backend Developer', 'Marketing & Partnerships', 'Data Scientist'],
    tags: ['Sustainability', 'Computer Vision', 'Campus Tech', 'FastAPI'],
    resources: [
      { title: 'Project Specification v1.2', type: 'doc' },
      { title: 'GitHub Organization Repo', type: 'github' },
      { title: 'Figma UI Prototype Link', type: 'link' }
    ],
    milestones: [
      { name: 'Idea', completed: true },
      { name: 'Research', completed: true },
      { name: 'Prototype', completed: true, current: true },
      { name: 'MVP', completed: false },
      { name: 'Launch', completed: false }
    ],
    associatedCompetition: 'Global CleanTech Challenge 2026',
    likes: 42
  },
  {
    id: 'proj_visionbot',
    title: 'VisionBot Assist',
    tagline: 'Edge AI computer vision assistant for visually impaired university students',
    description: 'An open-source wearable camera adapter paired with a low-latency on-device multi-modal model to identify classroom slides, room numbers, and reading material in real time.',
    icon: '🤖',
    category: 'Assistive Tech & AI',
    stage: 'Research',
    founder: {
      id: 'person_alex',
      name: 'Alex Haddad',
      role: 'Hardware & ML',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isLeader: true
    },
    members: [
      {
        id: 'person_alex',
        name: 'Alex Haddad',
        role: 'ML & Architecture',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        isLeader: true
      },
      {
        id: 'person_priya',
        name: 'Priya Patel',
        role: 'Android Audio Client',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
      }
    ],
    maxMembers: 4,
    lookingFor: ['Embedded Systems Dev', 'Audio UX Designer'],
    tags: ['Edge AI', 'Accessibility', 'Jetpack Compose', 'ONNX'],
    resources: [
      { title: 'Hardware Bill of Materials', type: 'doc' },
      { title: 'Latency Benchmarks', type: 'doc' }
    ],
    milestones: [
      { name: 'Idea', completed: true },
      { name: 'Research', completed: true, current: true },
      { name: 'Prototype', completed: false },
      { name: 'MVP', completed: false },
      { name: 'Launch', completed: false }
    ],
    associatedCompetition: 'Accessibility Hackathon 2026',
    likes: 28
  },
  {
    id: 'proj_neurostudy',
    title: 'NeuroStudy AI',
    tagline: 'Multi-modal adaptive flashcards and study summarizer for neurodivergent learners',
    description: 'Converts chaotic lecture recordings and messy notebook sketches into visual mind maps, bite-sized quiz loops, and auditory recaps calibrated to user focus levels.',
    icon: '🧠',
    category: 'Education Tech',
    stage: 'MVP',
    founder: {
      id: 'person_sarah',
      name: 'Sarah Chen',
      role: 'Founder & UX',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isLeader: true
    },
    members: [
      {
        id: 'person_sarah',
        name: 'Sarah Chen',
        role: 'Founder & UX',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        isLeader: true
      },
      {
        id: 'user_marcus',
        name: 'Dr. Marcus Vance',
        role: 'Scientific Advisor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
      }
    ],
    maxMembers: 4,
    lookingFor: ['React Native Dev', 'Prompt Engineer', 'Speech Synthesis specialist'],
    tags: ['Education', 'Gemini AI', 'Accessibility', 'Mobile'],
    resources: [
      { title: 'User Testing Session Notes', type: 'doc' },
      { title: 'GitHub Repo', type: 'github' }
    ],
    milestones: [
      { name: 'Idea', completed: true },
      { name: 'Research', completed: true },
      { name: 'Prototype', completed: true },
      { name: 'MVP', completed: true, current: true },
      { name: 'Launch', completed: false }
    ],
    likes: 65
  }
];

export const TEAMS_LIST: TeamEntity[] = [
  {
    id: 'team_phoenix',
    name: 'Team Phoenix',
    emblem: '🔥',
    project: 'EcoTrack (Climate AI)',
    members: [
      { id: 'user_alex', name: 'Alex Haddad', role: 'Team Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250', isLeader: true },
      { id: 'user_maya', name: 'Maya Lin', role: 'Product & UX', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250' },
      { id: 'person_daniel', name: 'Daniel O’Connor', role: 'Cloud & Database', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250' },
      { id: 'person_elena', name: 'Elena Rostova', role: 'Business / Pitch', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250' }
    ],
    maxMembers: 5,
    goals: 'Win 1st place in the Global CleanTech Challenge and pilot at 2 campus dining halls this semester.',
    neededSkills: ['Data Scientist / ML', 'Mobile Integration'],
    meetingSchedule: 'Tuesdays 7pm PST (Async updates on Slack/TeamBuilders)',
    activeCompetition: 'Global CleanTech Challenge 2026'
  },
  {
    id: 'team_neurobuilders',
    name: 'NeuroBuilders',
    emblem: '⚡',
    project: 'NeuroStudy AI',
    members: [
      { id: 'person_sarah', name: 'Sarah Chen', role: 'Design Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250', isLeader: true },
      { id: 'user_marcus', name: 'Dr. Marcus Vance', role: 'Research Advisor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250' }
    ],
    maxMembers: 4,
    goals: 'Deliver high-accessibility test version to 50 university test participants before beta.',
    neededSkills: ['Mobile App Developer', 'Sound Designer'],
    meetingSchedule: 'Sundays 11am PST',
    activeCompetition: 'EduHacks 2026'
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    author: {
      id: 'user_alex',
      name: 'Alex Haddad',
      headline: 'Computer Science Student • EcoTrack Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      role: 'student'
    },
    category: 'building',
    title: 'We’ve built the first working barcode & weight scale prototype for EcoTrack! ⚖️',
    content: 'Big milestone today! We connected an ESP32 load sensor to our FastAPI backend to log excess cafeteria prep food in under 2 seconds. The biggest challenge was calibration drift when staff rush during closing shifts. Next step: testing the scanner in actual cafeteria lighting.',
    timestamp: '2 hours ago',
    likes: 24,
    hasLiked: true,
    tags: ['EcoTrack', 'Hardware', 'FastAPI', 'Prototype'],
    projectTag: 'EcoTrack',
    comments: [
      {
        id: 'c1',
        author: {
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
          headline: 'UX Designer'
        },
        content: 'Super exciting Alex! Let’s make sure the confirmation sound on the scanner gives immediate acoustic feedback so workers don’t have to stare at a screen.',
        timestamp: '1 hour ago'
      },
      {
        id: 'c2',
        author: {
          name: 'Dr. Marcus Vance',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
          headline: 'Principal AI Mentor'
        },
        content: 'Well done team. Make sure to log variance data across ambient temperatures if this is located near industrial dishwashers.',
        timestamp: '30 mins ago'
      }
    ]
  },
  {
    id: 'post_2',
    author: {
      id: 'person_sarah',
      name: 'Sarah Chen',
      headline: 'UX Designer • NeuroStudy Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      role: 'student'
    },
    category: 'idea',
    title: 'Idea: What if team formation matched work styles rather than just tech stacks? 💡',
    content: 'Every hackathon team I have seen fail did not fail because someone lacked React or Python skills. They failed because three people wanted to sprint 24 hours straight without sleep while two wanted structured 9am-5pm async work. TeamBuilders should weight circadian rhythm and communication style heavily!',
    timestamp: '4 hours ago',
    likes: 58,
    tags: ['TeamDynamics', 'MatchingAlgorithm', 'HackathonCulture'],
    comments: [
      {
        id: 'c3',
        author: {
          name: 'Daniel O’Connor',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
          headline: 'Backend Engineer'
        },
        content: '100% this. In industry we call it operational cadence matching. Would prevent so much burnout.',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'post_3',
    author: {
      id: 'person_daniel',
      name: 'Daniel O’Connor',
      headline: 'Backend Engineer • Cloud Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      role: 'young_professional'
    },
    category: 'failure',
    title: 'Our approach didn’t work: Why real-time WebSocket syncing failed on campus Wi-Fi ❌',
    content: 'Post-mortem on our first cafeteria sync test: University eduroam network aggressively throttled idle WebSocket connections after 30 seconds of inactivity. We spent 6 hours debugging disconnects. Solution: switched to HTTP/2 SSE with exponential backoff and local SQLite queueing. Learn from our pain!',
    timestamp: 'Yesterday',
    likes: 83,
    tags: ['PostMortem', 'Networking', 'WebSockets', 'FailureLessons'],
    comments: [
      {
        id: 'c4',
        author: {
          name: 'Priya Patel',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
          headline: 'Android Engineer'
        },
        content: 'Eduroam is notoriously hostile to sustained sockets. Great pivot with local caching!',
        timestamp: '18 hours ago'
      }
    ]
  },
  {
    id: 'post_4',
    author: {
      id: 'person_priya',
      name: 'Priya Patel',
      headline: 'Android & Kotlin Specialist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
      role: 'student'
    },
    category: 'need_help',
    title: 'Does anyone know the best way to handle real-time edge bounding box rendering in Jetpack Compose? 🆘',
    content: 'We are processing 15 FPS video from a USB OTG camera on Android. Drawing bounding boxes on the standard Canvas causes micro-stutters during GC pauses. Has anyone implemented TextureView overlay or Skia shader acceleration for live AI inference overlays?',
    timestamp: 'Yesterday',
    likes: 19,
    tags: ['Android', 'JetpackCompose', 'ComputerVision', 'Performance'],
    comments: []
  },
  {
    id: 'post_5',
    author: {
      id: 'person_elena',
      name: 'Elena Rostova',
      headline: 'Startup Strategist & Pitch Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      role: 'young_professional'
    },
    category: 'achievement',
    title: 'We made it to the Top 10 Finals of the CleanTech University Challenge! 🎉',
    content: 'Huge shoutout to the EcoTrack crew (Alex, Maya, Daniel). Out of 140 team submissions, the judges loved our real-world dining hall pilot metric (reduced pre-consumer waste by 22% in our 1-week test). Final demo day is in 3 weeks!',
    timestamp: '2 days ago',
    likes: 92,
    hasLiked: true,
    tags: ['CleanTech', 'Finals', 'EcoTrack', 'Milestone'],
    projectTag: 'EcoTrack',
    comments: []
  },
  {
    id: 'post_6',
    author: {
      id: 'sponsor_google',
      name: 'Google AI Student Guild',
      headline: 'Hackathon Partner & Innovation Ecosystem',
      avatar: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=250',
      role: 'sponsor'
    },
    category: 'competition',
    title: 'Google AI Global Hackathon 2026 is officially open for registration! 🏆',
    content: 'Calling all student and young professional teams building with multi-modal AI, agentic workflows, and sustainability! Over $50,000 in prizes, direct mentorship from Google AI engineers, and Cloud Run credits for all verified teams on TeamBuilders.',
    timestamp: '3 days ago',
    likes: 145,
    tags: ['GoogleAI', 'Hackathon2026', 'Prizes', 'Mentorship'],
    comments: []
  },
  {
    id: 'post_7',
    author: {
      id: 'user_maya',
      name: 'Maya Lin',
      headline: 'Product Designer • Figma Fellow',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
      role: 'young_professional'
    },
    category: 'opportunity',
    title: 'Looking for 1 Data Scientist / ML Engineer to join Team Phoenix for CleanTech Finals 📢',
    content: 'We need someone who loves time-series demand forecasting and anomaly detection. Our hardware logs campus meal prep weights; we need you to build the model predicting when surplus batches will exceed dining room demand. Weekends + ~6 hrs/week.',
    timestamp: '3 days ago',
    likes: 31,
    tags: ['TeammateSearch', 'DataScience', 'CleanTech', 'TeamPhoenix'],
    projectTag: 'EcoTrack',
    comments: []
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_sarah',
    type: 'direct',
    name: 'Sarah Chen',
    subtitle: 'UX Designer • 92% Compatibility',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    lastMessage: 'I checked the EcoTrack prototype deck, looks super clean!',
    lastMessageTime: '10:24 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'person_sarah',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        text: 'Hey Alex! I saw your EcoTrack project on the Discover feed. The 92% compatibility match caught my attention!',
        timestamp: '10:15 AM',
        isMe: false
      },
      {
        id: 'm2',
        senderId: 'user_alex',
        senderName: 'Alex Haddad',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        text: 'Hey Sarah! Thanks for reaching out. We saw your portfolio on AI UX research. Our team definitely needs your design vision for the kitchen scale interface.',
        timestamp: '10:20 AM',
        isMe: true
      },
      {
        id: 'm3',
        senderId: 'person_sarah',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        text: 'I checked the EcoTrack prototype deck, looks super clean! Would love to jump on a quick 15-min sync this Saturday to brainstorm.',
        timestamp: '10:24 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv_team_phoenix',
    type: 'team',
    name: 'Team Phoenix (EcoTrack)',
    subtitle: '4 members active',
    avatar: '🔥',
    lastMessage: 'Daniel: Pushed the new SSE endpoints to staging.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    membersCount: 4,
    messages: [
      {
        id: 'tm1',
        senderId: 'person_daniel',
        senderName: 'Daniel O’Connor',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
        text: 'Hey all, staging server is up. Pushed the new SSE endpoints to staging so we can test live weight streams.',
        timestamp: 'Yesterday 3:14 PM',
        isMe: false
      },
      {
        id: 'tm2',
        senderId: 'user_maya',
        senderName: 'Maya Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
        text: 'Figma flows updated with the zero-latency audio cues! Ready for testing.',
        timestamp: 'Yesterday 4:02 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'conv_marcus',
    type: 'direct',
    name: 'Dr. Marcus Vance',
    subtitle: 'AI Research Mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    lastMessage: 'Office hours this Sunday at 2 PM if you want pitch deck review.',
    lastMessageTime: 'Sep 15',
    unreadCount: 0,
    messages: [
      {
        id: 'mm1',
        senderId: 'user_marcus',
        senderName: 'Dr. Marcus Vance',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        text: 'Alex, impressive progress on the EcoTrack pilot metrics. Office hours this Sunday at 2 PM if you want pitch deck review before the CleanTech finals.',
        timestamp: 'Sep 15 11:30 AM',
        isMe: false
      }
    ]
  }
];
