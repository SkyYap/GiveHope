export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  category: Category;
  fundingGoal: number;
  currentFunding: number;
  backers: number;
  timeRemaining: number;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  status: 'active' | 'funded' | 'ended';
  featured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  value: number;
}

export interface InvestmentTier {
  id: string;
  title: string;
  description: string;
  minAmount: number;
  rewards: string[];
  available: number;
  claimed: number;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  fundingRequired: number;
}