import mongoose, { Schema , Document } from 'mongoose'

export interface IDailyTask extends Document {
    user: mongoose.Types.ObjectId;
    goal?: mongoose.Types.ObjectId;
    habit?: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const DailyTaskSchema = new Schema<IDailyTask>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
    },
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
    },
}, { timestamps: true })

export const DailyTask = mongoose.model<IDailyTask>("DailyTask", DailyTaskSchema)
