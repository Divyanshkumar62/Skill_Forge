import mongoose, { Document } from "mongoose";
export type NotificationType = "reminder" | "milestone" | "goal" | "tip" | "achievement";
export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    type: NotificationType;
    message: string;
    read: boolean;
    createdAt: Date;
}
export declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=notification.model.d.ts.map