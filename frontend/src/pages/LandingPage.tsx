import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/store';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-solo-shadow via-solo-primary to-solo-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-solo-glow/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-solo-purple/10 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-rarity-legendary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-solo-glow to-solo-purple rounded-lg flex items-center justify-center animate-power-pulse">
              <span className="text-xl font-bold text-white">⚔️</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-solo-glow via-solo-purple to-rarity-legendary bg-clip-text text-transparent">
              Skill Forge
            </h1>
          </div>
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-solo-accent/20 hover:bg-solo-accent/30 border border-solo-glow/30 rounded-lg text-solo-glow font-medium transition-all duration-300 hover:shadow-lg hover:shadow-solo-glow/20"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-solo-glow to-solo-purple bg-clip-text text-transparent animate-glow">
                  Level Up
                </span>
                <span className="block bg-gradient-to-r from-solo-purple via-rarity-legendary to-solo-glow bg-clip-text text-transparent">
                  Your Life
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-slate-300 max-w-2xl">
                Transform your daily habits, goals, and tasks into an epic RPG adventure. 
                <span className="text-solo-glow font-semibold">Only I can level up.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-solo-glow to-solo-purple hover:from-solo-purple hover:to-rarity-legendary text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-solo-glow/30 animate-power-pulse"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Begin Your Quest</span>
                  <span>⚡</span>
                </span>
              </button>
              <button
                onClick={handleLogin}
                className="px-8 py-4 bg-solo-accent/20 hover:bg-solo-accent/30 border-2 border-solo-glow/30 hover:border-solo-glow text-solo-glow font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-solo-glow/20"
              >
                Continue Journey
              </button>
            </div>

            {/* Power Stats */}
            <div className="flex justify-center lg:justify-start space-x-8 pt-8">
              <div className="text-center animate-slide-up">
                <div className="text-3xl font-bold text-rarity-legendary">∞</div>
                <div className="text-sm text-slate-400">Potential</div>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-solo-glow">SSS</div>
                <div className="text-sm text-slate-400">Rank</div>
              </div>
              <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold text-solo-purple">100%</div>
                <div className="text-sm text-slate-400">Growth</div>
              </div>
            </div>
          </div>

          {/* Right Content - Character/Visual */}
          <div className="relative animate-scale-in">
            <div className="relative bg-gradient-to-br from-solo-accent/20 to-solo-purple/20 rounded-3xl p-8 border border-solo-glow/20 backdrop-blur-sm">
              {/* Shadow Monarch Placeholder */}
              <div className="text-center space-y-6">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-solo-shadow via-solo-primary to-solo-glow rounded-full flex items-center justify-center text-8xl animate-float shadow-2xl shadow-solo-glow/20">
                  👤
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Shadow Monarch</h3>
                  <p className="text-solo-glow font-medium">"The power to grow stronger lies within."</p>
                </div>
              </div>

              {/* Power Level Indicator */}
              <div className="mt-8 bg-solo-shadow/50 rounded-xl p-4 border border-solo-glow/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Power Level</span>
                  <span className="text-sm text-rarity-legendary font-bold">MAX</span>
                </div>
                <div className="w-full bg-solo-primary rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-solo-glow via-solo-purple to-rarity-legendary animate-shimmer" style={{
                    background: 'linear-gradient(90deg, #6B9EFF 0%, #6A5ACD 50%, #FFD700 100%)',
                    backgroundSize: '200% 100%'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Floating Power Icons */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-rarity-legendary to-rarity-mythic rounded-lg flex items-center justify-center animate-float shadow-lg">
              <span className="text-xl">⚡</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-solo-purple to-solo-glow rounded-lg flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '1s' }}>
              <span className="text-xl">🗡️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-4">Level Up Your Skills</h3>
          <p className="text-xl text-slate-300">Transform everyday tasks into epic adventures</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: '🎯', title: 'Goals', desc: 'Set epic quests and achieve legendary status', color: 'from-rarity-rare to-rarity-epic' },
            { icon: '⚡', title: 'Habits', desc: 'Build powerful abilities through consistency', color: 'from-rarity-epic to-rarity-legendary' },
            { icon: '🏆', title: 'Rewards', desc: 'Earn treasures for your achievements', color: 'from-rarity-legendary to-rarity-mythic' },
            { icon: '🛡️', title: 'Badges', desc: 'Collect rare titles and accomplishments', color: 'from-rarity-mythic to-rarity-divine' }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="bg-solo-accent/10 hover:bg-solo-accent/20 border border-solo-glow/20 rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-solo-glow/10 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 bg-gradient-to-r from-solo-shadow via-solo-primary to-solo-shadow border-t border-solo-glow/20">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to become the <span className="text-solo-glow">Shadow Monarch</span> of your life?
          </h3>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of heroes who have already begun their leveling journey.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-10 py-4 bg-gradient-to-r from-solo-glow to-solo-purple hover:from-solo-purple hover:to-rarity-legendary text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-solo-glow/30 animate-power-pulse"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Arise, Shadow!</span>
              <span>👑</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;