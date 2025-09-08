import { useEffect } from "react";
import { FaCheck, FaTrash, FaCalendarAlt } from "react-icons/fa";
import DailyTaskCard from "./DailyTaskCard";

interface DailyTask {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: string;
  user: string;
  goal?: string;
  habit?: string;
}

interface DailyTaskListProps {
  tasks: DailyTask[];
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  loading?: boolean;
}

export default function DailyTaskList({
  tasks,
  onComplete,
  onDelete,
  loading = false
}: DailyTaskListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-lg shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start ml-4">
                <div className="flex-1">
                  <div className="h-4 bg-slate-600 rounded mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-slate-600 rounded"></div>
                  <div className="w-8 h-8 bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🎯</span>
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2">No Active Quests</h3>
        <p className="text-slate-500">Create a new quest to start leveling up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <DailyTaskCard
          key={task._id}
          task={task}
          onComplete={() => onComplete(task._id)}
          onDelete={() => onDelete(task._id)}
          priority={index}
        />
      ))}
    </div>
  );
}
