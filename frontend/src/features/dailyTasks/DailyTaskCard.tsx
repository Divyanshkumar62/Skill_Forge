import { FaCheck, FaTrash, FaCalendarAlt, FaMagic } from "react-icons/fa";

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

interface DailyTaskCardProps {
  task: DailyTask;
  onComplete: () => void;
  onDelete: () => void;
  priority: number;
}

export default function DailyTaskCard({
  task,
  onComplete,
  onDelete,
  priority
}: DailyTaskCardProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this quest?')) {
      onDelete();
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800/70 via-slate-900/60 to-slate-800/70 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-lg shadow-xl hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden">
      {/* Cyber accent line with Solo Leveling theme */}
      <div className={`absolute left-0 top-0 w-1.5 h-full rounded-r-full shadow-lg ${
        priority === 0
          ? 'bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/60'
          : priority < 3
            ? 'bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-cyan-500/50'
            : 'bg-gradient-to-b from-slate-500 to-slate-600'
      }`}></div>

      <div className="flex justify-between items-start ml-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold ${
              priority === 0
                ? 'bg-yellow-500'
                : priority < 3
                  ? 'bg-cyan-500'
                  : 'bg-slate-600'
            }`}>
              {priority === 0 ? '★' : priority + 1}
            </div>
            <h4 className={`font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
              {task.title}
            </h4>
            {(task.goal || task.habit) && (
              <div className="flex items-center gap-1 text-xs text-cyan-400">
                <FaMagic className="text-sm" />
                <span>Linked Quest</span>
              </div>
            )}
          </div>
          {task.description && (
            <p className={`text-sm mb-2 opacity-75 ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <FaCalendarAlt className="text-cyan-400" />
            Due: {new Date(task.dueDate).toLocaleDateString()} | +5 XP
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          {!task.completed && (
            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium border border-emerald-400/30 shadow-lg shadow-emerald-500/20"
            >
              <FaCheck className="text-xs" />
              Complete
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 text-sm font-medium border border-red-400/30"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}
