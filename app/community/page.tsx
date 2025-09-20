'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import { mockHabits, mockHabitEntries, mockUsers, mockComments, mockCheers } from '@/lib/mock-data';
import { getHabitStats } from '@/lib/habit-utils';
import { Heart, MessageCircle, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import CommentSection from '@/components/CommentSection';
import Link from 'next/link';

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'recent'>('all');
  const [comments, setComments] = useState(mockComments);
  const [cheers, setCheers] = useState(mockCheers);
  const currentUserId = '1'; // Alex is the current user

  // Get community habits only
  const communityHabits = mockHabits.filter(habit => !habit.isPrivate);
  
  // Get community habit entries with user info
  const communityEntries = communityHabits.map(habit => {
    const entries = mockHabitEntries.filter(entry => entry.habitId === habit.id);
    const user = mockUsers.find(u => u.id === habit.userId);
    const stats = getHabitStats(habit, entries);
    
    return {
      habit,
      entries,
      user,
      stats,
      latestEntry: entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0],
    };
  });

  // Filter entries based on active filter
  const filteredEntries = communityEntries.filter(entry => {
    switch (activeFilter) {
      case 'trending':
        return entry.stats.currentStreak >= 7; // Habits with 7+ day streaks
      case 'recent':
        return entry.latestEntry && new Date(entry.latestEntry.date) > new Date(Date.now() - 24 * 60 * 60 * 1000);
      default:
        return true;
    }
  });

  // Sort by current streak (highest first)
  const sortedEntries = filteredEntries.sort((a, b) => b.stats.currentStreak - a.stats.currentStreak);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Community Feed 🌟
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            See what habits others are working on and get inspired!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Habits</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{communityHabits.length}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Streaks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {communityEntries.reduce((sum, entry) => sum + entry.stats.currentStreak, 0)}
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockUsers.length}</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { id: 'all', label: 'All Habits' },
              { id: 'trending', label: 'Trending' },
              { id: 'recent', label: 'Recent Activity' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`flex-1 px-3 sm:px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 ${
                  activeFilter === filter.id
                    ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm border border-gray-200 dark:border-gray-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
                aria-pressed={activeFilter === filter.id}
                role="tab"
                aria-selected={activeFilter === filter.id}
              >
                <span className="truncate">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Community Habits Feed */}
        <div className="space-y-6">
          {sortedEntries.length > 0 ? (
            sortedEntries.map((entry) => (
              <Card key={entry.habit.id}>
                <CardContent className="p-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {entry.user?.username?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {entry.user?.username || 'Unknown User'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {entry.latestEntry ? new Date(entry.latestEntry.date).toLocaleDateString() : 'No recent activity'}
                    </p>
                  </div>
                </div>

                {/* Habit Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {entry.habit.name}
                  </h3>
                  {entry.habit.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {entry.habit.description}
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {entry.stats.currentStreak}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Current Streak
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {entry.stats.completionRate}%
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Completion
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {entry.stats.longestStreak}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Best Streak
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{entry.stats.completedEntries}/{entry.stats.totalEntries}</span>
                  </div>
                  <Progress value={entry.stats.completionRate} className="h-2" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{entry.habit.frequency}</Badge>
                    <Badge variant="outline">Community</Badge>
                  </div>
                </div>

                {/* Comments and Cheers Section */}
                <div className="border-t pt-4">
                  <CommentSection
                    habitId={entry.habit.id}
                    comments={comments.filter(comment => comment.habitId === entry.habit.id)}
                    cheers={cheers.filter(cheer => cheer.habitId === entry.habit.id)}
                    users={mockUsers}
                    currentUserId={currentUserId}
                    onAddComment={(content) => handleAddComment(entry.habit.id, content)}
                    onAddCheer={(emoji) => handleAddCheer(entry.habit.id, emoji)}
                  />
                </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No community habits found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {activeFilter === 'all' 
                  ? "No one has shared any habits with the community yet."
                  : `No habits match the "${activeFilter}" filter.`
                }
              </p>
              <Link href="/create">
                <Button>
                  Create your first community habit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

