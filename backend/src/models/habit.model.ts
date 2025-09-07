import mongoose, { Document, Schema } from 'mongoose'

export interface HabitDocument extends Document {
    title: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'custom';
    customDays?: number;
    daysOfWeek?: number[]; // 0=Monday, 1=Tuesday, ..., 6=Sunday
    startDate?: Date;
    endDate?: Date;
    user: mongoose.Types.ObjectId;
    completedDates: Date[];
    streakCount: number;
    lastCompletedDate?: Date;
    xpReward: number;
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
            type: Number,
            default: 1,
        },
        daysOfWeek: {
            type: [Number], // 0=Monday, 1=Tuesday, ..., 6=Sunday
            default: [],
            validate: {
                validator: function(arr: number[]) {
                    return arr.length === 0 || arr.every(day => day >= 0 && day <= 6);
                },
                message: 'Days of week must be numbers 0-6'
            }
        },
        startDate: {
            type: Date,
            default: () => new Date(),
        },
        endDate: {
            type: Date,
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
        streakCount: {
            type: Number,
            default: 0,
        },
        lastCompletedDate: {
            type: Date,
        },
        xpReward: {
            type: Number,
            default: 10,
        },
    },
    { timestamps: true }
)

export const Habit = mongoose.model<HabitDocument>('Habit', habitSchema)
