import mongoose, { Document } from 'mongoose';
export interface HabitDocument extends Document {
    title: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'custom';
    customDays?: number;
    user: mongoose.Types.ObjectId;
    completedDates: Date[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Habit: mongoose.Model<HabitDocument, {}, {}, {}, mongoose.Document<unknown, {}, HabitDocument> & HabitDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=habit.model.d.ts.map