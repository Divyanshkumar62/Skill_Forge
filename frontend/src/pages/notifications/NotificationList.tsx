import { useEffect, useState } from 'react';
import { Bell, Trash2, CheckCircle, Filter } from 'lucide-react';
import { useNotifications } from '../../features/notifications/store';
import { NotificationItem } from '../../components/notifications/NotificationItem';
import type { Notification } from '../../types/notifications';

const NotificationList = () => {
  const {
    notifications,
    loading,
    error,
    fetchNotifications,
    deleteNotification
  } = useNotifications();

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Filter notifications
  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'unread') return !notification.read;
      if (filter === 'read') return notification.read;
      return true;
    })
    .filter(notification =>
      typeFilter === 'all' || notification.type === typeFilter
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const unreadCount = notifications.filter(n => !n.read).length;
  const uniqueTypes = [...new Set(notifications.map(n => n.type))];

  const handleMarkAsRead = async (notificationId: string) => {
    await useNotifications.getState().markAsRead(notificationId);
  };

  const handleDelete = async (notificationId: string) => {
    await useNotifications.getState().deleteNotification(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    for (const notification of unreadNotifications) {
      await useNotifications.getState().markAsRead(notification._id);
    }
  };

  const handleDeleteAll = async () => {
    for (const notification of notifications) {
      await useNotifications.getState().deleteNotification(notification._id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
              <p className="text-gray-400">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                <CheckCircle size={16} />
                Mark All Read
              </button>

              <button
                onClick={handleDeleteAll}
                disabled={notifications.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
              >
                <Trash2 size={16} />
                Delete All
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <label className="text-sm text-gray-300">Filter:</label>
            </div>

            {/* Read Status Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
              className="px-3 py-2 bg-gray-700 text-white text-sm rounded-md border border-gray-600 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700 text-white text-sm rounded-md border border-gray-600 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type} className="capitalize">
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-3 text-lg text-gray-400">Loading notifications...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-400 mb-2">Error loading notifications</div>
              <div className="text-sm text-gray-400">{error}</div>
              <button
                onClick={fetchNotifications}
                className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onClick={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}

            <div className="text-center py-6">
              <p className="text-sm text-gray-400">
                Showing {filteredNotifications.length} of {notifications.length} notifications
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <Bell size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {notifications.length === 0
                ? 'No notifications yet'
                : `No ${filter === 'all' ? '' : filter} ${typeFilter === 'all' ? '' : typeFilter} notifications`}
            </h3>
            <p className="text-gray-400">
              {notifications.length === 0
                ? 'You don\'t have any notifications yet.'
                : 'Try adjusting your filters to see more notifications.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
