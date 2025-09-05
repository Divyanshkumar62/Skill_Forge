import mongoose, { Document } from "mongoose";
export interface QuestDocument extends Document {
    title: string;
    description?: string;
    type: "daily" | "weekly";
    goal: number;
    progress: Map<string, number>;
    rewardXp: number;
    startDate: Date;
    endDate: Date;
}
export declare const Quest: mongoose.Model<QuestDocument, {}, {}, {}, mongoose.Document<unknown, {}, QuestDocument> & QuestDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=quest.model.d.ts.map