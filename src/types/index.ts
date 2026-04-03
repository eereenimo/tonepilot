export type AppMode = "reply" | "rewrite" | "decision";
export type RiskLevel = "low" | "medium" | "high";
export type ToneCategory =
  | "diplomatic"
  | "professional"
  | "warm"
  | "assertive"
  | "direct"
  | "bold"
  | "aggressive";
export type RelationshipPriority = "preserve" | "neutral" | "assertive";

export interface StrategyOption {
  id: string;
  tone: ToneCategory;
  riskLevel: RiskLevel;
  responseText: string;
  explanation: string;
  bestUseCase: string;
  predictedOutcome?: string;
  recommended?: boolean;
  confidence?: number;
}

export interface AIResponsePayload {
  options: StrategyOption[];
}

export interface HistoryItem {
  id: string;
  originalText: string;
  generatedText: string;
  tone: string;
  createdAt: number;
}
