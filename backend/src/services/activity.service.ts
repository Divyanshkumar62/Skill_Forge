import { Activity, ActivityType } from "../models/activity.model";

export const logActivity = async (
  userId: string,
  type: ActivityType,
  description: string,
  metadata?: any
) => {
  try {
    await Activity.create({
      user: userId,
      type,
      description,
      metadata,
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
};
