'use client';

import { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Calendar, 
  TrendingUp, 
  Users, 
  Lock,
  MoreVertical,
  Edit,
  Archive,
  Trash2
} from 'lucide-react';
import type { Habit, HabitStats } from '@/lib/types';
import { getMotivationalMessage } from '@/lib/habit-utils';
import CommentSection from './CommentSection';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { Badge } from './ui/Badge';
import { DropdownMenu, DropdownMenuItem } from './ui/DropdownMenu';
import clsx from 'clsx';

interface HabitCardProps {
  habit: Habit;
  stats: HabitStats;
  isCompletedToday?: boolean;
  onToggleComplete?: (habitId: string) => void;
  onEdit?: (habit: Habit) => void;
  onArchive?: (habitId: string) => void;
  onDelete?: (habitId: string) => void;
  showActions?: boolean;
  showComments?: boolean;
  comments?: any[];
  cheers?: any[];
  users?: any[];
  currentUserId?: string;
  onAddComment?: (habitId: string, content: string) => void;
  onAddCheer?: (habitId: string, emoji: string) => void;
}

export default function HabitCard({
  habit,
  stats,
  isCompletedToday = false,
  onToggleComplete,
  onEdit,
  onArchive,
  onDelete,
  showActions = true,
  showComments = false,
  comments = [],
  cheers = [],
  users = [],
  currentUserId = '',
  onAddComment,
  onAddCheer,
}: HabitCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleComplete = () => {
    if (onToggleComplete) {
      onToggleComplete(habit.id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(habit);
    }
    setShowMenu(false);
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(habit.id);
    }
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(habit.id);
    }
    setShowMenu(false);
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleComplete}
              className={clsx(
                'h-8 w-8 transition-colors',
                isCompletedToday
                  ? 'text-green-600 hover:text-green-700'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isCompletedToday ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            <div>
              <CardTitle className="text-lg">{habit.name}</CardTitle>
              {habit.description && (
                <CardDescription className="mt-1">
                  {habit.description}
                </CardDescription>
              )}
            </div>
          </div>
          
          {showActions && (
            <DropdownMenu
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              }
            >
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchive}>
                <Archive className="h-4 w-4" />
                <span>Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} variant="destructive">
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 overflow-hidden">
        {/* Visibility and frequency badges */}
        <div className="flex items-center space-x-2">
          <Badge variant={habit.isPrivate ? "secondary" : "default"}>
            {habit.isPrivate ? (
              <>
                <Lock className="mr-1 h-3 w-3" />
                Private
              </>
            ) : (
              <>
                <Users className="mr-1 h-3 w-3" />
                Community
              </>
            )}
          </Badge>
          <Badge variant="outline">
            <Calendar className="mr-1 h-3 w-3" />
            {habit.frequency}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Current Streak
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Completion
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.longestStreak}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Best Streak
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{stats.completedEntries}/{stats.totalEntries}</span>
          </div>
          <Progress value={stats.completionRate} className="h-2" />
        </div>

        {/* Motivational message */}
        <div className="text-sm text-muted-foreground italic">
          {getMotivationalMessage(stats)}
        </div>

        {/* Comments and Cheers Section */}
        {showComments && !habit.isPrivate && (
          <div className="border-t pt-4 mt-4">
            <CommentSection
              habitId={habit.id}
              comments={comments}
              cheers={cheers}
              users={users}
              currentUserId={currentUserId}
              onAddComment={onAddComment ? (content) => onAddComment(habit.id, content) : undefined}
              onAddCheer={onAddCheer ? (emoji) => onAddCheer(habit.id, emoji) : undefined}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
