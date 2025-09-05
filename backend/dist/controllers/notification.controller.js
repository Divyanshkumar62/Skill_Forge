"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markNotificationAsRead = exports.getNotifications = void 0;
const notification_model_1 = require("../models/notification.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getNotifications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }
        const userId = req.user.id;
        // console.log("userid--->", userId);
        // console.log("req.user--->", req.user);
        if (!mongoose_1.default.Types.ObjectId.isValid(userId || '')) {
            res.status(400).json({ error: "Invalid user ID format" });
            return;
        }
        console.log("Fetching notifications for user:", userId);
        const notifications = await notification_model_1.Notification.find({ user: userId })
            .sort({ createdAt: -1 })
            .lean();
        console.log(`Found ${notifications.length} notifications for user ${userId}`);
        res.status(200).json(notifications);
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};
exports.getNotifications = getNotifications;
const markNotificationAsRead = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }
        const { id } = req.params;
        const userId = req.user._id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id) ||
            !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ error: "Invalid ID format" });
            return;
        }
        const notification = await notification_model_1.Notification.findOneAndUpdate({ _id: id, user: userId }, { read: true }, { new: true });
        if (!notification) {
            res.status(404).json({ error: "Notification not found" });
            return;
        }
        res.status(200).json(notification);
    }
    catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
};
exports.markNotificationAsRead = markNotificationAsRead;
const deleteNotification = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }
        const { id } = req.params;
        const userId = req.user._id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id) ||
            !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ error: "Invalid ID format" });
            return;
        }
        const notification = await notification_model_1.Notification.findOneAndDelete({
            _id: id,
            user: userId,
        });
        if (!notification) {
            res.status(404).json({ error: "Notification not found" });
            return;
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ error: "Failed to delete notification" });
    }
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notification.controller.js.map