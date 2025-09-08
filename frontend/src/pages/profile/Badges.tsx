import { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useGamification } from "../../features/gamification/store";

export default function Badges() {
  const { badges, loadBadgeData } = useGamification();

  useEffect(() => {
    loadBadgeData();
  }, [loadBadgeData]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🏆</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Achievement Badges
            </h2>
            <p className="text-slate-400 text-sm">Your earned achievements and milestones</p>
          </div>
        </div>

        {badges.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-2">No Badges Yet!</h3>
            <p className="text-slate-500">
              Complete tasks, achieve streaks, and earn rewards to unlock badges!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {badges.map((badge, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/80 via-slate-900/70 to-slate-800/80 backdrop-blur-sm border border-orange-500/25 p-6 rounded-xl shadow-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-400/50 shadow-lg">
                    <span className="text-white text-2xl">{badge.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{badge.title}</h3>
                  <p className="text-sm text-slate-400">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
