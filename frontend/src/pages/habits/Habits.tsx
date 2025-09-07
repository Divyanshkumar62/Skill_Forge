import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaFire,
  FaMagic,
  FaExclamationTriangle,
  FaCheck,
  FaTrash,
} from "react-icons/fa";
import DashboardLayout from "../../layouts/DashboardLayout";
import MessageDisplay from "../../components/MessageDisplay";
import { useHabits } from "../../features/habits/store";
import type { CreateHabitData } from "../../features/habits/types";



export default function Habits() {
  const {
    habits,
    loading,
    error,
    fetchHabits,
    createHabit,
    completeHabit,
    deleteHabit,
  } = useHabits();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateHabitData>({
    title: "",
    description: "",
    frequency: "daily",
    customDays: 1,
  });

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      await createHabit(formData);
      setFormData({
        title: "",
        description: "",
        frequency: "daily",
        customDays: 1,
      });
      setShowCreateForm(false);
    }
  };

  const handleComplete = async (habitId: string) => {
    await completeHabit(habitId);
  };

  const handleDelete = async (habitId: string) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      await deleteHabit(habitId);
    }
  };

  if (loading)
    return (
      <DashboardLayout>
        <MessageDisplay
          type="info"
          message="Loading your skills..."
          icon={<div className="animate-spin">⟳</div>}
        />
      </DashboardLayout>
    );
  if (error)
    return (
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
              <FaMagic className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Skill Tree
              </h2>
              <p className="text-slate-400 text-sm">
                Master your habits to gain strength
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
          >
            <FaPlus className="text-lg" />
            {showCreateForm ? "Cancel Skill" : "New Skill"}
          </button>
        </div>

        {showCreateForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800/70 backdrop-blur-sm border border-cyan-500/30 p-6 rounded-lg shadow-xl"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your skill name"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Skill Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your skill's power"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-slate-100 text-sm font-medium mb-2">
                  Training Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequency: e.target.value as any,
                    })
                  }
                  className="bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="daily">Daily Training</option>
                  <option value="weekly">Weekly Mastery</option>
                  <option value="custom">Custom Routine</option>
                </select>
              </div>
              {formData.frequency === "custom" && (
                <div>
                  <label className="block text-slate-100 text-sm font-medium mb-2">
                    Custom Training Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.customDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customDays: parseInt(e.target.value),
                      })
                    }
                    className="bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium border border-emerald-400/30 shadow-lg shadow-emerald-500/20 mt-6"
              >
                <FaCheck className="text-sm" />
                Acquire Skill
              </button>
            </div>
          </form>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit, index) => (
            <div
              key={habit._id}
              className="bg-gradient-to-br from-slate-800/80 via-slate-900/70 to-slate-800/80 backdrop-blur-sm border border-cyan-500/25 p-6 rounded-xl shadow-2xl hover:border-cyan-400/50 hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Enhanced cyber accent line with glowing effect */}
              <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-xl shadow-cyan-500/30 animate-pulse"></div>

              {/* Subtle animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>

              <div className="relative ml-4">
                {/* Skill header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold border border-cyan-400/50 shadow-lg shadow-cyan-500/25">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-1">
                      {habit.title}
                    </h3>
                    <div className="text-xs text-cyan-400 font-medium tracking-widest uppercase">
                      SKILL LEVEL: {habit.completedDates?.length || 0}
                    </div>
                  </div>
                </div>

                {/* Skill description */}
                {habit.description && (
                  <p className="text-slate-300 text-sm mb-4 opacity-80 leading-relaxed">
                    "{habit.description}"
                  </p>
                )}

                {/* Enhanced stats bar */}
                <div className="flex items-center justify-between mb-6 p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs uppercase font-bold tracking-widest text-slate-300">
                      MODE:
                    </span>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {habit.frequency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFire className="text-orange-400 text-lg animate-bounce" />
                    <span className="text-orange-300 font-bold text-lg">
                      {habit.completedDates?.length || 0}
                    </span>
                    <span className="text-orange-400 text-xs font-medium">
                      STREAK
                    </span>
                  </div>
                </div>

                {/* Action buttons with enhanced styling */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleComplete(habit._id)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white px-5 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-bold border border-emerald-400/40 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 transform hover:scale-105"
                  >
                    <FaCheck className="text-base" />
                    Train Skill
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-bold border border-red-400/40 shadow-lg"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {habits.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No habits yet. Create your first habit to get started!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
