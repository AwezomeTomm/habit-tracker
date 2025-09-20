'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ArrowLeft, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { getHabits, getHabitEntries } from '@/lib/habit-storage';
import { getHabitStats, formatStreakText, getMotivationalMessage } from '@/lib/habit-utils';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

export default function StatsPage() {
  const router = useRouter();
  const habits = getHabits();
  const habitEntries = getHabitEntries();

  // Calculate overall stats
  const totalHabits = habits.length;
  const completedToday = habitEntries.filter(entry => 
    entry.completed && 
    new Date(entry.date).toDateString() === new Date().toDateString()
  ).length;
  
  const totalEntries = habitEntries.length;
  const completedEntries = habitEntries.filter(entry => entry.completed).length;
  const overallCompletionRate = totalEntries > 0 ? Math.round((completedEntries / totalEntries) * 100) : 0;

  // Get this week's data
  const now = new Date();
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 }); // Sunday
  const weekDays = eachDayOfInterval({ start: startOfThisWeek, end: endOfThisWeek });

  // Calculate weekly completion data
  const weeklyData = weekDays.map(day => {
    const dayEntries = habitEntries.filter(entry => 
      isSameDay(new Date(entry.date), day) && entry.completed
    );
    return {
      date: day,
      completed: dayEntries.length,
      total: habits.length,
    };
  });

  const maxDailyCompletions = Math.max(...weeklyData.map(d => d.total), 1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Habit Statistics</h1>
              <p className="text-muted-foreground">Track your progress and achievements</p>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
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
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedToday}</div>
              <p className="text-xs text-muted-foreground">
                of {totalHabits} habits
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallCompletionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {completedEntries} of {totalEntries} entries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...habits.map(habit => {
                  const entries = habitEntries.filter(e => e.habitId === habit.id);
                  const stats = getHabitStats(habit, entries);
                  return stats.longestStreak;
                }), 0)}
              </div>
              <p className="text-xs text-muted-foreground">days</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>This Week's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((dayData, index) => {
                const percentage = (dayData.completed / dayData.total) * 100;
                const dayName = format(dayData.date, 'EEE');
                const isToday = isSameDay(dayData.date, now);
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${isToday ? 'text-primary' : ''}`}>
                        {dayName} {isToday && '(Today)'}
                      </span>
                      <span className="text-muted-foreground">
                        {dayData.completed}/{dayData.total} habits
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Individual Habit Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Habit Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {habits.map((habit) => {
                const entries = habitEntries.filter(entry => entry.habitId === habit.id);
                const stats = getHabitStats(habit, entries);
                const motivationalMessage = getMotivationalMessage(stats);
                
                return (
                  <div key={habit.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{habit.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {habit.frequency}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold">{stats.currentStreak}</div>
                        <div className="text-xs text-muted-foreground">Current Streak</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{stats.longestStreak}</div>
                        <div className="text-xs text-muted-foreground">Best Streak</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{stats.completionRate}%</div>
                        <div className="text-xs text-muted-foreground">Completion Rate</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{stats.completedEntries}/{stats.totalEntries}</span>
                      </div>
                      <Progress value={stats.completionRate} className="h-2" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic">
                      {motivationalMessage}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
