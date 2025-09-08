import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

interface CreateTaskData {
  title: string;
  description: string;
  dueDate: string;
  goalId?: string;
}

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskData) => Promise<void>;
  loading?: boolean;
}

export default function NewTaskModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false
}: NewTaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    goalId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      try {
        await onSubmit(formData);
        setFormData({
          title: '',
          description: '',
          dueDate: new Date().toISOString().split('T')[0],
          goalId: ''
        });
        onClose();
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      goalId: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-cyan-500/30 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="relative p-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-t-xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FaPlus className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Create New Quest
                </h3>
                <p className="text-slate-400 text-sm">Ready to level up your skills?</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
          {/* Quest Title */}
          <div>
            <label className="block text-slate-100 text-sm font-medium mb-3">
              Quest Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              placeholder="Enter your mission objective"
              required
              disabled={loading}
            />
          </div>

          {/* Quest Description */}
          <div>
            <label className="block text-slate-100 text-sm font-medium mb-3">
              Mission Details
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
              placeholder="Describe your quest requirements and objectives"
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-slate-100 text-sm font-medium mb-3">
              Deadline
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="bg-slate-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              min={new Date().toISOString().split('T')[0]}
              disabled={loading}
            />
          </div>

          {/* Optional Goal Linking (can be added later) */}
          <div className="text-xs text-slate-500">
            💡 Pro Tip: Completing this quest awards you 5 XP and helps you level up!
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !formData.title.trim()}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium border border-cyan-500/30 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-600 disabled:hover:to-blue-600"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full"></div>
                Creating Quest...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <FaPlus className="text-sm" />
                Create Quest
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
