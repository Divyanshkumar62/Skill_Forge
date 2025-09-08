import mongoose, { Document } from 'mongoose';
export interface IDailyTask extends Document {
    user: mongoose.Types.ObjectId;
    goal?: mongoose.Types.ObjectId;
    habit?: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const DailyTask: mongoose.Model<IDailyTask, {}, {}, {}, mongoose.Document<unknown, {}, IDailyTask> & IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=dailyTask.model.d.ts.map