import { useEffect, useState } from "react";
import { FaTrophy, FaRocket, FaFire, FaMagic } from "react-icons/fa";

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  previousLevel: number;
  onClose: () => void;
}

export default function LevelUpModal({
  isOpen,
  newLevel,
  previousLevel,
  onClose
}: LevelUpModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const levelDifference = newLevel - previousLevel;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);

      // Animation sequence
      const timer1 = setTimeout(() => setCurrentStep(1), 500); // Show message
      const timer2 = setTimeout(() => setCurrentStep(2), 1200); // Show rewards
      const timer3 = setTimeout(() => setCurrentStep(3), 2200); // Show button

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const getLevelTitle = (level: number) => {
    if (level >= 10) return "MASTER";
    if (level >= 7) return "EXPERT";
    if (level >= 5) return "ADEPT";
    if (level >= 3) return "APPRENTICE";
    return "NOVICE";
  };

  const getLevelDescription = (level: number) => {
    const descriptions = {
      1: "Welcome to the skill system!",
      2: "Your journey begins now!",
      3: "You're getting the hang of this!",
      4: "Skills are steadily improving!",
      5: "You've become a skilled apprentice!",
      6: "Your dedication is showing!",
      7: "You're becoming a true expert!",
      8: "Master-level skills acquired!",
      9: "Legendary skill progression!",
      10: "You are a true master!"
    };
    return descriptions[level as keyof typeof descriptions] || "Beyond legendary!";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative max-w-lg w-full">
        {/* Main Modal */}
        <div className={`bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl border border-yellow-500/30 shadow-2xl overflow-hidden transform transition-all duration-500 ${currentStep >= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          {/* Header Glow */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-yellow-500/20 to-transparent" />

          <div className="relative p-8">
            {/* Icon Animation */}
            <div className={`flex justify-center mb-6 transition-all duration-700 ${currentStep >= 0 ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}>
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center border-4 border-yellow-400/50 shadow-lg shadow-yellow-500/50 pulse">
                <div className={`transition-all duration-1000 ${currentStep >= 1 ? 'rotate-360' : 'rotate-0'}`}>
                  <FaTrophy className="text-4xl text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className={`text-center mb-6 transition-all duration-700 ${currentStep >= 1 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent mb-2">
                LEVEL UP! 🚀
              </h1>
              <div className="text-2xl text-slate-300 mb-4">
                Level {previousLevel} → Level {newLevel}
                {levelDifference > 1 && (
                  <span className="text-yellow-400 ml-2">
                    (+{levelDifference} levels!)
                  </span>
                )}
              </div>
              <div className="text-lg bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg px-4 py-2 mb-4">
                <span className="text-yellow-400 font-bold">{getLevelTitle(newLevel)}</span>
              </div>
            </div>

            {/* Description */}
            <div className={`text-center mb-8 transition-all duration-700 ${currentStep >= 2 ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'}`}>
              <p className="text-slate-300 text-lg mb-4">
                {getLevelDescription(newLevel)}
              </p>

              {/* Rewards */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 mb-6">
                <h3 className="text-yellow-400 font-bold mb-3 text-lg">🎁 Level Up Rewards:</h3>
                <div className="space-y-2 text-slate-200">
                  <div className="flex items-center gap-3">
                    <FaMagic className="text-yellow-400" />
                    <span>Exclusive {getLevelTitle(newLevel)} Title</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaFire className="text-yellow-400" />
                    <span>+10% Skill Experience Bonus</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRocket className="text-yellow-400" />
                    <span>Access to Advanced Quests</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`text-center transition-all duration-700 ${currentStep >= 3 ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-90'}`}>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-bold text-lg hover:transform hover:scale-105 shadow-lg shadow-yellow-500/30 border border-yellow-500/30"
              >
                CONTINUE LEVELING UP ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
