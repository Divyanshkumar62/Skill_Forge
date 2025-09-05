"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const habit_controller_1 = require("../controllers/habit.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, habit_controller_1.createHabit);
router.get("/", auth_middleware_1.protect, habit_controller_1.getHabits);
router.put("/:id", auth_middleware_1.protect, habit_controller_1.updateHabit);
router.delete("/:id", auth_middleware_1.protect, habit_controller_1.deleteHabit);
router.post("/:id/complete", auth_middleware_1.protect, habit_controller_1.completeHabit);
exports.default = router;
//# sourceMappingURL=habit.routes.js.map