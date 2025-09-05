"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const goalReminder_job_1 = require("./jobs/goalReminder.job");
dotenv_1.default.config();
const PORT = process.env['PORT'] || 5000;
const MONGO_URI = process.env['MONGO_URI'];
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Mongodb Connected Successfully!");
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
// startGoalReminderJob() is called to start the cron job for goal reminders
(0, goalReminder_job_1.startGoalReminderJob)();
//# sourceMappingURL=index.js.map