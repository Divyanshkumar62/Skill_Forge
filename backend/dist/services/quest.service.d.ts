export declare const getActiveQuests: () => Promise<(import("mongoose").Document<unknown, {}, import("../models/quest.model").QuestDocument> & import("../models/quest.model").QuestDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const completeQuestStep: (questId: string, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/quest.model").QuestDocument> & import("../models/quest.model").QuestDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=quest.service.d.ts.map