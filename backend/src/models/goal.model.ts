import mongoose, {Schema, Document } from 'mongoose'

interface Milestone {
    title: string;
    completed: boolean;
}

export interface IGoal extends Document {
    title: string;
    description?: string;
    milestones: Milestone[];
    status: "pending" | "in-progress" | "completed";
    progress: number;
    dueDate?: string;
    owner: mongoose.Types.ObjectId;
}

const milestoneSchema = new Schema<Milestone>({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const goalSchema = new Schema<IGoal>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    milestones: [milestoneSchema],
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
        type: Date
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })


export default mongoose.model<IGoal>("Goal", goalSchema)