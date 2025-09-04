import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useHabits } from "../../features/habits/store";
import type { CreateHabitData } from "../../features/habits/types";

export default function Habits() {
  const { habits, loading, error, fetchHabits, createHabit, completeHabit, deleteHabit } = useHabits();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateHabitData>({
    title: '',
    description: '',
    frequency: 'daily',
    customDays: 1
  });

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      await createHabit(formData);
      setFormData({ title: '', description: '', frequency: 'daily', customDays: 1 });
      setShowCreateForm(false);
    }
  };

  const handleComplete = async (habitId: string) => {
    await completeHabit(habitId);
  };

  const handleDelete = async (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      await deleteHabit(habitId);
    }
  };

  if (loading) return <DashboardLayout><div className="flex justify-center items-center h-64">Loading...</div></DashboardLayout>;
  if (error) return <DashboardLayout><div className="text-red-500">{error}</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">My Habits</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showCreateForm ? 'Cancel' : 'Add Habit'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                  className="border rounded px-3 py-2"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              {formData.frequency === 'custom' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Custom Days</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.customDays}
                    onChange={(e) => setFormData({ ...formData, customDays: parseInt(e.target.value) })}
                    className="border rounded px-3 py-2"
                  />
                </div>
              )}
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Create Habit
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <div key={habit._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{habit.title}</h3>
              {habit.description && <p className="text-gray-600 mb-2">{habit.description}</p>}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500 capitalize">{habit.frequency}</span>
                <span className="text-sm font-medium">Streak: {habit.completedDates?.length || 0}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleComplete(habit._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Complete Today
                </button>
                <button
                  onClick={() => handleDelete(habit._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {habits.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No habits yet. Create your first habit to get started!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
