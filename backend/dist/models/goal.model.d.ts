import mongoose, { Document, Types } from "mongoose";
export interface Milestone extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    completed: boolean;
}
export interface IGoal extends Document {
    title: string;
    description?: string;
    milestones: Types.DocumentArray<Milestone>;
    status: "pending" | "in-progress" | "completed";
    progress: number;
    dueDate?: Date;
    owner: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<IGoal, {}, {}, {}, mongoose.Document<unknown, {}, IGoal> & IGoal & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=goal.model.d.ts.map