import { NotificationType } from '../models/notification.model';
export declare const createNotification: (userId: string, message: string, type?: NotificationType) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model").INotification> & import("../models/notification.model").INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const createEnhancedNotification: (userId: string, message: string, type?: NotificationType, options?: {
    includeEmail?: boolean;
    emailSubject?: string;
    priority?: "low" | "normal" | "high";
}) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model").INotification> & import("../models/notification.model").INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const createReminder: (userId: string, message: string, type?: NotificationType) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model").INotification> & import("../models/notification.model").INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const createAchievementNotification: (userId: string, achievementMessage: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model").INotification> & import("../models/notification.model").INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const createBulkNotifications: (userIds: string[], message: string, type?: NotificationType) => Promise<({
    userId: string;
    success: boolean;
    notification: import("mongoose").Document<unknown, {}, import("../models/notification.model").INotification> & import("../models/notification.model").INotification & Required<{
        _id: unknown;
    }> & {
        __v: number;
    };
    error?: never;
} | {
    userId: string;
    success: boolean;
    error: unknown;
    notification?: never;
})[]>;
//# sourceMappingURL=notify.d.ts.map