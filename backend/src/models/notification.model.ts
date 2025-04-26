import mongoose, { Schema, Document } from "mongoose"

export type NotificationType = "reminder" | "milestone" | "goal" | "tip"

export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    type: NotificationType;
    message: string;
    read: boolean;
    createdAt: Date
}

const notificationSchema = new Schema<INotification>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["remainder", "tip", "milestone", "goal"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false 
    }
}, { timestamps: true })

export const Notification = mongoose.model<INotification>("Notification", notificationSchema)