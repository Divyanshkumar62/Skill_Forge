import { useAuth } from "../features/auth/store";
import { useNavigate, Link, useLocation } from "react-router-dom";
import XpBar from "../components/gamification/XpBar";
import { useGamification } from "../features/gamification/store";
import NotificationBell from "../components/notifications/NotificationBell";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const { xp, level } = useGamification();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: '/', label: 'System Stats', icon: '🔮' },
    { path: '/habits', label: 'Skill Tree', icon: '⚔️' },
    { path: '/tasks', label: 'Daily Quests', icon: '🎯' },
    { path: '/goals', label: 'Epic Goals', icon: '🏆' },
    { path: '/badges', label: 'Achievements', icon: '🎖️' },
    { path: '/rewards', label: 'Rewards', icon: '💎' },
    { path: '/notifications', label: 'Messages', icon: '📡' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 
        bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 
        border-r border-cyber-primary/20 text-white p-4 md:p-6 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-0
        overflow-y-auto
      `}>
        {/* System Interface Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-primary/5 to-transparent animate-pulse-slow" />

        {/* Mobile Close Button */}
        <button
          onClick={closeMobileMenu}
          className="lg:hidden absolute top-4 right-4 text-cyber-primary hover:text-white transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-cyber-primary rounded"
          aria-label="Close navigation menu"
        >
          <FaTimes size={20} />
        </button>

        <div className="flex items-center space-x-2 mb-6 md:mb-8 relative">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyber-primary to-blue-600 rounded-lg flex items-center justify-center border border-cyber-primary/50 shadow-lg shadow-cyber-primary/20">
            <span className="text-white font-bold text-sm md:text-lg" aria-hidden="true">⚡</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyber-primary via-blue-400 to-cyber-primary bg-clip-text text-transparent drop-shadow-sm">
              SKILL FORGE
            </h1>
            <p className="text-xs text-cyber-primary/60 -mt-1 tracking-wider hidden md:block" aria-label="Productivity leveling system">
              LEVELING SYSTEM
            </p>
          </div>
        </div>
        <nav className="space-y-1 md:space-y-2 relative" role="navigation" aria-label="Main navigation">
          {navItems.map((item, _index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={`flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 relative text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-cyber-primary ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-cyber-primary/80 to-blue-600/80 text-white shadow-lg shadow-cyber-primary/30 border border-cyber-primary/30'
                  : 'hover:bg-gradient-to-r hover:from-slate-800 hover:to-blue-900 hover:text-cyber-primary text-slate-300 border border-transparent hover:border-cyber-primary/20'
              }`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              aria-label={`Navigate to ${item.label}`}
            >
              {/* System Interface Line */}
              <div className={`absolute left-1 md:left-2 top-1/2 -translate-y-1/2 w-0.5 h-3 md:h-4 rounded-full transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-cyber-primary shadow-lg shadow-cyber-primary/50'
                  : 'bg-slate-600 group-hover:bg-cyber-primary'
              }`} aria-hidden="true" />

              <span className="text-base md:text-lg ml-2 md:ml-3" aria-hidden="true">{item.icon}</span>
              <span className="font-medium tracking-wide">{item.label.toUpperCase()}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white shadow-lg transform hover:scale-105 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Logout from application"
          >
            🚪 LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content - System Interface Style */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden bg-gradient-to-r from-slate-900/95 via-blue-950/30 to-slate-900/95 border-b border-cyber-primary/20 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              className="text-cyber-primary hover:text-white transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-cyber-primary rounded"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <FaBars size={20} />
            </button>
            <div className="text-cyber-primary font-semibold text-sm" aria-live="polite">
              SYSTEM • LVL {level}
            </div>
            <NotificationBell />
          </div>
        </div>

        {/* Desktop Top Header */}
        <header className="hidden lg:block w-full bg-gradient-to-r from-slate-900/95 via-blue-950/30 to-slate-900/95 border-b border-cyber-primary/20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/5 via-transparent to-cyber-primary/5" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
            <div className="text-cyber-primary font-semibold">
              SYSTEM STATUS • Level {level}
            </div>
            <NotificationBell />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900/95 via-blue-950/30 to-slate-900/95 min-h-screen relative">
          {/* System Interface Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />

          {/* Cyber Interface Borders */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-primary/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-primary/60 to-transparent" />

          {/* XP Progress Header */}
          <div className="relative mb-4 md:mb-6">
            <XpBar currentXp={xp} level={level} />
          </div>

          <div className="relative max-w-7xl mx-auto text-slate-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
