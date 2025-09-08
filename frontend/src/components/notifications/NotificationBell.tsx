import { useState, useEffect, useRef } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '../../features/notifications/store';
import { NotificationItem } from './NotificationItem';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, fetchNotifications, loading } = useNotifications();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.slice(0, 5);

  const handleNotificationClick = async (notificationId: string) => {
    await useNotifications.getState().markAsRead(notificationId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'No unread notifications'}
            </p>
          </div>

          <div className="py-2">
            {loading ? (
              <div className="px-4 py-8 text-center text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
                Loading...
              </div>
            ) : recentNotifications.length > 0 ? (
              <>
                {recentNotifications.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    notification={notification}
                    onClick={handleNotificationClick}
                    onDelete={(id) => useNotifications.getState().deleteNotification(id)}
                  />
                ))}

                {notifications.length > 5 && (
                  <div className="px-4 py-3 border-t border-gray-700">
                    <button
                      onClick={() => {
                        window.location.href = '/notifications';
                        setIsOpen(false);
                      }}
                      className="w-full text-center text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      View all notifications → ({notifications.length})
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="px-4 py-8 text-center text-gray-400">
                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-700">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-gray-400 hover:text-gray-300 text-sm"
            >
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
