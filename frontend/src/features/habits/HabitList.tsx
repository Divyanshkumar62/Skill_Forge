import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import HabitCard from './HabitCard';
import { getHabits, deleteHabit } from './api';
import type { Habit } from './types';

interface HabitListProps {
  onCreateNew?: () => void;
  className?: string;
}

const HabitList: React.FC<HabitListProps> = ({ onCreateNew, className = '' }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await getHabits();

      if (response?.data) {
        setHabits(Array.isArray(response.data) ? response.data : []);
      } else {
        setHabits([]);
      }
    } catch (err: any) {
      console.error('Failed to fetch habits:', err);
      setError('Failed to load habits. Please try again.');
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleHabitComplete = (_completedHabit: Habit) => {
    // Refresh habits to get updated streak and completion data
    fetchHabits();
  };

  const handleHabitDelete = async (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
      try {
        await deleteHabit(habitId);
        setHabits((prevHabits) => prevHabits.filter((habit) => habit._id !== habitId));
      } catch (err: any) {
        console.error('Failed to delete habit:', err);
        setError('Failed to delete habit. Please try again.');
      }
    }
  };

  const handleHabitEdit = (habit: Habit) => {
    // TODO: Implement edit functionality
    console.log('Edit habit:', habit);
  };

  if (loading) {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-100">My Habits</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, _index) => (
            <div
              key={_index}
              className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-6 animate-pulse"
            >
              <div className="h-20 bg-slate-700/50 rounded mb-4"></div>
              <div className="h-8 bg-slate-700/50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">My Habits</h2>
          <p className="text-slate-400">
            {habits.length > 0
              ? `${habits.length} habit${habits.length === 1 ? '' : 's'} to track your progress`
              : 'Start building better habits!'
            }
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600
                   hover:from-cyan-600 hover:to-purple-700 text-white font-medium
                   px-4 py-3 rounded-lg transition-all duration-200
                   transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25
                   focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                   focus:ring-offset-slate-900"
          aria-label="Create new habit"
        >
          <FaPlus />
          <span>Add Habit</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 mb-6">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
          <button
            onClick={() => {
              setError(null);
              fetchHabits();
            }}
            className="mt-2 text-sm text-red-200 hover:text-red-100 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Habits Grid */}
      {habits.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onComplete={handleHabitComplete}
              onDelete={handleHabitDelete}
              onEdit={handleHabitEdit}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 px-6
                        bg-gradient-to-br from-slate-800/30 via-slate-900/20 to-slate-800/30
                        border border-slate-600/20 rounded-xl backdrop-blur-sm">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <FaPlus className="text-2xl text-slate-400" />
          </div>

          <h3 className="text-xl font-semibold text-slate-200 mb-2">No Habits Yet</h3>
          <p className="text-slate-400 text-center mb-6 max-w-md">
            Create your first habit to start building better routines and tracking your consistency.
          </p>

          <button
            onClick={onCreateNew}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600
                     hover:from-cyan-600 hover:to-purple-700 text-white font-medium
                     px-6 py-3 rounded-lg transition-all duration-200
                     transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          >
            <FaPlus />
            <span>Create Your First Habit</span>
          </button>
        </div>
      )}

      {/* Statistics Footer */}
      {habits.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-700/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-800/40 border border-slate-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-400">{habits.length}</div>
              <div className="text-sm text-slate-400">Total Habits</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">
                {habits.reduce((acc, habit) => acc + habit.streakCount, 0)}
              </div>
              <div className="text-sm text-slate-400">Total Streaks</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">
                {habits.filter(habit =>
                  habit.completedDates.some(date =>
                    new Date(date).toDateString() === new Date().toDateString()
                  )
                ).length}
              </div>
              <div className="text-sm text-slate-400">Completed Today</div>
            </div>

            <div className="bg-slate-800/40 border border-slate-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">
                {habits.reduce((acc, habit) => acc + habit.xpReward, 0)}
              </div>
              <div className="text-sm text-slate-400">Max XP per Day</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitList;
