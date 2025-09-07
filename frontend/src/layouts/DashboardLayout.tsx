import { useAuth } from "../features/auth/store";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: '/', label: 'System Stats', icon: '🔮' },
    { path: '/habits', label: 'Skill Tree', icon: '⚔️' },
    { path: '/tasks', label: 'Daily Quests', icon: '🎯' },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Sidebar - Solo Leveling Inspired */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-r border-cyan-500/20 text-white p-6 relative overflow-hidden">
        {/* System Interface Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" />

        <div className="flex items-center space-x-2 mb-8 relative">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
            <span className="text-white font-bold text-lg">⚡</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
              SKILL FORGE
            </h1>
            <p className="text-xs text-cyan-400/60 -mt-1 tracking-wider">LEVELING SYSTEM</p>
          </div>
        </div>
        <nav className="space-y-2 relative">
          {navItems.map((item, _index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/30'
                  : 'hover:bg-gradient-to-r hover:from-slate-800 hover:to-blue-900 hover:text-cyan-200 text-slate-300 border border-transparent hover:border-cyan-500/20'
              }`}
            >
              {/* System Interface Line */}
              <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'bg-slate-600 group-hover:bg-cyan-400'
              }`} />

              <span className="text-lg ml-3">{item.icon}</span>
              <span className="font-medium tracking-wide">{item.label.toUpperCase()}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white shadow-lg transform hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content - System Interface Style */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 bg-gradient-to-br from-slate-900/95 via-blue-950/30 to-slate-900/95 min-h-screen relative">
          {/* System Interface Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />

          {/* Cyber Interface Borders */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

          <div className="relative max-w-7xl mx-auto text-slate-100">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
