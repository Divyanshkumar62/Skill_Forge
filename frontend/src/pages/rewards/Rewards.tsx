import { useEffect, useState } from "react";
import { FaTrophy, FaCoins, FaStar, FaGem, FaCheck, FaLock } from "react-icons/fa";
import DashboardLayout from "../../layouts/DashboardLayout";
// import MessageDisplay from "../../components/MessageDisplay";

interface Reward {
  _id: string;
  name: string;
  description: string;
  xpCost: number;
}

export default function Rewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);

  // Mock data - will be replaced with actual API calls
  const mockRewards: Reward[] = [
    {
      _id: "1",
      name: "Epic Achievement Badge",
      description: "A special badge that shows your dedication to leveling up",
      xpCost: 50
    },
    {
      _id: "2",
      name: "Golden Frame Theme",
      description: "Unlock a beautiful golden frame for your profile",
      xpCost: 100
    },
    {
      _id: "3",
      name: "Premium Skill Boost",
      description: "Double XP for all skills for 24 hours",
      xpCost: 200
    },
    {
      _id: "4",
      name: "Legendary Title",
      description: "Unlock the 'Legend of Skills' legendary title",
      xpCost: 500
    },
    {
      _id: "5",
      name: "Exclusive Music Track",
      description: "Get access to motivational epic battle music theme",
      xpCost: 750
    },
    {
      _id: "6",
      name: "Ultimate Profile Emote",
      description: "Unlock the rare 'System Hunter' animated emote",
      xpCost: 1000
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRewards(mockRewards);
      setLoading(false);
    }, 1000);
  }, []);

  const handleClaimReward = async (rewardId: string) => {
    setClaiming(rewardId);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Congratulations! You claimed: "${mockRewards.find(r => r._id === rewardId)?.name}"`);
      // In real implementation, this would update the rewards list
    } catch (error) {
      alert('Failed to claim reward. Please try again.');
    } finally {
      setClaiming(null);
    }
  };

  const getRewardIcon = (index: number) => {
    const icons = [FaTrophy, FaCoins, FaStar, FaGem, FaTrophy, FaStar];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="text-2xl" />;
  };

  const getRarityColor = (xpCost: number) => {
    if (xpCost >= 750) return "from-yellow-400 to-orange-500";
    if (xpCost >= 500) return "from-purple-400 to-pink-500";
    if (xpCost >= 200) return "from-blue-400 to-cyan-500";
    return "from-cyan-400 to-green-500";
  };

  const userXp = 475; // Mock user XP - this would come from gamification store

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">🎁 Reward Shop</h1>
            <p className="text-slate-400">Level up to unlock legendary rewards!</p>
          </div>

          {/* Loading skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-800/70 backdrop-blur-sm border border-cyan-500/30 p-6 rounded-xl shadow-xl">
                  <div className="h-8 bg-slate-600 rounded mb-4"></div>
                  <div className="h-16 bg-slate-700 rounded mb-4"></div>
                  <div className="h-6 bg-slate-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl" />
          <div className="relative p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center border border-yellow-400/50">
                <FaTrophy className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  🎁 Reward Shop
                </h1>
                <p className="text-slate-400">Level up to unlock legendary rewards and exclusive titles!</p>
              </div>
            </div>

            {/* User XP Summary */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCoins className="text-yellow-400 text-lg" />
                  <span className="text-slate-200 font-medium">Current XP: {userXp.toLocaleString()}</span>
                </div>
                <div className="text-sm text-slate-400">
                  Keep completing quests to earn more XP!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward, index) => {
            const canClaim = userXp >= reward.xpCost;
            const isClaiming = claiming === reward._id;

            return (
              <div
                key={reward._id}
                className={`relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-sm border rounded-xl shadow-xl hover:transform hover:scale-105 transition-all duration-300 ${canClaim
                    ? 'border-yellow-500/30 hover:border-yellow-400/60 hover:shadow-yellow-500/20'
                    : 'border-slate-600/30 opacity-75'
                  }`}
              >
                {/* Rarity Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(reward.xpCost)} rounded-xl opacity-10`} />

                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getRarityColor(reward.xpCost)} rounded-lg flex items-center justify-center border border-slate-600 shadow-lg`}>
                      {getRewardIcon(index)}
                    </div>
                    {!canClaim && (
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <FaLock className="text-xs" />
                        <span>Locked</span>
                      </div>
                    )}
                    {canClaim && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <FaCheck className="text-xs" />
                        <span>Available</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-100 mb-2">{reward.name}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{reward.description}</p>
                  </div>

                  {/* Cost */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCoins className="text-yellow-400" />
                      <span className="text-yellow-300 font-bold">{reward.xpCost.toLocaleString()} XP</span>
                      {!canClaim && (
                        <span className="text-slate-500 text-sm">
                          (+{(reward.xpCost - userXp).toLocaleString()} needed)
                        </span>
                      )}
                    </div>

                    {/* Claim Button */}
                    <button
                      onClick={() => canClaim && handleClaimReward(reward._id)}
                      disabled={!canClaim || isClaiming}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium ${
                        canClaim
                          ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white border border-yellow-500/30 shadow-lg shadow-yellow-500/20'
                          : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      } disabled:opacity-50`}
                    >
                      {isClaiming ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                          Claiming...
                        </>
                      ) : canClaim ? (
                        <>
                          <FaCheck className="text-xs" />
                          Claim
                        </>
                      ) : (
                        <>
                          <FaLock className="text-xs" />
                          Locked
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/20 rounded-lg p-6 text-center">
          <FaTrophy className="text-3xl text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-100 mb-2">Keep Leveling Up!</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Complete more daily quests, habits, and goals to accumulate XP and unlock these exclusive rewards.
            Your dedication to self-improvement will be richly rewarded!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
