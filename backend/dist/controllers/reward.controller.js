"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.claimReward = exports.getClaimableRewards = void 0;
const reward_model_1 = require("../models/reward.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const xp_service_1 = require("../services/xp.service");
const getClaimableRewards = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Get user to check XP balance
        const user = await user_model_1.default.findById(userId).select("xp level");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Get all rewards and filter by XP cost and availability
        const allRewards = await reward_model_1.Reward.find({}).lean();
        // Filter rewards user can claim (has enough XP and hasn't claimed)
        const claimableRewards = allRewards.filter(reward => user.xp >= reward.xpCost && !reward.claimedBy.some((claimedUserId) => claimedUserId.toString() === userId));
        res.json({
            rewards: claimableRewards.map(reward => ({
                _id: reward._id,
                name: reward.name,
                description: reward.description,
                xpCost: reward.xpCost
            }))
        });
    }
    catch (error) {
        console.error("Error getting claimable rewards:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getClaimableRewards = getClaimableRewards;
const claimReward = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { rewardId } = req.params;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!rewardId) {
            res.status(400).json({ message: "Reward ID is required" });
            return;
        }
        // Get user with XP info
        const user = await user_model_1.default.findById(userId).select("xp level name");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Get reward
        const reward = await reward_model_1.Reward.findById(rewardId);
        if (!reward) {
            res.status(404).json({ message: "Reward not found" });
            return;
        }
        // Check if user already claimed this reward
        if (reward.claimedBy.some((claimedUserId) => claimedUserId.toString() === userId)) {
            res.status(400).json({ message: "Reward already claimed" });
            return;
        }
        // Check XP cost
        if (user.xp < reward.xpCost) {
            res.status(400).json({
                message: `Insufficient XP. You have ${user.xp}, but need ${reward.xpCost}`
            });
            return;
        }
        // Deduct XP cost
        await (0, xp_service_1.awardXP)(userId, -reward.xpCost);
        // Mark reward as claimed by this user
        await reward_model_1.Reward.findByIdAndUpdate(rewardId, {
            $addToSet: { claimedBy: userId }
        });
        // Log the claim in user profile (could also create a notification)
        // This could trigger badge checks or other rewards
        await createClaimNotification(userId, reward.name);
        res.json({
            message: "Reward claimed successfully",
            reward: {
                _id: reward._id,
                name: reward.name,
                description: reward.description,
                xpCost: reward.xpCost
            },
            remainingXp: Math.max(0, user.xp - reward.xpCost)
        });
    }
    catch (error) {
        console.error("Error claiming reward:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.claimReward = claimReward;
// Helper function to create a notification for reward claim
const createClaimNotification = async (userId, rewardName) => {
    try {
        // This could integrate with your existing notification system
        // For now, we could add this to a user activity log
        console.log(`User ${userId} claimed reward: ${rewardName}`);
    }
    catch (error) {
        console.error("Error creating claim notification:", error);
        // Don't fail the main operation if notification fails
    }
};
//# sourceMappingURL=reward.controller.js.map