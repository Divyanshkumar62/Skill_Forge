"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const goal_routes_1 = __importDefault(require("./routes/goal.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const milestone_route_1 = __importDefault(require("./routes/milestone.route"));
const dailyTask_routes_1 = __importDefault(require("./routes/dailyTask.routes"));
const habit_routes_1 = __importDefault(require("./routes/habit.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello World...!");
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/goals', goal_routes_1.default);
app.use('/api/notifications', notification_routes_1.default);
app.use('/api/milestones', milestone_route_1.default);
app.use('/api/daily-tasks', dailyTask_routes_1.default);
app.use('/api/habits', habit_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map