import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "TeamBuilders" });
  });

  // API Route: AI Team Matcher
  app.post("/api/gemini/match", async (req, res) => {
    const { query, userContext } = req.body;
    try {
      const ai = getGeminiClient();
      if (!ai) {
        // High quality heuristic fallback if API key is not configured yet
        return res.json({
          fallback: true,
          matches: [
            {
              name: "Sarah Chen",
              role: "UX Designer",
              compatibility: 92,
              reason: "Sarah brings high-fidelity UX prototyping and user journey research that perfectly complements your technical backend & AI skills. Both available weekends.",
              keySkillSynergy: "Design Systems + FastAPI/ML Integration"
            },
            {
              name: "Daniel O'Connor",
              role: "Backend & Cloud Engineer",
              compatibility: 88,
              reason: "Daniel has deep expertise in distributed data queues and high-throughput systems, ensuring your hackathon prototype doesn't break under judge testing.",
              keySkillSynergy: "PostgreSQL & Docker + Machine Learning"
            },
            {
              name: "Elena Rostova",
              role: "Startup Pitch & Business Lead",
              compatibility: 89,
              reason: "Elena has won university pitch competitions and knows how to frame technical prototypes into compelling investor and hackathon judging stories.",
              keySkillSynergy: "GTM Strategy & User Metrics + Technical Prototype"
            }
          ],
          aiSummary: "Found 3 optimal teammates based on complementary technical roles (UX + Systems + Pitch) and weekend sprint availability."
        });
      }

      const prompt = `You are TeamBuilders AI Team Matcher.
A user asked: "${query || "Find me 3 people who complement my skills for an AI hackathon"}"
User context: ${JSON.stringify(userContext || { role: "student", skills: ["Python", "React", "ML"] })}

Suggest 3 complementary teammate archetypes/people with realistic names, roles, estimated compatibility score (80-96%), clear reasons why they complement each other, and the key skill synergy.
Respond in valid JSON format matching this schema:
{
  "aiSummary": "1-2 sentence overview of the matching strategy",
  "matches": [
    {
      "name": "Full Name",
      "role": "Title / Skillset",
      "compatibility": 92,
      "reason": "Why they fit",
      "keySkillSynergy": "e.g. Backend + UX"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      res.json(parsed);
    } catch (err: any) {
      console.error("Gemini Match error:", err?.message);
      res.status(500).json({ error: "Failed to run AI matching", details: err?.message });
    }
  });

  // API Route: AI Project Assistant / Mentor
  app.post("/api/gemini/assistant", async (req, res) => {
    const { message, projectTitle, currentStage, actionType } = req.body;
    try {
      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          fallback: true,
          reply: `Here is actionable guidance for **${projectTitle || "your project"}** at the **${currentStage || "Prototype"}** stage:
1. **Define the 1 Hero Interaction**: Don't try to build every feature. Identify the single test that demonstrates your unfair advantage (e.g. 2-second QR load scan).
2. **Missing Skills Check**: If you're missing a designer or backend lead, use TeamBuilders's Discover tab to connect with weekend builders.
3. **Judge/Mentor Question Prep**: Anticipate the question: "Why hasn't someone done this before, and what happens if your network fails?"`,
          suggestedTasks: [
            "Conduct 5 quick user walk-throughs with target users",
            "Prepare a 90-second loom or live prototype demo script",
            "Define fallback offline state for all API endpoints"
          ]
        });
      }

      const prompt = `You are TeamBuilders AI Project Assistant & Mentor.
The user is working on "${projectTitle || "a collaborative project"}" at stage "${currentStage || "Prototype"}".
Action requested: "${actionType || "general advice"}"
User query: "${message}"

Give structured, highly practical, and encouraging advice for student and young professional builders. Include 3 specific next step tasks.
Format your output in clean JSON:
{
  "reply": "Markdown formatted friendly response with clear bullets",
  "suggestedTasks": ["Task 1", "Task 2", "Task 3"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (err: any) {
      console.error("Gemini Assistant error:", err?.message);
      res.status(500).json({ error: "Failed to generate AI advice", details: err?.message });
    }
  });

  // Vite middleware in dev; static in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TeamBuilders server running on http://localhost:${PORT}`);
  });
}

startServer();
