"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimReward = exports.getClaimableRewards = void 0;
const reward_model_1 = require("../models/reward.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getClaimableRewards = async (userId) => {
    // Get all rewards and filter by XP requirements and claim status
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    return await reward_model_1.Reward.find({
        $or: [
            { claimedBy: { $not: { $elemMatch: { $eq: userObjectId } } } }, // Not claimed by this user
            { claimedBy: { $exists: false } } // Safety check for rewards without claimedBy array
        ]
    });
};
exports.getClaimableRewards = getClaimableRewards;
const claimReward = async (rewardId, userId) => {
    const reward = await reward_model_1.Reward.findById(rewardId);
    if (!reward)
        throw new Error("Reward not found");
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    // Check if user already claimed this reward
    if (reward.claimedBy.some(id => id.toString() === userId)) {
        throw new Error("Reward already claimed");
    }
    // Find and update the reward to add user to claimedBy array
    await reward_model_1.Reward.findByIdAndUpdate(rewardId, {
        $addToSet: { claimedBy: userObjectId }
    });
    return reward;
};
exports.claimReward = claimReward;
//# sourceMappingURL=rewards.service.js.map