import { Router } from "express";
import {
  createMilestone,
  completeMilestone,
  updateMilestone,
  deleteMilestone
} from "../controllers/milestone.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/:goalId", protect, createMilestone);
router.patch("/:goalId/:milestoneId", protect, completeMilestone);
router.put("/:goalId/:milestoneId", protect, updateMilestone);
router.delete("/:goalId/:milestoneId", protect, deleteMilestone);

export default router;
