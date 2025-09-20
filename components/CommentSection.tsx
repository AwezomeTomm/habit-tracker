'use client';

import React, { useState } from 'react';
import { MessageCircle, Send, Smile, Heart, ThumbsUp, Flame, Star } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import type { Comment, Cheer, User } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  habitId: string;
  comments: Comment[];
  cheers: Cheer[];
  users: User[];
  currentUserId: string;
  onAddComment?: (content: string) => void;
  onAddCheer?: (emoji: string) => void;
}

const CHEER_EMOJIS = [
  { emoji: '🔥', label: 'Fire', icon: Flame },
  { emoji: '💪', label: 'Strong', icon: Heart },
  { emoji: '🌟', label: 'Star', icon: Star },
  { emoji: '👍', label: 'Thumbs Up', icon: ThumbsUp },
  { emoji: '❤️', label: 'Love', icon: Heart },
  { emoji: '🎉', label: 'Celebrate', icon: Star },
];

export default function CommentSection({
  habitId,
  comments,
  cheers,
  users,
  currentUserId,
  onAddComment,
  onAddCheer,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !onAddComment) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
      setShowCommentInput(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheer = async (emoji: string) => {
    if (!onAddCheer) return;
    try {
      await onAddCheer(emoji);
    } catch (error) {
      console.error('Error adding cheer:', error);
    }
  };

  const getUserById = (userId: string) => users.find(u => u.id === userId);
  
  // Group cheers by emoji
  const cheersByEmoji = cheers.reduce((acc, cheer) => {
    if (!acc[cheer.emoji]) {
      acc[cheer.emoji] = [];
    }
    acc[cheer.emoji].push(cheer);
    return acc;
  }, {} as Record<string, Cheer[]>);

  return (
    <div className="space-y-4 overflow-hidden">
      {/* Cheers Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Cheers:</span>
        </div>
        
        {/* Existing Cheers */}
        {Object.keys(cheersByEmoji).length > 0 && (
          <div className="flex flex-wrap items-center gap-2 max-w-full">
            {Object.entries(cheersByEmoji).map(([emoji, emojiCheers]) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                onClick={() => handleCheer(emoji)}
                className="h-8 px-2 hover:bg-accent flex-shrink-0 min-w-0"
              >
                <span className="text-lg">{emoji}</span>
                <span className="ml-1 text-xs text-muted-foreground">
                  {emojiCheers.length}
                </span>
              </Button>
            ))}
          </div>
        )}
        
        {/* Add Cheer Buttons */}
        <div className="flex flex-wrap items-center gap-1 max-w-full">
          {CHEER_EMOJIS.map(({ emoji, label }) => (
            <Button
              key={emoji}
              variant="ghost"
              size="sm"
              onClick={() => handleCheer(emoji)}
              className="h-8 w-8 p-0 hover:bg-accent flex-shrink-0 min-w-0"
              title={`Add ${label} cheer`}
            >
              <span className="text-lg">{emoji}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">
            Comments ({comments.length})
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommentInput(!showCommentInput)}
            className="text-muted-foreground hover:text-foreground"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            {showCommentInput ? 'Cancel' : 'Add Comment'}
          </Button>
        </div>

        {/* Add Comment Form */}
        {showCommentInput && (
          <Card>
            <CardContent className="p-4">
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts or encouragement..."
                  className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring resize-none"
                  rows={3}
                  maxLength={500}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {newComment.length}/500
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowCommentInput(false);
                        setNewComment('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newComment.trim() || isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      {isSubmitting ? 'Posting...' : 'Post'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-3">
            {comments
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map((comment) => {
                const user = getUserById(comment.userId);
                return (
                  <Card key={comment.id} className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-medium text-sm">
                            {user?.username?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm text-foreground">
                              {user?.username || 'Unknown User'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No comments yet. Be the first to share encouragement!</p>
          </div>
        )}
      </div>
    </div>
  );
}
