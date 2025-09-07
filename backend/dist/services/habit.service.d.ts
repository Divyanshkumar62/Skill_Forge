export declare const createHabit: (userId: string, data: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/habit.model").HabitDocument> & import("../models/habit.model").HabitDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getHabits: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/habit.model").HabitDocument> & import("../models/habit.model").HabitDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const updateHabit: (habitId: string, userId: string, data: any) => Promise<(import("mongoose").Document<unknown, {}, import("../models/habit.model").HabitDocument> & import("../models/habit.model").HabitDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const deleteHabit: (habitId: string, userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/habit.model").HabitDocument> & import("../models/habit.model").HabitDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const getHabitStreak: (habitId: string, userId: string) => Promise<{
    habitId: unknown;
    currentStreak: number;
    longestStreak: number;
    lastCompletedDate: Date | undefined;
    totalCompletions: number;
}>;
export declare const completeHabit: (habitId: string, userId: string, timezone?: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/habit.model").HabitDocument> & import("../models/habit.model").HabitDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=habit.service.d.ts.map