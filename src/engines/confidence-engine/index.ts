import { Hypothesis, ClueItem } from '@/types';

export interface ConfidenceDecayResult {
  hypothesisId: string;
  originalScore: number;
  decayedScore: number;
  decayFactor: number;
  evidenceBonus: number;
  lastUpdated: string;
  reasoning: string;
}

export const ConfidenceEngine = {
  /**
   * Dynamically recalculates confidence score based on time elapsed and newly added evidence items.
   * Decay formula: Base Score * e^(-decayFactor * daysElapsed) + Evidence Weight Bonus
   */
  calculateScore: (hypothesis: Hypothesis, supportingClues: ClueItem[]): ConfidenceDecayResult => {
    const now = new Date();
    const createdDate = new Date(hypothesis.lastUpdated || now.toISOString());
    const hoursElapsed = Math.max(0, (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
    
    // Time decay rate: 0.25% per 24 hours elapsed without new corroborating evidence
    const decayRate = 0.0025;
    const timeDecayMultiplier = Math.max(0.65, Math.exp(-decayRate * hoursElapsed));

    // Calculate evidence weight bonus from supporting clues
    const evidenceBonus = supportingClues.reduce((sum, clue) => {
      const reliabilityMultiplier = clue.riskLevel === 'CRITICAL' ? 3.5 : clue.riskLevel === 'HIGH' ? 2.5 : 1.2;
      return sum + (clue.confidenceScore * 0.05 * reliabilityMultiplier);
    }, 0);

    const rawCalculatedScore = (hypothesis.confidence * timeDecayMultiplier) + evidenceBonus;
    const finalScore = Math.min(99, Math.max(15, Math.round(rawCalculatedScore)));

    return {
      hypothesisId: hypothesis.id,
      originalScore: hypothesis.confidence,
      decayedScore: finalScore,
      decayFactor: parseFloat((1 - timeDecayMultiplier).toFixed(4)),
      evidenceBonus: parseFloat(evidenceBonus.toFixed(2)),
      lastUpdated: now.toISOString().replace('T', ' ').substring(0, 19),
      reasoning: `${hoursElapsed.toFixed(1)}h elapsed (${(1 - timeDecayMultiplier).toFixed(3)} decay) with ${supportingClues.length} corroborating clues (+${evidenceBonus.toFixed(1)} bonus).`
    };
  }
};
