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
  const { xp, level, streak, badges, loadBadgeData } = useGamification();
  const { weeklyActivity, fetchWeeklyActivity } = useAnalytics();

  useEffect(() => {
    fetchHabits();
    fetchTodayTasks();
    fetchWeeklyActivity();
    loadBadgeData(); // Load badges from user data
  }, [fetchHabits, fetchTodayTasks, fetchWeeklyActivity, loadBadgeData]);

  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeHabits = habits.length;
  const totalHabitsStreak = habits.reduce(
    (total, habit) => total + (habit.completedDates?.length || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-cyber-primary via-blue-400 to-cyber-primary bg-clip-text text-transparent uppercase tracking-wider">
            🏆 COMMAND CENTER
          </h2>
          <p className="text-slate-400 text-sm md:text-base">Monitor your progression and unlock new achievements!</p>
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

        {/* System Stats Widgets */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-cyber-primary/20 p-4 md:p-6 rounded-xl shadow-xl hover:border-cyber-primary/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyber-primary to-blue-500"></div>
            <div className="flex items-center ml-2 md:ml-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-cyber-primary to-blue-600 rounded-lg flex items-center justify-center border border-cyber-primary/30">
                <span className="text-white text-lg md:text-xl">⚔️</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider">
                  Active Skills
                </p>
                <p className="text-xl md:text-3xl font-bold text-slate-100">
                  {activeHabits}
                </p>
                <p className="text-xs text-cyber-primary mt-1">Ready for training</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-emerald-500/20 p-4 md:p-6 rounded-xl shadow-xl hover:border-emerald-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-green-500"></div>
            <div className="flex items-center ml-2 md:ml-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center border border-emerald-400/30">
                <span className="text-white text-lg md:text-xl">🎯</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider">
                  Active Quests
                </p>
                <p className="text-xl md:text-3xl font-bold text-slate-100">
                  {pendingTasks}
                </p>
                <p className="text-xs text-emerald-400 mt-1">
                  {completedTasks} completed today
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-orange-500/20 p-4 md:p-6 rounded-xl shadow-xl hover:border-orange-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-400 to-red-500"></div>
            <div className="flex items-center ml-2 md:ml-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center border border-orange-400/30">
                <span className="text-white text-lg md:text-xl">🔥</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider">
                  Power Streak
                </p>
                <p className="text-xl md:text-3xl font-bold text-slate-100">
                  {totalHabitsStreak}
                </p>
                <p className="text-xs text-orange-400 mt-1">
                  Total completions
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-purple-500/20 p-4 md:p-6 rounded-xl shadow-xl hover:border-purple-400/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-500"></div>
            <div className="flex items-center ml-2 md:ml-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center border border-purple-400/30">
                <span className="text-white text-lg md:text-xl">⚡</span>
              </div>
              <div className="ml-3 md:ml-4">
                <p className="text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider">
                  System Level
                </p>
                <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-cyber-primary to-blue-400 bg-clip-text text-transparent">
                  {level}
                </p>
                <p className="text-xs text-purple-400 mt-1">
                  {xp} total XP gained
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
          <ActivityChart data={weeklyActivity} />
          <ProgressOverview
            activeHabits={activeHabits}
            pendingTasks={pendingTasks}
            completedTasks={completedTasks}
            currentXp={xp}
            level={level}
          />
        </div>

        {/* System Activity Log */}
        <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-cyber-primary/20 p-4 md:p-6 rounded-xl shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-primary/5 to-transparent animate-pulse-slow"></div>
          <div className="relative">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-slate-100 uppercase tracking-wider">
              📈 SYSTEM ACTIVITY LOG
            </h3>

            {Object.keys(weeklyActivity).length === 0 &&
            activeHabits === 0 &&
            pendingTasks === 0 ? (
              <div className="text-center py-6 md:py-8">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-gradient-to-r from-cyber-primary to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl">🚀</span>
                </div>
                <p className="text-slate-300 mb-2 text-base md:text-lg">System Initialization Required</p>
                <p className="text-slate-400 text-sm">
                  Begin your leveling journey by creating your first skill or quest
                </p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {activeHabits > 0 && (
                  <div className="flex items-center p-3 md:p-4 bg-slate-700/30 rounded-lg border border-cyber-primary/20">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-cyber-primary to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm md:text-base">⚔️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100 text-sm md:text-base">Skills Activated</p>
                      <p className="text-xs md:text-sm text-cyber-primary">
                        {activeHabits} skill{activeHabits !== 1 ? "s" : ""} ready for training
                      </p>
                    </div>
                  </div>
                )}

                {pendingTasks > 0 && (
                  <div className="flex items-center p-3 md:p-4 bg-slate-700/30 rounded-lg border border-emerald-500/20">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm md:text-base">🎯</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100 text-sm md:text-base">Quests Available</p>
                      <p className="text-xs md:text-sm text-emerald-300">
                        {pendingTasks} mission{pendingTasks !== 1 ? "s" : ""} awaiting completion
                      </p>
                    </div>
                  </div>
                )}

                {streak.current > 0 && (
                  <div className="flex items-center p-3 md:p-4 bg-slate-700/30 rounded-lg border border-orange-500/20">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm md:text-base">🔥</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100 text-sm md:text-base">Power Active</p>
                      <p className="text-xs md:text-sm text-orange-300">
                        Current streak: {streak.current} day{streak.current !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
