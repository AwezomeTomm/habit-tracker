'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HabitCard from '@/components/HabitCard';
import { mockComments, mockCheers, mockUsers } from '@/lib/mock-data';
import { getHabitStats } from '@/lib/habit-utils';
import { 
  getHabits, 
  getHabitEntries, 
  toggleHabitCompletion, 
  deleteHabit as deleteHabitStorage,
  archiveHabit as archiveHabitStorage,
  initializeWithMockData,
  isHabitCompletedToday
} from '@/lib/habit-storage';
import { Plus, TrendingUp, Calendar, Target } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import type { Habit } from '@/lib/types';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'private' | 'community'>('all');
  const [comments, setComments] = useState(mockComments);
  const [cheers, setCheers] = useState(mockCheers);
  const [habits, setHabits] = useState(getHabits());
  const [habitEntries, setHabitEntries] = useState(getHabitEntries());
  const currentUserId = '1'; // Alex is the current user

  // Initialize with mock data if no habits exist
  React.useEffect(() => {
    if (habits.length === 0) {
      initializeWithMockData();
      setHabits(getHabits());
      setHabitEntries(getHabitEntries());
    }
  }, []);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    habitId: string | null;
    habitName: string;
  }>({
    isOpen: false,
    habitId: null,
    habitName: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter habits based on active tab
  const filteredHabits = habits.filter(habit => {
    if (activeTab === 'private') return habit.isPrivate;
    if (activeTab === 'community') return !habit.isPrivate;
    return true;
  });

  // Calculate overall stats
  const totalHabits = habits.length;
  const privateHabits = habits.filter(h => h.isPrivate).length;
  const communityHabits = habits.filter(h => !h.isPrivate).length;
  const completedToday = habitEntries.filter(entry => 
    entry.completed && 
    new Date(entry.date).toDateString() === new Date().toDateString()
  ).length;

  // Handler functions
  const handleEditHabit = (habit: Habit) => {
    router.push(`/edit/${habit.id}`);
  };

  const handleDeleteHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      setDeleteDialog({
        isOpen: true,
        habitId,
        habitName: habit.name,
      });
    }
  };

  const handleArchiveHabit = (habitId: string) => {
    const success = archiveHabitStorage(habitId);
    if (success) {
      setHabits(getHabits());
      console.log('Habit archived:', habitId);
    }
  };

  const handleToggleComplete = (habitId: string) => {
    toggleHabitCompletion(habitId);
    setHabitEntries(getHabitEntries());
    console.log('Toggled completion for habit:', habitId);
  };

  const confirmDelete = async () => {
    if (!deleteDialog.habitId) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Delete the habit from localStorage
      const success = deleteHabitStorage(deleteDialog.habitId);
      
      if (success) {
        setHabits(getHabits());
        setHabitEntries(getHabitEntries());
        console.log('Habit deleted:', deleteDialog.habitId);
      }
      
      // Close dialog
      setDeleteDialog({
        isOpen: false,
        habitId: null,
        habitName: '',
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({
      isOpen: false,
      habitId: null,
      habitName: '',
    });
  };

  // Handler functions for comments and cheers
  const handleAddComment = async (habitId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      habitId,
      userId: currentUserId,
      content,
      createdAt: new Date(),
    };
    setComments(prev => [...prev, newComment]);
  };

  const handleAddCheer = async (habitId: string, emoji: string) => {
    // Check if user already cheered with this emoji
    const existingCheer = cheers.find(
      cheer => cheer.habitId === habitId && 
               cheer.userId === currentUserId && 
               cheer.emoji === emoji
    );

    if (existingCheer) {
      // Remove existing cheer
      setCheers(prev => prev.filter(cheer => cheer.id !== existingCheer.id));
    } else {
      // Add new cheer
      const newCheer = {
        id: Date.now().toString(),
        habitId,
        userId: currentUserId,
        emoji,
        createdAt: new Date(),
      };
      setCheers(prev => [...prev, newCheer]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted-foreground">
            Keep building those great habits. You've completed {completedToday} habits today!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHabits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Private Habits</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{privateHabits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Habits</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityHabits}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedToday}</div>
            </CardContent>
          </Card>
        </div>

        {/* Habits Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Habits</h2>
            <Button asChild>
              <Link href="/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Habit
              </Link>
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
            {[
              { id: 'all', label: 'All Habits', count: totalHabits },
              { id: 'private', label: 'Private', count: privateHabits },
              { id: 'community', label: 'Community', count: communityHabits },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-black dark:text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                <Badge variant="secondary" className="ml-1">
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>

          {/* Habits Grid */}
          {filteredHabits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHabits.map((habit) => {
                const habitEntriesForHabit = habitEntries.filter(entry => entry.habitId === habit.id);
                const stats = getHabitStats(habit, habitEntriesForHabit);
                const isCompletedToday = isHabitCompletedToday(habit.id);

                return (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    stats={stats}
                    isCompletedToday={isCompletedToday}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditHabit}
                    onArchive={handleArchiveHabit}
                    onDelete={handleDeleteHabit}
                    showComments={!habit.isPrivate}
                    comments={comments.filter(comment => comment.habitId === habit.id)}
                    cheers={cheers.filter(cheer => cheer.habitId === habit.id)}
                    users={mockUsers}
                    currentUserId={currentUserId}
                    onAddComment={handleAddComment}
                    onAddCheer={handleAddCheer}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No habits found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'all' 
                  ? "You haven't created any habits yet."
                  : `You don't have any ${activeTab} habits yet.`
                }
              </p>
              <Button asChild>
                <Link href="/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first habit
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Habit"
        message={`Are you sure you want to delete "${deleteDialog.habitName}"? This action cannot be undone and will remove all associated progress data.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}
