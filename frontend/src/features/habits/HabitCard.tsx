import React, { useState } from 'react';
import { FaFire, FaCheck } from 'react-icons/fa';
import type { Habit } from './types';
import { completeHabit } from './api';

interface HabitCardProps {
  habit: Habit;
  onComplete?: (habit: Habit) => void;
  onDelete?: (id: string) => void;
  onEdit?: (habit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onComplete,
  onDelete,
  onEdit
}) => {
  const [isCompleting, setIsCompleting] = useState(false);

  // Check if habit was completed today
  const isCompletedToday = () => {
    const today = new Date().toDateString();
    return habit.completedDates.some(date =>
      new Date(date).toDateString() === today
    );
  };

  // Get progress percentage for weekly habits
  const getWeeklyProgress = () => {
    if (habit.frequency !== 'weekly' || !habit.daysOfWeek) return 100;

    const today = new Date().getDay();
    const completedCount = habit.completedDates.filter(date => {
      const habitDate = new Date(date);
      return habitDate.getDay() === today;
    }).length;

    return Math.min(100, (completedCount / 7) * 100); // Theoretical max
  };

  // Get streak display level
  const getStreakLevel = () => {
    if (habit.streakCount >= 30) return 5; // Legendary 🔥🔥🔥
    if (habit.streakCount >= 14) return 4; // Epic 🔥🔥
    if (habit.streakCount >= 7) return 3;   // Great 🔥
    if (habit.streakCount >= 3) return 2;   // Good ✅
    return habit.streakCount > 0 ? 1 : 0;   // Starting 🚀
  };

  const handleComplete = async () => {
    if (isCompleting || isCompletedToday()) return;

    setIsCompleting(true);
    try {
      await completeHabit(habit._id);
      onComplete?.(habit);
    } catch (error: any) {
      console.error('Failed to complete habit:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const getFrequencyDisplay = () => {
    switch (habit.frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return `Weekly (${habit.daysOfWeek?.length || 7} days)`;
      case 'custom': return `Every ${habit.customDays} days`;
      default: return 'Custom';
    }
  };

  const getStreakColor = (level: number) => {
    switch (level) {
      case 5: return 'text-red-500';     // Legendary
      case 4: return 'text-orange-500';  // Epic
      case 3: return 'text-yellow-500';  // Great
      case 2: return 'text-green-500';   // Good
      case 1: return 'text-blue-500';    // Starting
      default: return 'text-gray-400';    // None
    }
  };

  const getStreakMessage = (level: number) => {
    switch (level) {
      case 5: return 'LEGENDARY 🔥';
      case 4: return 'EPIC 🔥';
      case 3: return 'GREAT! 🔥';
      case 2: return 'GOOD JOB! ✅';
      case 1: return 'GETTING STARTED 🚀';
      default: return 'TAP TO START ✓';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/80 via-slate-900/70 to-slate-800/80
                    backdrop-blur-sm border border-slate-600/30 rounded-xl p-6
                    shadow-xl hover:border-slate-500/50 transition-all duration-300
                    relative overflow-hidden group">

      {/* Cyber accent line */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-600
                      shadow-lg shadow-cyan-500/30"></div>

      {/* Progress background for weekly habits */}
      {habit.frequency === 'weekly' && (
        <div className="absolute inset-0 bg-cyan-500/10 rounded-xl"
             style={{ backgroundSize: '100%', clipPath: `inset(${100 - getWeeklyProgress()}% 0 0 0)` }}></div>
      )}

      <div className="relative ml-3">

        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">
              {habit.title}
            </h3>
            <p className="text-sm text-slate-400 uppercase tracking-wider">
              {getFrequencyDisplay()}
            </p>
            {habit.description && (
              <p className="text-sm text-slate-300 mt-2 opacity-75">
                {habit.description}
              </p>
            )}
          </div>

          {/* XP Display */}
          <div className="text-right">
            <div className="text-lg font-bold text-purple-400">
              +{habit.xpReward} XP
            </div>
          </div>
        </div>

        {/* Completion Status & Streak Section */}
        <div className="flex items-center justify-between mb-4">

          {/* Streak Display */}
          <div className="flex items-center space-x-2">
            <FaFire className={`text-2xl ${getStreakColor(getStreakLevel())}`} />
            <div>
              <div className={`text-lg font-bold ${getStreakColor(getStreakLevel())}`}>
                {habit.streakCount}
              </div>
              <div className="text-xs text-slate-400">
                {getStreakMessage(getStreakLevel())}
              </div>
            </div>
          </div>

          {/* Completion Toggle */}
          <div className="flex items-center space-x-2">
            {isCompletedToday() ? (
              <div className="flex items-center space-x-1 text-green-400 bg-green-500/20 px-3 py-1 rounded-full">
                <FaCheck className="text-sm" />
                <span className="text-sm font-medium">Completed Today!</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600
                         hover:from-cyan-600 hover:to-purple-700 text-white
                         px-4 py-2 rounded-lg font-medium transition-all duration-200
                         transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25
                         disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:transform-none focus:outline-none focus:ring-2
                         focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                aria-label={`Complete habit: ${habit.title}`}
              >
                {isCompleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Awarding XP...</span>
                  </>
                ) : (
                  <>
                    <FaCheck className="text-sm" />
                    <span>Complete +{habit.xpReward} XP</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t border-slate-700/30">
          <button
            onClick={() => onEdit?.(habit)}
            className="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200
                     px-4 py-2 rounded-lg transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Edit habit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(habit._id)}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300
                     px-4 py-2 rounded-lg transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete habit"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default HabitCard;
