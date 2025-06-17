import mongoose, { Schema, Document } from "mongoose";

export interface RewardDocument extends Document {
  name: string;
  description?: string;
  xpCost: number;
  claimedBy: mongoose.Types.ObjectId[];
}

const rewardSchema = new Schema<RewardDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    xpCost: { type: Number, required: true },
    claimedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Reward = mongoose.model<RewardDocument>("Reward", rewardSchema);
