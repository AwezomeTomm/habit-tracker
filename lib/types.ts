export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customFrequency?: number; // for custom frequency (e.g., every 3 days)
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  userId: string;
  date: Date;
  completed: boolean;
  notes?: string;
  createdAt: Date;
}

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  totalEntries: number;
  completedEntries: number;
}

export interface Comment {
  id: string;
  habitId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Cheer {
  id: string;
  habitId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export interface CommunityReaction {
  id: string;
  habitEntryId: string;
  userId: string;
  type: 'cheer' | 'comment';
  content?: string; // for comments
  createdAt: Date;
}

export interface HabitTemplate {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customFrequency?: number;
  category: string;
  isPopular: boolean;
}

export type HabitFrequency = 'daily' | 'weekly' | 'custom';
export type HabitVisibility = 'private' | 'community';

