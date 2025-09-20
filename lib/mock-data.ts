import type { User, Habit, HabitEntry, HabitTemplate, Comment, Cheer } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alex_habits',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Building better habits one day at a time!',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    username: 'sarah_wellness',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness enthusiast and habit tracker',
    createdAt: new Date('2024-01-15'),
  },
];

export const mockHabits: Habit[] = [
  {
    id: '1',
    userId: '1',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    frequency: 'daily',
    isPrivate: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    archived: false,
  },
  {
    id: '2',
    userId: '1',
    name: 'Morning meditation',
    description: '10 minutes of mindfulness meditation',
    frequency: 'daily',
    isPrivate: false,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    archived: false,
  },
  {
    id: '3',
    userId: '1',
    name: 'Read for 30 minutes',
    description: 'Read books to expand knowledge',
    frequency: 'daily',
    isPrivate: false,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    archived: false,
  },
  {
    id: '4',
    userId: '2',
    name: 'Daily workout',
    description: 'Exercise for at least 30 minutes',
    frequency: 'daily',
    isPrivate: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    archived: false,
  },
];

// Generate recent dates for better demo
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
const threeDaysAgo = new Date(today);
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
const fourDaysAgo = new Date(today);
fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
const fiveDaysAgo = new Date(today);
fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
const sixDaysAgo = new Date(today);
sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

export const mockHabitEntries: HabitEntry[] = [
  // Water habit entries (last 7 days)
  { id: '1', habitId: '1', userId: '1', date: today, completed: true, createdAt: today },
  { id: '2', habitId: '1', userId: '1', date: yesterday, completed: true, createdAt: yesterday },
  { id: '3', habitId: '1', userId: '1', date: twoDaysAgo, completed: true, createdAt: twoDaysAgo },
  { id: '4', habitId: '1', userId: '1', date: threeDaysAgo, completed: false, createdAt: threeDaysAgo },
  { id: '5', habitId: '1', userId: '1', date: fourDaysAgo, completed: true, createdAt: fourDaysAgo },
  { id: '6', habitId: '1', userId: '1', date: fiveDaysAgo, completed: true, createdAt: fiveDaysAgo },
  { id: '7', habitId: '1', userId: '1', date: sixDaysAgo, completed: true, createdAt: sixDaysAgo },
  
  // Meditation habit entries
  { id: '8', habitId: '2', userId: '1', date: today, completed: true, createdAt: today },
  { id: '9', habitId: '2', userId: '1', date: yesterday, completed: true, createdAt: yesterday },
  { id: '10', habitId: '2', userId: '1', date: twoDaysAgo, completed: true, createdAt: twoDaysAgo },
  { id: '11', habitId: '2', userId: '1', date: threeDaysAgo, completed: true, createdAt: threeDaysAgo },
  { id: '12', habitId: '2', userId: '1', date: fourDaysAgo, completed: true, createdAt: fourDaysAgo },
  
  // Reading habit entries
  { id: '13', habitId: '3', userId: '1', date: today, completed: true, createdAt: today },
  { id: '14', habitId: '3', userId: '1', date: yesterday, completed: false, createdAt: yesterday },
  { id: '15', habitId: '3', userId: '1', date: twoDaysAgo, completed: true, createdAt: twoDaysAgo },
  
  // Sarah's workout entries
  { id: '16', habitId: '4', userId: '2', date: today, completed: true, createdAt: today },
  { id: '17', habitId: '4', userId: '2', date: yesterday, completed: true, createdAt: yesterday },
  { id: '18', habitId: '4', userId: '2', date: twoDaysAgo, completed: true, createdAt: twoDaysAgo },
];

export const mockHabitTemplates: HabitTemplate[] = [
  {
    id: '1',
    name: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    frequency: 'daily',
    category: 'Health',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Morning meditation',
    description: 'Start your day with mindfulness',
    frequency: 'daily',
    category: 'Mindfulness',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Read for 30 minutes',
    description: 'Expand your knowledge through reading',
    frequency: 'daily',
    category: 'Learning',
    isPopular: true,
  },
  {
    id: '4',
    name: 'Exercise for 30 minutes',
    description: 'Stay active and healthy',
    frequency: 'daily',
    category: 'Fitness',
    isPopular: true,
  },
  {
    id: '5',
    name: 'Write in journal',
    description: 'Reflect on your day and thoughts',
    frequency: 'daily',
    category: 'Self-reflection',
    isPopular: false,
  },
  {
    id: '6',
    name: 'Practice gratitude',
    description: 'Write down 3 things you\'re grateful for',
    frequency: 'daily',
    category: 'Mindfulness',
    isPopular: false,
  },
];

// Mock comments data
export const mockComments: Comment[] = [
  {
    id: '1',
    habitId: '2', // Morning meditation
    userId: '2', // Sarah
    content: 'Great job on the meditation streak! 🧘‍♀️ I love how consistent you are!',
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    habitId: '2', // Morning meditation
    userId: '1', // Alex (self-comment)
    content: 'Thanks! It\'s been really helping with my focus throughout the day.',
    createdAt: new Date('2024-01-15T11:00:00'),
  },
  {
    id: '3',
    habitId: '3', // Reading
    userId: '2', // Sarah
    content: 'What book are you reading? I\'m always looking for recommendations! 📚',
    createdAt: new Date('2024-01-16T14:20:00'),
  },
  {
    id: '4',
    habitId: '4', // Daily workout
    userId: '1', // Alex
    content: 'Your workout consistency is inspiring! 💪 What\'s your favorite exercise?',
    createdAt: new Date('2024-01-16T16:45:00'),
  },
];

// Mock cheers data
export const mockCheers: Cheer[] = [
  {
    id: '1',
    habitId: '2', // Morning meditation
    userId: '2', // Sarah
    emoji: '🔥',
    createdAt: new Date('2024-01-15T10:25:00'),
  },
  {
    id: '2',
    habitId: '2', // Morning meditation
    userId: '1', // Alex (self-cheer)
    emoji: '🌟',
    createdAt: new Date('2024-01-15T10:26:00'),
  },
  {
    id: '3',
    habitId: '3', // Reading
    userId: '2', // Sarah
    emoji: '📚',
    createdAt: new Date('2024-01-16T14:15:00'),
  },
  {
    id: '4',
    habitId: '4', // Daily workout
    userId: '1', // Alex
    emoji: '💪',
    createdAt: new Date('2024-01-16T16:40:00'),
  },
  {
    id: '5',
    habitId: '4', // Daily workout
    userId: '2', // Sarah
    emoji: '🏋️‍♀️',
    createdAt: new Date('2024-01-16T17:00:00'),
  },
];

