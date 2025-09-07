import mongoose, { Schema, Document } from "mongoose";

export type NotificationType = "reminder" | "milestone" | "goal" | "tip" | "achievement";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ["reminder", "tip", "milestone", "goal", "achievement"],
        message: "Invalid notification type",
      },
      required: [true, "Notification type is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster queries
notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, read: 1 });

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
