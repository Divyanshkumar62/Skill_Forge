import { Notification, NotificationType } from '../models/notification.model'

export const createNotification = async (userId: string, message: string, type: NotificationType = "tip") => {
    try {
        const notification = await Notification.create({
            user: userId,
            message,
            type
        })
        return notification;
    } catch (err) {
        console.error("Error creating notification:", err)
        throw new Error("Failed to create notification")
    }
}