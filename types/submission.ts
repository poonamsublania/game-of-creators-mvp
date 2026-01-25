export interface Submission {
  id: string;               // UUID
  creatorId: string;        // Linked to creator_accounts.id
  postId: string;           // Post ID from LinkedIn or TikTok
  platform: 'linkedin' | 'tiktok';
  postUrl: string;          // Full post URL
  submittedAt: string;      // ISO date string
}
