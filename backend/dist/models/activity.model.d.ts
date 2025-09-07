import mongoose, { Document } from 'mongoose';
export type ActivityType = 'goal_created' | 'goal_completed' | 'milestone_completed' | 'habit_created' | 'habit_completed' | 'quest_completed' | 'reward_claimed' | 'daily_checkin';
export interface ActivityDocument extends Document {
    user: mongoose.Types.ObjectId;
    type: ActivityType;
    description: string;
    metadata?: any;
    createdAt: Date;
}
export declare const Activity: mongoose.Model<ActivityDocument, {}, {}, {}, mongoose.Document<unknown, {}, ActivityDocument> & ActivityDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=activity.model.d.ts.map