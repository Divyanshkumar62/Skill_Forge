import { Reward } from "../models/reward.model";
import mongoose from "mongoose";

export const getClaimableRewards = async (userId: string) => {
  // Get all rewards and filter by XP requirements and claim status
  const userObjectId = new mongoose.Types.ObjectId(userId);
  return await Reward.find({
    $or: [
      { claimedBy: { $not: { $elemMatch: { $eq: userObjectId } } } }, // Not claimed by this user
      { claimedBy: { $exists: false } } // Safety check for rewards without claimedBy array
    ]
  });
};

export const claimReward = async (rewardId: string, userId: string) => {
  const reward = await Reward.findById(rewardId);
  if (!reward) throw new Error("Reward not found");

  const userObjectId = new mongoose.Types.ObjectId(userId);

  // Check if user already claimed this reward
  if (reward.claimedBy.some(id => id.toString() === userId)) {
    throw new Error("Reward already claimed");
  }

  // Find and update the reward to add user to claimedBy array
  await Reward.findByIdAndUpdate(rewardId, {
    $addToSet: { claimedBy: userObjectId }
  });

  return reward;
};
