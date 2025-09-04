import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useDailyTasks } from "../../features/dailyTasks/store";
import type { CreateTaskData } from "../../features/dailyTasks/types";

export default function DailyTasks() {
  const { tasks, loading, error, fetchTodayTasks, createTask, markTaskComplete, deleteTask } = useDailyTasks();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    goalId: ''
  });

  useEffect(() => {
    fetchTodayTasks();
  }, [fetchTodayTasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      await createTask(formData);
      setFormData({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        goalId: ''
      });
      setShowCreateForm(false);
    }
  };

  const handleComplete = async (taskId: string) => {
    await markTaskComplete(taskId);
  };

  const handleDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  if (loading) return <DashboardLayout><div className="flex justify-center items-center h-64">Loading...</div></DashboardLayout>;
  if (error) return <DashboardLayout><div className="text-red-500">{error}</div></DashboardLayout>;

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Today's Tasks</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showCreateForm ? 'Cancel' : 'Add Task'}
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
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="border rounded px-3 py-2"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Create Task
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Pending Tasks</h3>
            {pendingTasks.length === 0 ? (
              <div className="text-gray-600 text-center py-8">No pending tasks for today!</div>
            ) : (
              <div className="space-y-2">
                {pendingTasks.map((task) => (
                  <div key={task._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      {task.description && <p className="text-gray-600 text-sm">{task.description}</p>}
                      <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleComplete(task._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Completed Tasks</h3>
            {completedTasks.length === 0 ? (
              <div className="text-gray-600 text-center py-4">No completed tasks yet!</div>
            ) : (
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <div key={task._id} className="bg-green-50 border border-green-200 p-4 rounded-lg flex justify-between items-center opacity-75">
                    <div>
                      <h4 className="font-medium line-through">{task.title}</h4>
                      {task.description && <p className="text-gray-600 text-sm line-through">{task.description}</p>}
                      <p className="text-xs text-gray-500">Completed: {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : 'Today'}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
