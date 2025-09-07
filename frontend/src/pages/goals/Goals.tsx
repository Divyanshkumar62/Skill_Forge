import { useEffect, useState } from "react";
import {
  FaPlus,
  FaCheck,
  FaTrash,
  FaMagic,
  FaExclamationTriangle,
  FaFlag,
  FaCheckCircle,
  FaCircle,
  FaCalendarAlt,
  FaList,
  FaTrophy,
} from "react-icons/fa";
import DashboardLayout from "../../layouts/DashboardLayout";
import MessageDisplay from "../../components/MessageDisplay";
import { useGoals } from "../../features/goals/store";
import type { Goal } from "../../features/goals/types";
import * as milestoneService from "../../services/milestones";

export default function Goals() {
  const {
    goals,
    loading,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    completeGoal,
  } = useGoals();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    milestones: [{ title: "", completed: false }],
    dueDate: "",
  });

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      milestones: [{ title: "", completed: false }],
      dueDate: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      const milestones = formData.milestones
        .filter((m: any) => m.title.trim())
        .map((m: any) => ({ ...m, completed: false }));

      try {
        if (editingGoal) {
          await updateGoal(editingGoal._id, {
            title: formData.title,
            description: formData.description,
            milestones,
            dueDate: formData.dueDate,
          });
          setEditingGoal(null);
        } else {
          await createGoal({
            title: formData.title,
            description: formData.description,
            milestones,
            dueDate: formData.dueDate,
          });
        }
        resetForm();
        setShowCreateForm(false);
      } catch (error) {
        console.error("Failed to save goal:", error);
      }
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description,
      milestones: goal.milestones.length > 0 ? goal.milestones : [{ title: "", completed: false }],
      dueDate: goal.dueDate,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (goalId: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      await deleteGoal(goalId);
    }
  };

  const handleCompleteGoal = async (goalId: string) => {
    if (window.confirm("Mark this goal as complete? All milestones must be completed first.")) {
      await completeGoal(goalId);
    }
  };

  const handleToggleMilestone = async (goalId: string, milestoneId: string, completed: boolean) => {
    try {
      if (completed) {
        await milestoneService.completeMilestone(goalId, milestoneId);
      } else {
        // For uncompleting, we'd need an API endpoint to toggle
        // For now, we'll just refetch the goals
      }
      await fetchGoals();
    } catch (error) {
      console.error("Failed to toggle milestone:", error);
    }
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { title: "", completed: false }],
    });
  };

  const updateMilestone = (index: number, title: string) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index].title = title;
    setFormData({ ...formData, milestones: newMilestones });
  };

  const removeMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({ ...formData, milestones: newMilestones });
  };

  if (loading)
    return (
      <DashboardLayout>
        <MessageDisplay
          type="info"
          message="Loading your ultimate objectives..."
          icon={<div className="animate-spin">⟳</div>}
        />
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <MessageDisplay
          type="error"
          title="Quest failed to load!"
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <FaTrophy className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Epic Quests
              </h2>
              <p className="text-slate-400 text-sm">
                Conquer your ultimate goals and earn legendary rewards
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingGoal(null);
              resetForm();
              setShowCreateForm(!showCreateForm);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium border border-purple-500/30 shadow-lg shadow-purple-500/20"
          >
            <FaPlus className="text-lg" />
            {showCreateForm ? "Cancel Quest" : "New Epic Quest"}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleSubmit} className="bg-slate-800/70 backdrop-blur-sm border border-purple-500/30 p-6 rounded-lg shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Quest Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your epic quest name"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Quest Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-purple-500/30 rounded px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your legendary quest"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Quest Objectives (Milestones)
                </label>
                {formData.milestones.map((milestone: any, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={milestone.title}
                      onChange={(e) => updateMilestone(index, e.target.value)}
                      className="flex-1 bg-slate-700/50 border border-purple-500/30 rounded px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder={`Objective ${index + 1}`}
                    />
                    {formData.milestones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMilestone}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                >
                  <FaPlus /> Add Objective
                </button>
              </div>

              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Due Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="bg-slate-700/50 border border-purple-500/30 rounded px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium border border-emerald-400/30 shadow-lg shadow-emerald-500/20"
                >
                  <FaCheck className="text-sm" />
                  {editingGoal ? "Update Quest" : "Create Epic Quest"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingGoal(null);
                    resetForm();
                  }}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <div
              key={goal._id}
              className="bg-gradient-to-br from-slate-800/80 via-slate-900/70 to-slate-800/80 backdrop-blur-sm border border-purple-500/25 p-6 rounded-xl shadow-2xl hover:border-purple-400/50 hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Cyber accent line */}
              <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-400 via-pink-500 to-purple-600 shadow-xl shadow-purple-500/30"></div>

              <div className="relative ml-4">
                {/* Quest header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold border border-purple-400/50 shadow-lg shadow-purple-500/25">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-1">
                      {goal.title}
                    </h3>
                    <div className="text-xs text-purple-400 font-medium tracking-widest uppercase">
                      QUEST STATUS: {goal.status}
                    </div>
                  </div>
                </div>

                {/* Quest description */}
                {goal.description && (
                  <p className="text-slate-300 text-sm mb-4 opacity-80 leading-relaxed">
                    "{goal.description}"
                  </p>
                )}

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">PROGRESS</span>
                    <span className="text-sm text-purple-400">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700/30 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaList className="text-purple-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Milestones</span>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {goal.milestones.slice(0, 5).map((milestone, mIndex) => (
                      <div key={mIndex} className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMilestone(goal._id, milestone._id || '', !milestone.completed)}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {milestone.completed ? <FaCheckCircle className="text-sm" /> : <FaCircle className="text-sm opacity-50" />}
                        </button>
                        <span className={`text-sm ${milestone.completed ? "line-through text-slate-500" : "text-slate-300"}`}>
                          {milestone.title}
                        </span>
                      </div>
                    ))}
                    {goal.milestones.length > 5 && (
                      <span className="text-xs text-slate-500">+{goal.milestones.length - 5} more...</span>
                    )}
                  </div>
                </div>

                {/* Due date */}
                {goal.dueDate && (
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
                    <FaCalendarAlt className="text-purple-400" />
                    Due: {new Date(goal.dueDate).toLocaleDateString()}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-sm font-medium shadow-lg"
                  >
                    <FaMagic className="text-xs" />
                    Edit Quest
                  </button>
                  {goal.progress === 100 && (
                    <button
                      onClick={() => handleCompleteGoal(goal._id)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 text-sm font-medium shadow-lg border border-yellow-400/30"
                    >
                      <FaTrophy className="text-xs" />
                      Complete Quest
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium border border-red-400/30"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {goals.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFlag className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">No Epic Quests Yet!</h3>
            <p className="text-slate-500">
              Begin your legendary journey by creating your first epic quest and earn legendary rewards!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
