interface XpBarProps {
  currentXp: number;
  level: number;
  nextLevelXp?: number;
}

export default function XpBar({ currentXp, level, nextLevelXp = (level + 1) * 100 }: XpBarProps) {
  const currentLevelXp = level * 100;
  const xpInCurrentLevel = currentXp - currentLevelXp;
  const xpToNextLevel = nextLevelXp - currentLevelXp;
  const progressPercentage = Math.min((xpInCurrentLevel / xpToNextLevel) * 100, 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Level {level}</h3>
        <span className="text-sm text-gray-600">
          {xpInCurrentLevel} / {xpToNextLevel} XP
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500">Level {level}</span>
        <span className="text-xs text-gray-500">Level {level + 1}</span>
      </div>
    </div>
  );
}
