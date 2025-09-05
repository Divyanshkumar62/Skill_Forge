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
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600'
    },
    empty: {
      bg: 'bg-gray-50 border-gray-200',
      text: 'text-gray-800',
      icon: 'text-gray-600'
    }
  };

  const style = styles[type];

  return (
    <div className={`rounded-lg border p-6 text-center ${style.bg} ${style.text} ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {icon && (
          <div className={`text-6xl ${style.icon}`}>
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
        )}
        <p className="text-sm opacity-90">
          {message}
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-4 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-gray-700 font-medium transition-colors duration-200"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
