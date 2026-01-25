export interface Metrics {
  id: string;               // UUID
  submissionId: string;     // Linked to submissions.id
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  recordedAt: string;       // ISO date string
}
