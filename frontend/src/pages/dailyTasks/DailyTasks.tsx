import { useEffect, useState } from "react";
import { FaPlus, FaCheck, FaTrash, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import DashboardLayout from "../../layouts/DashboardLayout";
import MessageDisplay from "../../components/MessageDisplay";
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

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

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

  if (loading) return (
    <DashboardLayout>
      <MessageDisplay
        type="info"
        message="Loading your tasks..."
        icon={<div className="animate-spin">⟳</div>}
      />
    </DashboardLayout>
  );
  if (error) return (
    <DashboardLayout>
      <MessageDisplay
        type="error"
        title="Something went wrong!"
        message={error}
        icon={<FaExclamationTriangle />}
      />
    </DashboardLayout>
  );
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎯</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Daily Quests
              </h2>
              <p className="text-slate-400 text-sm">Complete missions to level up</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
          >
            <FaPlus className="text-lg" />
            {showCreateForm ? 'Cancel Quest' : 'New Quest'}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleSubmit} className="bg-slate-800/70 backdrop-blur-sm border border-cyan-500/30 p-6 rounded-lg shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">Quest Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your mission objective"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">Mission Details (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your quest requirements"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium border border-emerald-400/30 shadow-lg shadow-emerald-500/20 mt-6"
              >
                <FaCheck className="text-sm" />
                Create Quest
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          <div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="text-white text-sm" />
            </div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Active Quests ({pendingTasks.length})
            </span>
          </h3>
            {pendingTasks.length === 0 ? (
              <MessageDisplay
                type="info"
                message="Great job! No pending tasks for today. Create a new task or start a new habit to keep the momentum going!"
                icon="🎯"
              />
            ) : (
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div key={task._id} className="bg-gradient-to-r from-slate-800/70 via-slate-900/60 to-slate-800/70 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-lg shadow-xl hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden">
                    {/* Cyber accent line with Solo Leveling theme */}
                    <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/50"></div>

                    <div className="flex justify-between items-start ml-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                            {index + 1}
                          </div>
                          <h4 className="font-semibold text-slate-100">{task.title}</h4>
                        </div>
                        {task.description && (
                          <p className="text-slate-300 text-sm mb-2 opacity-75">{task.description}</p>
                        )}
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <FaCalendarAlt className="text-cyan-400" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleComplete(task._id)}
                          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium border border-emerald-400/30 shadow-lg shadow-emerald-500/20"
                        >
                          <FaCheck className="text-xs" />
                          Complete
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium border border-red-400/30"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <FaCheck className="text-white text-sm" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Completed Quests ({completedTasks.length})
              </span>
            </h3>
            {completedTasks.length === 0 ? (
              <MessageDisplay
                type="empty"
                message="No completed tasks yet. Complete a task above to see it here!"
                icon="🏆"
              />
            ) : (
              <div className="space-y-3">
                {completedTasks.map((task, _index) => (
                  <div key={task._id} className="bg-slate-800/30 backdrop-blur-sm border border-emerald-500/20 p-4 rounded-lg shadow-lg opacity-80 relative overflow-hidden">
                    {/* Cyber accent line */}
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-green-600"></div>

                    <div className="flex justify-between items-start ml-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                            ✓
                          </div>
                          <h4 className="font-semibold text-slate-300 line-through">{task.title}</h4>
                        </div>
                        {task.description && (
                          <p className="text-slate-400 text-sm mb-2 opacity-75 line-through">{task.description}</p>
                        )}
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <FaCheck className="text-emerald-400" />
                          Completed: {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : 'Today'}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium border border-red-400/30"
                        >
                          <FaTrash className="text-xs" />
                          Delete
                        </button>
                      </div>
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
