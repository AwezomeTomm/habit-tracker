import type { Habit, HabitEntry } from './types';

const STORAGE_KEYS = {
  HABITS: 'habit-tracker-habits',
  ENTRIES: 'habit-tracker-entries',
} as const;

// Helper functions for localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

// Habit management functions
export function getHabits(): Habit[] {
  return getFromStorage(STORAGE_KEYS.HABITS, []);
}

export function saveHabit(habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>): Habit {
  const habits = getHabits();
  const newHabit: Habit = {
    ...habit,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const updatedHabits = [...habits, newHabit];
  setToStorage(STORAGE_KEYS.HABITS, updatedHabits);
  
  return newHabit;
}

export function updateHabit(habitId: string, updates: Partial<Habit>): Habit | null {
  const habits = getHabits();
  const habitIndex = habits.findIndex(h => h.id === habitId);
  
  if (habitIndex === -1) return null;
  
  const updatedHabit = {
    ...habits[habitIndex],
    ...updates,
    updatedAt: new Date(),
  };
  
  habits[habitIndex] = updatedHabit;
  setToStorage(STORAGE_KEYS.HABITS, habits);
  
  return updatedHabit;
}

export function deleteHabit(habitId: string): boolean {
  const habits = getHabits();
  const updatedHabits = habits.filter(h => h.id !== habitId);
  
  if (updatedHabits.length === habits.length) return false;
  
  setToStorage(STORAGE_KEYS.HABITS, updatedHabits);
  
  // Also delete all entries for this habit
  const entries = getHabitEntries();
  const updatedEntries = entries.filter(e => e.habitId !== habitId);
  setToStorage(STORAGE_KEYS.ENTRIES, updatedEntries);
  
  return true;
}

export function archiveHabit(habitId: string): boolean {
  return updateHabit(habitId, { archived: true }) !== null;
}

// Habit entry management functions
export function getHabitEntries(): HabitEntry[] {
  return getFromStorage(STORAGE_KEYS.ENTRIES, []);
}

export function getHabitEntriesForHabit(habitId: string): HabitEntry[] {
  const entries = getHabitEntries();
  return entries.filter(entry => entry.habitId === habitId);
}

export function toggleHabitCompletion(habitId: string, date: Date = new Date()): HabitEntry {
  const entries = getHabitEntries();
  const dateString = date.toDateString();
  
  // Find existing entry for this date
  const existingEntryIndex = entries.findIndex(
    entry => entry.habitId === habitId && new Date(entry.date).toDateString() === dateString
  );
  
  if (existingEntryIndex !== -1) {
    // Toggle existing entry
    const existingEntry = entries[existingEntryIndex];
    const updatedEntry = {
      ...existingEntry,
      completed: !existingEntry.completed,
    };
    
    entries[existingEntryIndex] = updatedEntry;
    setToStorage(STORAGE_KEYS.ENTRIES, entries);
    
    return updatedEntry;
  } else {
    // Create new entry
    const newEntry: HabitEntry = {
      id: Date.now().toString(),
      habitId,
      userId: '1', // Default user ID for local storage
      date,
      completed: true,
      createdAt: new Date(),
    };
    
    const updatedEntries = [...entries, newEntry];
    setToStorage(STORAGE_KEYS.ENTRIES, updatedEntries);
    
    return newEntry;
  }
}

export function isHabitCompletedToday(habitId: string): boolean {
  const entries = getHabitEntries();
  const today = new Date().toDateString();
  
  return entries.some(
    entry => 
      entry.habitId === habitId && 
      entry.completed && 
      new Date(entry.date).toDateString() === today
  );
}

export function getHabitCompletionForDate(habitId: string, date: Date): boolean {
  const entries = getHabitEntries();
  const dateString = date.toDateString();
  
  const entry = entries.find(
    entry => 
      entry.habitId === habitId && 
      new Date(entry.date).toDateString() === dateString
  );
  
  return entry?.completed || false;
}

// Initialize with mock data if no data exists
export function initializeWithMockData(): void {
  const habits = getHabits();
  const entries = getHabitEntries();
  
  if (habits.length === 0) {
    // Import mock data and save to localStorage
    import('./mock-data').then(({ mockHabits, mockHabitEntries }) => {
      setToStorage(STORAGE_KEYS.HABITS, mockHabits);
      setToStorage(STORAGE_KEYS.ENTRIES, mockHabitEntries);
    });
  }
}
