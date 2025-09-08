import { format } from 'date-fns';
import { X, BellRing, Trophy, Target, Flag, MessageSquare } from 'lucide-react';
import type { Notification } from '../../types/notifications';

interface NotificationItemProps {
  notification: Notification;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'achievement':
    case 'gamification':
      return <Trophy size={16} className="text-yellow-500" />;
    case 'goal':
    case 'reminder':
      return <Target size={16} className="text-red-500" />;
    case 'milestone':
      return <Flag size={16} className="text-blue-500" />;
    case 'tip':
    case 'general':
      return <MessageSquare size={16} className="text-gray-500" />;
    default:
      return <BellRing size={16} className="text-cyan-500" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'achievement':
    case 'gamification':
      return 'border-yellow-500/30 bg-yellow-500/5';
    case 'goal':
    case 'reminder':
      return 'border-red-500/30 bg-red-500/5';
    case 'milestone':
      return 'border-blue-500/30 bg-blue-500/5';
    case 'tip':
    case 'general':
      return 'border-gray-500/30 bg-gray-500/5';
    default:
      return 'border-cyan-500/30 bg-cyan-500/5';
  }
};

export const NotificationItem = ({ notification, onClick, onDelete }: NotificationItemProps) => {
  const handleClick = () => {
    onClick(notification._id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification._id);
  };

  const isRecent = new Date(notification.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000); // Within last 24 hours

  return (
    <div
      onClick={handleClick}
      className={`
        relative px-4 py-3 border-l-2 cursor-pointer transition-all duration-200
        hover:bg-gray-800/50 hover:border-opacity-70
        ${getNotificationColor(notification.type)}
        ${notification.read ? 'opacity-70' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-1">
            {getIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-white leading-relaxed">
              {notification.message}
            </p>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span className="uppercase text-[10px] font-semibold tracking-wide opacity-70">
                {notification.type}
              </span>
              <span>
                {isRecent
                  ? format(new Date(notification.createdAt), 'HH:mm')
                  : format(new Date(notification.createdAt), 'MMM dd')
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {!notification.read && (
            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
          )}

          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded transition-colors duration-150"
            title="Delete notification"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
