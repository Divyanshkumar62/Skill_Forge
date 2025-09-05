import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg animate-pulse">
            <span className="text-2xl font-bold text-white">⚡</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            Skill Forge
          </h1>
          <p className="text-purple-200 text-lg">Level Up Your Life</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"
            style={{ width: '75%' }}></div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-purple-300/20 rounded-2xl p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            {subtitle && <p className="text-purple-200">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
