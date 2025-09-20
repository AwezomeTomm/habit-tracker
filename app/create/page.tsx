'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ArrowLeft, Save, Calendar, Users, Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import type { HabitFrequency, HabitVisibility } from '@/lib/types';
import { saveHabit } from '@/lib/habit-storage';

export default function CreateHabitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily' as HabitFrequency,
    customFrequency: 1,
    visibility: 'private' as HabitVisibility,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save habit to localStorage
      const newHabit = saveHabit({
        userId: '1', // Default user ID for local storage
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        frequency: formData.frequency,
        customFrequency: formData.frequency === 'custom' ? formData.customFrequency : undefined,
        isPrivate: formData.visibility === 'private',
        archived: false,
      });

      console.log('Habit created successfully:', newHabit);
      
      // Redirect back to dashboard
      router.push('/');
    } catch (error) {
      console.error('Error creating habit:', error);
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Habit
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Build a new habit and choose whether to keep it private or share with the community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-6">
            {/* Habit Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Habit Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Drink 8 glasses of water"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Optional description of your habit..."
              />
            </div>

            {/* Frequency */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3">
                Frequency *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'daily', label: 'Daily', icon: Calendar },
                  { value: 'weekly', label: 'Weekly', icon: Calendar },
                  { value: 'custom', label: 'Custom', icon: Calendar },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.frequency === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-input hover:border-ring'
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={option.value}
                      checked={formData.frequency === option.value}
                      onChange={(e) => handleInputChange('frequency', e.target.value)}
                      className="sr-only"
                    />
                    <option.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Custom Frequency Input */}
              {formData.frequency === 'custom' && (
                <div className="mt-4">
                  <label htmlFor="customFrequency" className="block text-sm font-medium text-foreground mb-2">
                    Every how many days?
                  </label>
                  <input
                    type="number"
                    id="customFrequency"
                    min="1"
                    max="30"
                    value={formData.customFrequency}
                    onChange={(e) => handleInputChange('customFrequency', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground"
                  />
                </div>
              )}
            </div>

            {/* Visibility */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Visibility *
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: 'private',
                    label: 'Private',
                    description: 'Only you can see this habit and your progress',
                    icon: Lock,
                    color: 'amber',
                  },
                  {
                    value: 'community',
                    label: 'Community',
                    description: 'Share with others and get motivation from the community',
                    icon: Users,
                    color: 'blue',
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.visibility === option.value
                        ? option.value === 'private'
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={formData.visibility === option.value}
                      onChange={(e) => handleInputChange('visibility', e.target.value)}
                      className="sr-only"
                    />
                    <option.icon className={`w-5 h-5 mt-0.5 ${
                      option.value === 'private' ? 'text-amber-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {option.label}
                        </span>
                        {option.value === 'private' && (
                          <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name.trim()}
              className="inline-flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating...' : 'Create Habit'}</span>
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

