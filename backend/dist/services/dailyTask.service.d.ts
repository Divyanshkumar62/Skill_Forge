export declare const createTask: (data: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getTodayTasks: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const completeTask: (taskId: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const deleteTask: (taskId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/dailyTask.model").IDailyTask> & import("../models/dailyTask.model").IDailyTask & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
//# sourceMappingURL=dailyTask.service.d.ts.map