export interface AiMatchResult {
  aiSummary: string;
  matches: {
    name: string;
    role: string;
    compatibility: number;
    reason: string;
    keySkillSynergy: string;
  }[];
  fallback?: boolean;
}

export interface AiAssistantResult {
  reply: string;
  suggestedTasks: string[];
  fallback?: boolean;
}

export async function queryAiTeamMatcher(query: string, userContext?: any): Promise<AiMatchResult> {
  try {
    const res = await fetch('/api/gemini/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, userContext }),
    });
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('AI Matcher fallback triggered:', err);
    return {
      aiSummary: 'Compatibility match identified 3 high-synergy team roles for weekend execution.',
      matches: [
        {
          name: 'Sarah Chen',
          role: 'UX Designer & Prototyper',
          compatibility: 92,
          reason: 'Brings high-polish user journey and Figma execution that pairs directly with your FastAPI and ML backend.',
          keySkillSynergy: 'UX Design + Machine Learning'
        },
        {
          name: "Daniel O'Connor",
          role: 'Cloud & Systems Engineer',
          compatibility: 88,
          reason: 'Specializes in low-latency infrastructure and offline-first data sync so your prototype handles hackathon judging reliably.',
          keySkillSynergy: 'Distributed Systems + Python'
        },
        {
          name: 'Elena Rostova',
          role: 'GTM & Pitch Lead',
          compatibility: 89,
          reason: 'Helps translate complex technology into an award-winning 3-minute hackathon pitch with proven judge appeal.',
          keySkillSynergy: 'Storytelling & Product Metrics + Technical Execution'
        }
      ],
      fallback: true
    };
  }
}

export async function askAiProjectAssistant(
  message: string,
  projectTitle: string,
  currentStage: string,
  actionType: string = 'general advice'
): Promise<AiAssistantResult> {
  try {
    const res = await fetch('/api/gemini/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, projectTitle, currentStage, actionType }),
    });
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('AI Assistant fallback triggered:', err);
    return {
      reply: `Actionable strategy for **${projectTitle}** at **${currentStage}**:
- **Focus on the Core Loop**: Build only what is needed to prove your unique insight.
- **Async Communication**: Set up daily 5-minute Slack or TeamBuilders check-ins to prevent duplicated effort.
- **Milestone Validation**: Demo your prototype to 3 students or mentors before building secondary features.`,
      suggestedTasks: [
        'Document the 3 main user clicks from login to value',
        'Schedule a 15-minute feedback session with a mentor',
        'Prepare 1-minute elevator pitch video demo'
      ],
      fallback: true
    };
  }
}
