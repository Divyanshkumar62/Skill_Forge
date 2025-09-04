import { useState, useEffect } from 'react';
import { useNotifications } from '../../features/notifications/store';

export default function NotificationSettings() {
  const { preferences, loading, error, fetchNotificationPreferences, updateNotificationPreferences } = useNotifications();
  const [localPreferences, setLocalPreferences] = useState({
    habitReminders: true,
    goalReminders: true,
    milestoneReminders: true,
    streakReminders: true,
    gamificationNotifications: true,
    weeklyReports: true
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotificationPreferences();
  }, [fetchNotificationPreferences]);

  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await updateNotificationPreferences(localPreferences);
    } catch (err) {
      console.error('Failed to save preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    setLocalPreferences({
      habitReminders: true,
      goalReminders: true,
      milestoneReminders: true,
      streakReminders: true,
      gamificationNotifications: true,
      weeklyReports: true
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Notification Settings 🔔</h1>
          <p className="text-gray-600 mt-2">Customize your notification preferences</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Habit Tracking</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Habit Reminders</label>
                  <p className="text-sm text-gray-500">Get reminded when you miss habit check-ins</p>
                </div>
                <button
                  onClick={() => setLocalPreferences(prev => ({ ...prev, habitReminders: !prev.habitReminders }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localPreferences.habitReminders ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localPreferences.habitReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Goals & Milestones</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Goal Reminders</label>
                  <p className="text-sm text-gray-500">Updates when your goals are approaching deadlines</p>
                </div>
                <button
                  onClick={() => setLocalPreferences(prev => ({ ...prev, goalReminders: !prev.goalReminders }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localPreferences.goalReminders ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localPreferences.goalReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Milestone Reminders</label>
                  <p className="text-sm text-gray-500">Celebrate and get reminded of milestone achievements</p>
                </div>
                <button
                  onClick={() => setLocalPreferences(prev => ({ ...prev, milestoneReminders: !prev.milestoneReminders }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localPreferences.milestoneReminders ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localPreferences.milestoneReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Streaks & Gamification</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Streak Reminders</label>
                  <p className="text-sm text-gray-500">Motivation messages to maintain your streaks</p>
                </div>
                <button
                  onClick={() => setLocalPreferences(prev => ({ ...prev, streakReminders: !prev.streakReminders }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localPreferences.streakReminders ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localPreferences.streakReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Gamification Notifications</label>
                  <p className="text-sm text-gray-500">XP gains, level ups, and badge achievements</p>
                </div>
                <button
                  onClick={() => setLocalPreferences(prev => ({ ...prev, gamificationNotifications: !prev.gamificationNotifications }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localPreferences.gamificationNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localPreferences.gamificationNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Reports & Analytics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-700">Weekly Progress Reports</label>
                  <p className="text-sm text-gray-500">Receive weekly summaries of your progress</p>
                </div>
                <button
                  onClick={() => setLocalPreferences(prev => ({ ...prev, weeklyReports: !prev.weeklyReports }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localPreferences.weeklyReports ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localPreferences.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex justify-between items-center">
          <button
            onClick={handleResetToDefaults}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
            disabled={saving}
          >
            Reset to Defaults
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              disabled={saving || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
