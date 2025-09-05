"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const analytics_controller_1 = require("../controllers/analytics.controller");
const router = express_1.default.Router();
router.use(auth_middleware_1.protect);
router.get("/weekly-activity", analytics_controller_1.getWeeklyActivity);
router.get("/xp-summary", analytics_controller_1.getXpSummary);
router.get("/heatmap", analytics_controller_1.getHeatmapData);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map