import { z } from "zod";
import { ai } from "../lib/ai.js";
export const goalAnalysisInputSchema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().max(2000).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    targetDate: z.string().optional(),
});
export const goalAnalysisOutputSchema = z.object({
    analysis: z.object({
        summary: z.string(),
        difficulty: z.enum(["LOW", "MEDIUM", "HIGH"]),
        estimatedWeeks: z.number().int().positive(),
        clarityScore: z.number().int().min(1).max(10),
        keyAreas: z.array(z.string()),
    }),
    suggestedTasks: z.array(z.object({
        title: z.string(),
        description: z.string(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        estimatedMinutes: z.number().int().positive(),
    })),
});
export const goalAnalysisJsonSchema = {
    type: "object",
    properties: {
        analysis: {
            type: "object",
            properties: {
                summary: {
                    type: "string",
                },
                difficulty: {
                    type: "string",
                    enum: ["LOW", "MEDIUM", "HIGH"],
                },
                estimatedWeeks: {
                    type: "integer",
                },
                clarityScore: {
                    type: "integer",
                    minimum: 1,
                    maximum: 10,
                },
                keyAreas: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                },
            },
            required: [
                "summary",
                "difficulty",
                'estimatedWeeks',
                "clarityScore",
                "keyAreas",
            ],
        },
        suggestedTasks: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    priority: {
                        type: "string",
                        enum: ["LOW", "MEDIUM", "HIGH"],
                    },
                    estimatedMinutes: {
                        type: "integer",
                    },
                },
                required: [
                    "title",
                    "description",
                    "priority",
                    "estimatedMinutes",
                ],
            },
        },
    },
    required: ["analysis", "suggestedTasks"],
};
export async function analyzeGoal(input) {
    const prompt = `
Analyze the user's goal and create a realistic planning proposal.

Goal:
Title: ${input.title}

Description:
${input.description ?? "No description provided."}

Priority:
${input.priority}

Target date:
${input.targetDate ?? "No target date provided."}

Your job is to:
1. Evaluate how clear the goal is.
2. Estimate its difficulty.
3. Estimate a realistic duration in weeks.
4. Identify the key areas required to achieve it.
5. Propose concrete tasks that can help the user move toward the goal.

Important:
- Do not assume the user has unlimited time.
- Tasks should be actionable.
- Do not create vague tasks.
- Prefer tasks that produce a concrete outcome.
- Do not claim that completing these tasks guarantees success.
- Suggested tasks are proposals that the user will review before becoming actual tasks.
`;
    const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        system_instruction: `
You are Decisa's goal planning assistant.

Your role is to analyze goals and propose realistic next actions.

You are NOT an autonomous task manager.
You must never assume that your suggestions should automatically be executed.

Your output must follow the provided JSON schema exactly.
`,
        input: prompt,
        response_format: {
            type: "text",
            mime_type: "application/json",
            schema: goalAnalysisJsonSchema,
        },
    });
    const rawOutput = interaction.output_text;
    if (!rawOutput) {
        throw new Error("Gemini returned an empty response");
    }
    const parsed = JSON.parse(rawOutput);
    return goalAnalysisOutputSchema.parse(parsed);
}
