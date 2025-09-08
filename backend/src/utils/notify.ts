import { Notification, NotificationType } from '../models/notification.model';
import User from '../models/user.model';

export const createNotification = async (userId: string, message: string, type: NotificationType = "tip") => {
    try {
        const notification = await Notification.create({
            user: userId,
            message,
            type
        });
        console.log(`In-app notification created for user ${userId}: ${message}`);
        return notification;
    } catch (err) {
        console.error("Error creating notification:", err)
        throw new Error("Failed to create notification")
    }
}

// Enhanced notification function that supports both email and in-app
export const createEnhancedNotification = async (
    userId: string,
    message: string,
    type: NotificationType = "tip",
    options: {
        includeEmail?: boolean;
        emailSubject?: string;
        priority?: 'low' | 'normal' | 'high';
    } = {}
) => {
    try {
        // Always create in-app notification
        const notification = await Notification.create({
            user: userId,
            message,
            type
        });

        console.log(`In-app notification created for user ${userId}: ${message}`);

        // Send email if requested
        if (options.includeEmail) {
            try {
                const user = await User.findById(userId).select('email name');
                if (user && user.email) {
                    // Use the existing email service
                    import('../utils/email').then(emailUtils => {
                        emailUtils.sendEmailReminder(
                            user.email,
                            options.emailSubject || `Skill Forge - ${type.charAt(0).toUpperCase() + type.slice(1)} Alert`,
                            message
                        );
                    }).catch(err => {
                        console.error('Failed to send email notification:', err);
                    });
                }
            } catch (emailError) {
                console.error('Error sending email notification:', emailError);
                // Don't fail the whole notification for email issues
            }
        }

        return notification;
    } catch (err) {
        console.error("Error creating enhanced notification:", err)
        throw new Error("Failed to create notification")
    }
}

// Utility to create reminder notification (combines email + in-app)
export const createReminder = async (userId: string, message: string, type: NotificationType = "reminder") => {
    return await createEnhancedNotification(userId, message, type, {
        includeEmail: true,
        emailSubject: `Skill Forge Reminder`,
        priority: 'normal'
    });
}

// Utility to create achievement notification
export const createAchievementNotification = async (userId: string, achievementMessage: string) => {
    return await createEnhancedNotification(userId, achievementMessage, "achievement", {
        includeEmail: true,
        emailSubject: "🎉 Achievement Unlocked!",
        priority: 'high'
    });
}

// Bulk notification helper
export const createBulkNotifications = async (
    userIds: string[],
    message: string,
    type: NotificationType = "tip"
) => {
    const results = [];
    for (const userId of userIds) {
        try {
            const notification = await createNotification(userId, message, type);
            results.push({ userId, success: true, notification });
        } catch (error) {
            console.error(`Failed to notify user ${userId}:`, error);
            results.push({ userId, success: false, error });
        }
    }
    return results;
};
