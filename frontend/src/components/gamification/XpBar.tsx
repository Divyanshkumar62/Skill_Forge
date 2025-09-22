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
    <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/60 backdrop-blur-sm border border-cyber-primary/20 p-4 md:p-6 rounded-xl shadow-xl hover:border-cyber-primary/40 transition-all duration-300 relative overflow-hidden">
      {/* Cyber glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-primary/5 to-transparent animate-pulse-slow" />
      
      {/* Left border accent */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyber-primary to-blue-500"></div>
      
      <div className="relative">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-cyber-primary to-blue-600 rounded-lg flex items-center justify-center border border-cyber-primary/30">
              <span className="text-white text-sm md:text-lg font-bold">⚡</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-100 uppercase tracking-wider">
                LEVEL {level}
              </h3>
              <p className="text-xs md:text-sm text-cyber-primary/80 -mt-1">SYSTEM POWER</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyber-primary to-blue-400 bg-clip-text text-transparent">
              {xpInCurrentLevel}
            </span>
            <span className="text-slate-400 text-sm md:text-base"> / {xpToNextLevel}</span>
            <p className="text-xs text-slate-400 uppercase tracking-wide">XP</p>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="relative">
          <div className="w-full bg-slate-700/50 rounded-full h-3 md:h-4 border border-slate-600/30">
            <div
              className="bg-gradient-to-r from-cyber-primary via-blue-500 to-cyber-primary h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden shadow-lg shadow-cyber-primary/30"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%' }} />
            </div>
          </div>
          
          {/* Progress percentage indicator */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-slate-500 uppercase tracking-wide">LVL {level}</span>
            <span className="text-xs font-medium text-cyber-primary">
              {Math.round(progressPercentage)}% Complete
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">LVL {level + 1}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
