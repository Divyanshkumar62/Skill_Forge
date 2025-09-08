export declare const createTask: (data: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getAllTasks: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getTodayTasks: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const updateTask: (taskId: string, userId: string, updateData: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const completeTask: (taskId: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const deleteTask: (taskId: string, userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
//# sourceMappingURL=dailyTask.service.d.ts.map