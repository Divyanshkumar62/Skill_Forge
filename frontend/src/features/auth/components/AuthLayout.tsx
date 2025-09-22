import React from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../store';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './AuthHeader';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-solo-shadow via-solo-primary to-solo-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-solo-glow/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-solo-purple/10 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-rarity-legendary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-solo-glow rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-solo-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <AuthHeader />

      {/* Navigation */}
      <nav className="relative z-10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-solo-glow to-solo-purple rounded-lg flex items-center justify-center animate-power-pulse group-hover:scale-110 transition-transform">
              <span className="text-lg sm:text-xl font-bold text-white">⚔️</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-solo-glow via-solo-purple to-rarity-legendary bg-clip-text text-transparent">
              Skill Forge
            </h1>
          </button>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Side - Brand & Motivational Content */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 lg:p-8 animate-fade-in">
              <div className="text-center space-y-6 lg:space-y-8">
                {/* Shadow Monarch Character */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-solo-shadow via-solo-primary to-solo-glow rounded-full flex items-center justify-center shadow-2xl shadow-solo-glow/20 animate-float">
                  <span className="text-6xl lg:text-7xl">👤</span>
                </div>

                {/* Brand Title */}
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-solo-glow via-solo-purple to-rarity-legendary bg-clip-text text-transparent mb-2 animate-glow">
                    Shadow Monarch
                  </h1>
                  <p className="text-lg lg:text-xl text-slate-300">Arise and Level Up</p>
                </div>

                {/* Solo Leveling Quote */}
                <div className="bg-solo-accent/20 backdrop-blur-sm rounded-xl p-6 border border-solo-glow/20 animate-slide-up">
                  <blockquote className="text-lg italic text-slate-200 mb-3">
                    "Only I can level up. The power to grow stronger lies within."
                  </blockquote>
                  <cite className="text-solo-glow font-medium">- Sung Jin-Woo</cite>
                </div>

                {/* Power Level Display */}
                <div className="w-full max-w-sm mx-auto animate-scale-in">
                  <div className="bg-gradient-to-br from-solo-accent/20 to-solo-purple/20 rounded-xl p-6 border border-solo-glow/20">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">⚡</div>
                      <p className="text-sm text-slate-400">
                        Unlock your true potential
                      </p>
                    </div>
                    
                    {/* Power Meter */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Power Level</span>
                        <span>∞</span>
                      </div>
                      <div className="w-full bg-solo-primary rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-solo-glow via-solo-purple to-rarity-legendary animate-shimmer" 
                             style={{
                               background: 'linear-gradient(90deg, #6B9EFF 0%, #6A5ACD 50%, #FFD700 100%)',
                               backgroundSize: '200% 100%'
                             }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Footer */}
                {user && (
                  <div className="flex justify-center space-x-6 text-sm text-slate-400 animate-fade-in">
                    <div className="text-center">
                      <div className="font-bold text-solo-glow text-lg">{user.level}</div>
                      <div>Level</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-solo-purple text-lg">{user.xp}</div>
                      <div>XP</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full max-w-md mx-auto lg:max-w-none animate-slide-up">
              <div className="bg-solo-accent/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-solo-glow/20 hover:border-solo-glow/30 transition-all duration-300">
                <div className="text-center mb-6 lg:mb-8">
                  {/* Mobile Logo */}
                  <div className="lg:hidden mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-solo-glow to-solo-purple rounded-full flex items-center justify-center animate-power-pulse">
                      <span className="text-2xl">⚔️</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h2>
                  <p className="text-slate-400 text-sm sm:text-base">{subtitle}</p>
                </div>

                {children}

                {/* Mobile Motivation Banner */}
                <div className="lg:hidden mt-6 sm:mt-8 text-center">
                  <div className="bg-gradient-to-r from-solo-glow/20 to-solo-purple/20 rounded-lg p-4 border border-solo-glow/20">
                    <h3 className="text-lg font-bold text-slate-200 mb-1">Become the Shadow Monarch</h3>
                    <p className="text-sm text-slate-400">"Arise and conquer your goals"</p>
                  </div>
                </div>

                {/* Back to Landing Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate('/')}
                    className="text-solo-glow hover:text-solo-purple transition-colors text-sm font-medium"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
