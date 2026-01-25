export interface Campaign {
  id: string;               // UUID
  title: string;            // Campaign title
  description: string;      // Campaign description
  startDate: string;        // ISO date string
  endDate: string;          // ISO date string
  createdAt: string;        // ISO date string
  updatedAt?: string;       // ISO date string, optional
}
