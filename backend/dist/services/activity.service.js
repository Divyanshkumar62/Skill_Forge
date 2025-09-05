"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const activity_model_1 = require("../models/activity.model");
const logActivity = async (userId, type, description, metadata) => {
    try {
        await activity_model_1.Activity.create({
            user: userId,
            type,
            description,
            metadata,
        });
    }
    catch (err) {
        console.error("Failed to log activity:", err);
    }
};
exports.logActivity = logActivity;
//# sourceMappingURL=activity.service.js.map