interface Badge {
  _id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
  maxDisplay?: number;
}

export default function BadgeDisplay({ badges, maxDisplay = 8 }: BadgeDisplayProps) {
  const displayedBadges = badges.filter(badge => badge.icon).slice(0, maxDisplay);
  const hiddenCount = Math.max(0, badges.length - maxDisplay);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Achievements 🏆</h3>

      {badges.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🗑️</div>
          <p className="text-gray-600">No badges earned yet</p>
          <p className="text-sm text-gray-500 mt-1">Complete habits and tasks to unlock achievements!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {displayedBadges.map((badge) => (
            <div
              key={badge._id}
              className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              title={`${badge.name}: ${badge.description}`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs text-center font-medium text-gray-900">{badge.name}</p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(badge.unlockedAt).toLocaleDateString()}
              </p>
            </div>
          ))}

          {hiddenCount > 0 && (
            <div className="flex flex-col items-center p-3 rounded-lg bg-gray-100">
              <div className="text-3xl mb-2">➕</div>
              <p className="text-xs text-center font-medium">+{hiddenCount} more</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <strong>Badge Ideas:</strong> 📖 First Habit Created • ✅ First Task Completed • 🔥 7-Day Streak • 📊 Analytics Pro
        </p>
      </div>
    </div>
  );
}
