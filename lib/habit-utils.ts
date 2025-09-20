import { format, isSameDay, differenceInDays, startOfDay, endOfDay } from 'date-fns';
import type { Habit, HabitEntry, HabitStats } from './types';

export function calculateStreak(entries: HabitEntry[], habit: Habit): number {
  if (entries.length === 0) return 0;
  
  // Sort entries by date (most recent first)
  const sortedEntries = entries
    .filter(entry => entry.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedEntries.length === 0) return 0;
  
  let streak = 0;
  let currentDate = startOfDay(new Date());
  
  for (const entry of sortedEntries) {
    const entryDate = startOfDay(new Date(entry.date));
    
    if (isSameDay(entryDate, currentDate) || 
        differenceInDays(currentDate, entryDate) === streak) {
      streak++;
      currentDate = entryDate;
    } else {
      break;
    }
  }
  
  return streak;
}

export function calculateLongestStreak(entries: HabitEntry[]): number {
  if (entries.length === 0) return 0;
  
  const completedEntries = entries
    .filter(entry => entry.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (completedEntries.length === 0) return 0;
  
  let longestStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < completedEntries.length; i++) {
    const prevDate = startOfDay(new Date(completedEntries[i - 1].date));
    const currDate = startOfDay(new Date(completedEntries[i].date));
    const daysDiff = differenceInDays(currDate, prevDate);
    
    if (daysDiff === 1) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  
  return Math.max(longestStreak, currentStreak);
}

export function calculateCompletionRate(entries: HabitEntry[]): number {
  if (entries.length === 0) return 0;
  
  const completedCount = entries.filter(entry => entry.completed).length;
  return Math.round((completedCount / entries.length) * 100);
}

export function getHabitStats(habit: Habit, entries: HabitEntry[]): HabitStats {
  const completedEntries = entries.filter(entry => entry.completed);
  
  return {
    habitId: habit.id,
    currentStreak: calculateStreak(entries, habit),
    longestStreak: calculateLongestStreak(entries),
    completionRate: calculateCompletionRate(entries),
    totalEntries: entries.length,
    completedEntries: completedEntries.length,
  };
}

export function shouldShowHabitToday(habit: Habit): boolean {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  switch (habit.frequency) {
    case 'daily':
      return true;
    case 'weekly':
      // For weekly habits, we'll assume they should be done on specific days
      // This is a simplified version - you might want to add a specific day field
      return true;
    case 'custom':
      // For custom frequency, you'd need to track the last completion date
      // This is a simplified version
      return true;
    default:
      return true;
  }
}

export function formatStreakText(streak: number): string {
  if (streak === 0) return 'No streak yet';
  if (streak === 1) return '1 day streak';
  return `${streak} day streak`;
}

export function getMotivationalMessage(stats: HabitStats): string {
  const { currentStreak, completionRate, longestStreak } = stats;
  
  if (currentStreak >= 30) {
    return "🔥 Incredible! You're on fire!";
  } else if (currentStreak >= 7) {
    return "🌟 Great job! Keep the momentum going!";
  } else if (currentStreak >= 3) {
    return "💪 Nice streak! You're building a great habit!";
  } else if (completionRate >= 80) {
    return "🎯 Excellent consistency!";
  } else if (completionRate >= 60) {
    return "👍 Good progress! Keep it up!";
  } else if (longestStreak > currentStreak) {
    return "🔄 You've done this before - you can do it again!";
  } else {
    return "🚀 Every journey begins with a single step!";
  }
}

