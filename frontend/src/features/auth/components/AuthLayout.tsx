import React from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../store';
import AuthHeader from './AuthHeader';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <AuthHeader />

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Side - Brand & Motivational Content */}
          <div className="hidden lg:flex flex-col items-center justify-center p-8">
            <div className="text-center space-y-6">
              {/* Logo/Icon */}
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">⚔️</span>
              </div>

              {/* Brand Title */}
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Skill Forge
                </h1>
                <p className="text-xl text-slate-300">Level Up Your Life</p>
              </div>

              {/* Motivational Quote */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <blockquote className="text-lg italic text-slate-200 mb-2">
                  "Every habit, every goal, every achievement - is a step toward becoming the hero of your own story."
                </blockquote>
                <cite className="text-cyan-400 font-medium">- Skill Forge</cite>
              </div>

              {/* Character Illustration Placeholder */}
              <div className="w-full max-w-xs mx-auto">
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl p-6 border border-cyan-500/20">
                  <div className="text-6xl text-center mb-2">🎮</div>
                  <p className="text-sm text-slate-400">
                    Transform your potential into power
                  </p>
                </div>
              </div>

              {/* Stats Footer */}
              {user && (
                <div className="flex justify-center space-x-6 text-sm text-slate-400">
                  <div className="text-center">
                    <div className="font-bold text-cyan-400">{user.level}</div>
                    <div>Level</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-400">{user.xp}</div>
                    <div>XP</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-slate-400">{subtitle}</p>
            </div>

            {children}

            {/* Mobile Motivation Banner (visible only on mobile) */}
            <div className="lg:hidden mt-8 text-center">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-4 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-slate-200 mb-1">Level Up Your Life</h3>
                <p className="text-sm text-slate-400">Join the adventure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
