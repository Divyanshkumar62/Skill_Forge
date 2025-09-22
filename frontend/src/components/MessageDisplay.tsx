import type { ReactNode } from "react";

interface MessageDisplayProps {
  type: 'error' | 'warning' | 'success' | 'info' | 'empty';
  title?: string;
  message: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function MessageDisplay({
  type,
  title,
  message,
  icon,
  action,
  className = ""
}: MessageDisplayProps) {
  const styles = {
    error: {
      bg: 'bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/30',
      text: 'text-red-300',
      icon: 'text-red-400',
      button: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      bg: 'bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-500/30',
      text: 'text-yellow-300',
      icon: 'text-yellow-400',
      button: 'bg-yellow-600 hover:bg-yellow-700'
    },
    success: {
      bg: 'bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/30',
      text: 'text-green-300',
      icon: 'text-green-400',
      button: 'bg-green-600 hover:bg-green-700'
    },
    info: {
      bg: 'bg-gradient-to-br from-cyber-primary/20 to-blue-800/10 border-cyber-primary/30',
      text: 'text-blue-300',
      icon: 'text-cyber-primary',
      button: 'bg-cyber-primary hover:bg-blue-600'
    },
    empty: {
      bg: 'bg-gradient-to-br from-slate-800/70 to-slate-900/60 border-slate-600/30',
      text: 'text-slate-300',
      icon: 'text-slate-400',
      button: 'bg-slate-600 hover:bg-slate-700'
    }
  };

  const style = styles[type];

  return (
    <div 
      className={`rounded-xl border backdrop-blur-sm p-4 md:p-6 text-center relative overflow-hidden ${style.bg} ${style.text} ${className}`}
      role="alert"
      aria-live="polite"
    >
      {/* Cyber glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow" />
      
      <div className="relative flex flex-col items-center space-y-4">
        {icon && (
          <div className={`text-4xl md:text-6xl ${style.icon} animate-float`}>
            {icon}
          </div>
        )}
        
        {title && (
          <h3 className={`text-lg md:text-xl font-bold uppercase tracking-wider ${style.text}`}>
            {title}
          </h3>
        )}
        
        <p className={`text-sm md:text-base leading-relaxed ${style.text} opacity-90`}>
          {message}
        </p>
        
        {action && (
          <button
            onClick={action.onClick}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 shadow-lg uppercase tracking-wider text-sm md:text-base ${style.button}`}
            aria-label={action.label}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
