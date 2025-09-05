import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    xp: number;
    level: number;
    completedGoals: number;
    completedMilestones: number;
    badges: Array<{
        title: string;
        achievedAt: Date;
    }>;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
    notificationPreferences: {
        habitReminders: boolean;
        goalReminders: boolean;
        milestoneReminders: boolean;
        streakReminders: boolean;
        gamificationNotifications: boolean;
        weeklyReports: boolean;
    };
    comparePassword(password: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map