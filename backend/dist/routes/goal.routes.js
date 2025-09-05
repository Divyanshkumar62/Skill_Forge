"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goal_controller_1 = require("../controllers/goal.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, goal_controller_1.createGoal);
router.get("/", auth_middleware_1.protect, goal_controller_1.getGoals);
router.patch("/complete/:id", auth_middleware_1.protect, goal_controller_1.completeGoal);
router.put("/:id", auth_middleware_1.protect, goal_controller_1.updateGoal);
router.delete("/:id", auth_middleware_1.protect, goal_controller_1.deleteGoal);
exports.default = router;
//# sourceMappingURL=goal.routes.js.map