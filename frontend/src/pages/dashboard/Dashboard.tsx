import { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useHabits } from "../../features/habits/store";
import { useDailyTasks } from "../../features/dailyTasks/store";
import { useGamification } from "../../features/gamification/store";
import { useAnalytics } from "../../features/analytics/store";
import XpBar from "../../components/gamification/XpBar";
import StreakTracker from "../../components/gamification/StreakTracker";
import BadgeDisplay from "../../components/gamification/BadgeDisplay";
import ActivityChart from "../../components/analytics/ActivityChart";
import ProgressOverview from "../../components/analytics/ProgressOverview";

export default function Dashboard() {
  const { habits, fetchHabits } = useHabits();
  const { tasks, fetchTodayTasks } = useDailyTasks();
  const { xp, level, streak, badges } = useGamification();
  const { weeklyActivity, fetchWeeklyActivity, xpSummary, fetchXpSummary } = useAnalytics();

  useEffect(() => {
    fetchHabits();
    fetchTodayTasks();
    fetchWeeklyActivity();
    fetchXpSummary();
  }, [fetchHabits, fetchTodayTasks, fetchWeeklyActivity, fetchXpSummary]);

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeHabits = habits.length;
  const totalHabitsStreak = habits.reduce((total, habit) => total + (habit.completedDates?.length || 0), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Dashboard Overview 📊</h2>
          <p className="text-gray-600">Track your progress and achievements!</p>
        </div>

        {/* Gamification Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <XpBar currentXp={xp} level={level} />
          <StreakTracker
            current={streak.current}
            longest={streak.longest}
            lastUpdated={streak.lastUpdated}
          />
          <BadgeDisplay badges={badges} />
        </div>

        {/* Stats Widgets */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Habits</p>
                <p className="text-2xl font-bold text-gray-900">{activeHabits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
                <p className="text-xs text-gray-500">{completedTasks} completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Habit Streaks</p>
                <p className="text-2xl font-bold text-gray-900">{totalHabitsStreak}</p>
                <p className="text-xs text-gray-500">Total completions</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Level</p>
                <p className="text-2xl font-bold text-gray-900">{level}</p>
                <p className="text-xs text-gray-500">{xp} XP total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <ActivityChart data={weeklyActivity} />
          <ProgressOverview
            activeHabits={activeHabits}
            pendingTasks={pendingTasks}
            completedTasks={completedTasks}
            currentXp={xp}
            level={level}
            nextLevelXp={level * 100}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activity ⚡</h3>

          {Object.keys(weeklyActivity).length === 0 && activeHabits === 0 && pendingTasks === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-gray-600 mb-2">Ready to start your journey!</p>
              <p className="text-sm text-gray-500">Create your first habit or task to begin tracking your progress.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeHabits > 0 && (
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl mr-3">🔄</span>
                  <div>
                    <p className="font-medium">Habits Active</p>
                    <p className="text-sm text-gray-600">You have {activeHabits} habit{activeHabits !== 1 ? 's' : ''} to track today</p>
                  </div>
                </div>
              )}

              {pendingTasks > 0 && (
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-2xl mr-3">📋</span>
                  <div>
                    <p className="font-medium">Tasks Pending</p>
                    <p className="text-sm text-gray-600">You have {pendingTasks} task{pendingTasks !== 1 ? 's' : ''} to complete today</p>
                  </div>
                </div>
              )}

              {streak.current > 0 && (
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-2xl mr-3">🔥</span>
                  <div>
                    <p className="font-medium">Streak Active</p>
                    <p className="text-sm text-gray-600">Your current streak is {streak.current} day{streak.current !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
