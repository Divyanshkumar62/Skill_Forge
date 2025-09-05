import mongoose, { Document } from "mongoose";
export interface RewardDocument extends Document {
    name: string;
    description?: string;
    xpCost: number;
    claimedBy: mongoose.Types.ObjectId[];
}
export declare const Reward: mongoose.Model<RewardDocument, {}, {}, {}, mongoose.Document<unknown, {}, RewardDocument> & RewardDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=reward.model.d.ts.map