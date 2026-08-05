import { argusStore } from '../lib/store';

export const ReportGeneratorService = {
  generateCaseBrief: () => ({
    caseId: argusStore.caseId,
    riskScore: argusStore.overallRiskScore,
    evidenceCount: argusStore.evidence.length,
    hypothesesCount: argusStore.hypotheses.length
  })
};
