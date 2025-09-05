"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGoalReminderJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const goal_model_1 = __importDefault(require("../models/goal.model"));
const notify_1 = require("../utils/notify");
const email_1 = require("../utils/email");
const dayjs_1 = __importDefault(require("dayjs"));
const startGoalReminderJob = () => {
    node_cron_1.default.schedule("0 8 * * *", async () => {
        console.log("Running goals reminder job...");
        try {
            const today = (0, dayjs_1.default)();
            const goals = await goal_model_1.default.find({ completed: false })
                .populate("owner")
                .lean();
            console.log(`Found ${goals.length} active goals to check`);
            for (const goal of goals) {
                try {
                    const user = goal.owner;
                    if (!user || !user._id) {
                        console.error(`Invalid user data for goal ${goal._id}`);
                        continue;
                    }
                    const dueDate = (0, dayjs_1.default)(goal.dueDate);
                    const diffDays = dueDate.diff(today, "day");
                    if (diffDays === 2) {
                        const message = `⏳ Your goal "${goal.title}" is due in 2 days.`;
                        console.log(`Creating reminder for goal ${goal._id}`);
                        await (0, notify_1.createNotification)(user._id, message, "reminder");
                        await (0, email_1.sendEmailReminder)(user.email, "Goal Reminder", message);
                    }
                    if (diffDays <= -3) {
                        const message = `⚠️ Your goal "${goal.title}" is overdue by ${-diffDays} days. Let's fix this!`;
                        console.log(`Creating overdue notification for goal ${goal._id}`);
                        await (0, notify_1.createNotification)(user._id, message, "goal");
                        await (0, email_1.sendEmailReminder)(user.email, "Overdue Goal Alert", message);
                    }
                }
                catch (error) {
                    console.error(`Error processing goal ${goal._id}:`, error);
                }
            }
            console.log("✅ Goals reminder job completed successfully");
        }
        catch (error) {
            console.error("Error in goal reminder job:", error);
        }
    });
};
exports.startGoalReminderJob = startGoalReminderJob;
//# sourceMappingURL=goalReminder.job.js.map