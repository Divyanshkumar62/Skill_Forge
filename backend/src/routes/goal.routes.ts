import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  completeGoal,
} from "../controllers/goal.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, createGoal)
router.get("/", protect, getGoals);
router.patch("/complete/:id", protect, completeGoal);
router.put("/:id", protect, updateGoal)
router.delete("/:id", protect, deleteGoal);

export default router;
