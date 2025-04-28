import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for Milestone
export interface Milestone extends Document {
  _id: mongoose.Types.ObjectId; // Ensure sub-documents have _id
  title: string;
  completed: boolean;
}

// Define the interface for Goal
export interface IGoal extends Document {
  title: string;
  description?: string;
  milestones: Types.DocumentArray<Milestone>; // Mongoose sub-document array
  status: "pending" | "in-progress" | "completed";
  progress: number;
  dueDate?: Date;
  owner: mongoose.Types.ObjectId;
}

// Milestone Schema
const milestoneSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Goal Schema
const goalSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    milestones: [milestoneSchema], // Sub-document array
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    progress: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IGoal>("Goal", goalSchema);
