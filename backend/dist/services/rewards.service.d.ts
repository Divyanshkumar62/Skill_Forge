import mongoose from "mongoose";
export declare const getClaimableRewards: (userId: string) => Promise<(mongoose.Document<unknown, {}, import("../models/reward.model").RewardDocument> & import("../models/reward.model").RewardDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const claimReward: (rewardId: string, userId: string) => Promise<mongoose.Document<unknown, {}, import("../models/reward.model").RewardDocument> & import("../models/reward.model").RewardDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=rewards.service.d.ts.map