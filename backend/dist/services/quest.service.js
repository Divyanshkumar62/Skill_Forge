"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeQuestStep = exports.getActiveQuests = void 0;
const quest_model_1 = require("../models/quest.model");
const xp_service_1 = require("./xp.service");
const getActiveQuests = async () => {
    const now = new Date();
    return await quest_model_1.Quest.find({
        startDate: { $lte: now },
        endDate: { $gte: now }
    });
};
exports.getActiveQuests = getActiveQuests;
const completeQuestStep = async (questId, userId) => {
    const quest = await quest_model_1.Quest.findById(questId);
    if (!quest)
        throw new Error("Quest not found");
    if (!userId)
        throw new Error("User ID is required");
    const currentProgress = quest.progress.get(userId) || 0;
    if (currentProgress >= quest.goal)
        throw new Error("Quest already completed");
    quest.progress.set(userId, currentProgress + 1);
    await quest.save();
    // Award XP if completed
    if (currentProgress + 1 >= quest.goal) {
        await (0, xp_service_1.awardXP)(userId, quest.rewardXp);
    }
    return quest;
};
exports.completeQuestStep = completeQuestStep;
//# sourceMappingURL=quest.service.js.map