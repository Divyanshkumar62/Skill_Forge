import { NotificationType } from '../models/notification.model';
export declare const createNotification: (userId: string, message: string, type?: NotificationType) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model").INotification> & import("../models/notification.model").INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=notify.d.ts.map