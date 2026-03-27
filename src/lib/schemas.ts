import { z } from "zod";

export const appModeSchema = z.enum(["reply", "rewrite", "decision"]);
export const riskLevelSchema = z.enum(["low", "medium", "high"]);
export const toneCategorySchema = z.enum([
  "diplomatic",
  "professional",
  "warm",
  "assertive",
  "direct",
  "bold",
  "aggressive",
]);
export const relationshipPrioritySchema = z.enum([
  "preserve",
  "neutral",
  "assertive",
]);

export const strategyOptionSchema = z.object({
  id: z.string(),
  tone: toneCategorySchema,
  riskLevel: riskLevelSchema,
  responseText: z.string(),
  explanation: z.string(),
  bestUseCase: z.string(),
  predictedOutcome: z.string().optional(),
  recommended: z.boolean().optional(),
  confidence: z.number().optional(),
});

export const aiResponsePayloadSchema = z.object({
  options: z.array(strategyOptionSchema),
});

export const generateRequestSchema = z.object({
  mode: appModeSchema,
  context: z.string(),
  goal: z.string().optional(),
  relationshipPriority: relationshipPrioritySchema.optional(),
});
