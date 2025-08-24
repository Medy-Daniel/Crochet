export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  subscriptionTier: 'free' | 'premium';
  level: UserLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLevel {
  level: number;
  name: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  xp: number;
  nextLevelXp: number;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  type: 'crochet' | 'tricot';
  targetRows: number;
  currentRow: number;
  notes?: string;
  pattern?: string;
  images?: string[];
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'débutant' | 'intermédiaire' | 'avancé';
  type: 'crochet' | 'tricot';
  videoUrl?: string;
  thumbnailUrl: string;
  steps: TutorialStep[];
  isPremium: boolean;
  duration: number;
  tags: string[];
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  order: number;
}

export interface UserProgress {
  id: string;
  userId: string;
  tutorialId: string;
  completedSteps: string[];
  isCompleted: boolean;
  lastAccessedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
}

export type NavigationStackParams = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  ProjectDetail: { projectId: string };
  RowCounter: { projectId: string };
  Profile: undefined;
  TutorialList: undefined;
  TutorialDetail: { tutorialId: string };
  Settings: undefined;
};