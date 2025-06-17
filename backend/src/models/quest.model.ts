import mongoose, { Schema, Document } from "mongoose";

export interface QuestDocument extends Document {
  title: string;
  description?: string;
  type: "daily" | "weekly";
  goal: number;
  progress: Map<string, number>; // userId -> progress count
  rewardXp: number;
  startDate: Date;
  endDate: Date;
}

const questSchema = new Schema<QuestDocument>(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ["daily", "weekly"], required: true },
    goal: { type: Number, required: true },
    rewardXp: { type: Number, required: true },
    progress: {
      type: Map,
      of: Number,
      default: {},
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Quest = mongoose.model<QuestDocument>("Quest", questSchema);
