import express from "express";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
} from "../controllers/habit.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();


router.post("/", protect ,createHabit);
router.get("/", protect, getHabits);
router.put("/:id",protect, updateHabit);
router.delete("/:id", protect, deleteHabit);
router.post("/:id/complete", protect, completeHabit);

export default router;
