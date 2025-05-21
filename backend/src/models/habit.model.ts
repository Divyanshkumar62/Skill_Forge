import mongoose, { Document, Schema } from 'mongoose'

export interface HabitDocument extends Document {
    title: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'custom';
    customDays?: number;
    user: mongoose.Types.ObjectId;
    completedDates: Date[];
    createdAt: Date;
    updatedAt: Date;
}

const habitSchema = new Schema<HabitDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly', 'custom'],
            required: true,
        },
        customDays: {
            type: Number
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        completedDates: {
            type: [Date],
            default: [],
        },
    },
    { timestamps: true }
)

export const Habit = mongoose.model<HabitDocument>('Habit', habitSchema)