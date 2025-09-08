"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBulkNotifications = exports.createAchievementNotification = exports.createReminder = exports.createEnhancedNotification = exports.createNotification = void 0;
const notification_model_1 = require("../models/notification.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const createNotification = async (userId, message, type = "tip") => {
    try {
        const notification = await notification_model_1.Notification.create({
            user: userId,
            message,
            type
        });
        console.log(`In-app notification created for user ${userId}: ${message}`);
        return notification;
    }
    catch (err) {
        console.error("Error creating notification:", err);
        throw new Error("Failed to create notification");
    }
};
exports.createNotification = createNotification;
// Enhanced notification function that supports both email and in-app
const createEnhancedNotification = async (userId, message, type = "tip", options = {}) => {
    try {
        // Always create in-app notification
        const notification = await notification_model_1.Notification.create({
            user: userId,
            message,
            type
        });
        console.log(`In-app notification created for user ${userId}: ${message}`);
        // Send email if requested
        if (options.includeEmail) {
            try {
                const user = await user_model_1.default.findById(userId).select('email name');
                if (user && user.email) {
                    // Use the existing email service
                    Promise.resolve().then(() => __importStar(require('../utils/email'))).then(emailUtils => {
                        emailUtils.sendEmailReminder(user.email, options.emailSubject || `Skill Forge - ${type.charAt(0).toUpperCase() + type.slice(1)} Alert`, message);
                    }).catch(err => {
                        console.error('Failed to send email notification:', err);
                    });
                }
            }
            catch (emailError) {
                console.error('Error sending email notification:', emailError);
                // Don't fail the whole notification for email issues
            }
        }
        return notification;
    }
    catch (err) {
        console.error("Error creating enhanced notification:", err);
        throw new Error("Failed to create notification");
    }
};
exports.createEnhancedNotification = createEnhancedNotification;
// Utility to create reminder notification (combines email + in-app)
const createReminder = async (userId, message, type = "reminder") => {
    return await (0, exports.createEnhancedNotification)(userId, message, type, {
        includeEmail: true,
        emailSubject: `Skill Forge Reminder`,
        priority: 'normal'
    });
};
exports.createReminder = createReminder;
// Utility to create achievement notification
const createAchievementNotification = async (userId, achievementMessage) => {
    return await (0, exports.createEnhancedNotification)(userId, achievementMessage, "achievement", {
        includeEmail: true,
        emailSubject: "🎉 Achievement Unlocked!",
        priority: 'high'
    });
};
exports.createAchievementNotification = createAchievementNotification;
// Bulk notification helper
const createBulkNotifications = async (userIds, message, type = "tip") => {
    const results = [];
    for (const userId of userIds) {
        try {
            const notification = await (0, exports.createNotification)(userId, message, type);
            results.push({ userId, success: true, notification });
        }
        catch (error) {
            console.error(`Failed to notify user ${userId}:`, error);
            results.push({ userId, success: false, error });
        }
    }
    return results;
};
exports.createBulkNotifications = createBulkNotifications;
//# sourceMappingURL=notify.js.map