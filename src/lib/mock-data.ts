import { AIResponsePayload } from "../types";

export const mockResponsePayload: AIResponsePayload = {
  options: [
    {
      id: "opt_1",
      tone: "diplomatic",
      riskLevel: "low",
      responseText:
        "Thank you for sharing your concerns. I understand we have different perspectives on this issue, and I'd love to schedule a quick call to find a mutually beneficial solution.",
      explanation:
        "This response acknowledges the other party's feelings while keeping the door open for productive dialogue without conceding your position.",
      bestUseCase:
        "When dealing with an upset client or a sensitive internal stakeholder where maintaining the relationship is paramount.",
      predictedOutcome:
        "De-escalation of tension and an agreement to discuss further.",
      confidence: 0.92,
    },
    {
      id: "opt_2",
      tone: "professional",
      riskLevel: "low",
      responseText:
        "I have reviewed your feedback. While I appreciate your viewpoint, we need to adhere to the agreed-upon project scope to meet our deadlines. Let me know if you would like to discuss a change request.",
      explanation:
        "A neutral, facts-based approach that enforces boundaries respectfully.",
      bestUseCase:
        "When a vendor or client pushes for out-of-scope work and you need to hold the line professionally.",
      predictedOutcome:
        "The recipient will likely accept the boundary or initiate a formal change process.",
      recommended: true,
      confidence: 0.88,
    },
    {
      id: "opt_3",
      tone: "assertive",
      riskLevel: "medium",
      responseText:
        "We cannot accommodate this request at this time, as it falls outside our current agreement. We must focus on the primary deliverables. I am happy to revisit this once Phase 1 is complete.",
      explanation:
        "Directly denies the request while remaining polite but firm about priorities.",
      bestUseCase:
        "When you've already politely declined once and the other party continues to press the issue.",
      predictedOutcome:
        "Clear mutual understanding of boundaries, though it may cause minor short-term friction.",
      confidence: 0.85,
    },
    {
      id: "opt_4",
      tone: "direct",
      riskLevel: "high",
      responseText:
        "No, we will not be moving forward with this approach. It introduces unnecessary risk and deviates from our core strategy. Please proceed with the original plan.",
      explanation:
        "A blunt and unequivocal rejection that leaves no room for misinterpretation.",
      bestUseCase:
        "When leading a team through a critical juncture and a proposed idea threatens project stability.",
      predictedOutcome:
        "Immediate cessation of the alternate approach; requires strong existing authority to avoid damaging the relationship.",
      confidence: 0.75,
    },
  ],
};
