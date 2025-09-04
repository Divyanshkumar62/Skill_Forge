interface StreakTrackerProps {
  current: number;
  longest: number;
  lastUpdated?: string;
}

export default function StreakTracker({ current, longest, lastUpdated }: StreakTrackerProps) {
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    const date = new Date(lastUpdated);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const getStreakStatus = () => {
    if (!lastUpdated) return 'inactive';
    const date = new Date(lastUpdated);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'active';
    if (diffDays === 1) return 'warning';
    return 'broken';
  };

  const status = getStreakStatus();
  const statusColors = {
    active: 'text-green-600 bg-green-50 border-green-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    broken: 'text-red-600 bg-red-50 border-red-200',
    inactive: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Fire Streak 🔥</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-green-100 text-green-800' :
          status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status === 'active' ? 'Active' :
           status === 'warning' ? 'At Risk' :
           status === 'broken' ? 'Broken' : 'Inactive'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{current}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">{longest}</div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Last updated: {formatLastUpdated()}
      </div>

      {status === 'active' && (
        <div className="mt-2 flex items-center text-sm text-green-600">
          <span>🔥 Keep it up!</span>
        </div>
      )}

      {status === 'warning' && (
        <div className="mt-2 flex items-center text-sm text-yellow-600">
          <span>⚠️ Complete a task today to maintain your streak!</span>
        </div>
      )}

      {status === 'broken' && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <span>💔 Start a new streak by completing a task!</span>
        </div>
      )}
    </div>
  );
}
