import mongoose, { Schema, Document } from 'mongoose';

export type ActivityType =
  | 'goal_created'
  | 'goal_completed'
  | 'milestone_completed'
  | 'habit_completed'
  | 'quest_completed'
  | 'reward_claimed'
  | 'daily_checkin';

export interface ActivityDocument extends Document {
  user: mongoose.Types.ObjectId;
  type: ActivityType;
  description: string;
  metadata?: any;
  createdAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
