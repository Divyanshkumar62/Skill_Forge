import { Notification, NotificationType } from '../models/notification.model'

export const createNotification = async (userId: {}, message: string, type: NotificationType = "tip") => {
    try {
        await Notification.create({
            user: userId,
            message,
            type
        })
    } catch (err){
        console.error("Error creating notification:", err)

    }
}