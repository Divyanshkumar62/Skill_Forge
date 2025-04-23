import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/").post(protect, createGoal).get(protect, getGoals);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
