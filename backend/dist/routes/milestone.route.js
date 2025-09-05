"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const milestone_controller_1 = require("../controllers/milestone.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/:goalId", auth_middleware_1.protect, milestone_controller_1.createMilestone);
router.patch("/:goalId/:milestoneId", auth_middleware_1.protect, milestone_controller_1.completeMilestone);
router.put("/:goalId/:milestoneId", auth_middleware_1.protect, milestone_controller_1.updateMilestone);
router.delete("/:goalId/:milestoneId", auth_middleware_1.protect, milestone_controller_1.deleteMilestone);
exports.default = router;
//# sourceMappingURL=milestone.route.js.map