"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const notification_model_1 = require("../models/notification.model");
const createNotification = async (userId, message, type = "tip") => {
    try {
        const notification = await notification_model_1.Notification.create({
            user: userId,
            message,
            type
        });
        return notification;
    }
    catch (err) {
        console.error("Error creating notification:", err);
        throw new Error("Failed to create notification");
    }
};
exports.createNotification = createNotification;
//# sourceMappingURL=notify.js.map