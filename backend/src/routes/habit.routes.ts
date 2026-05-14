import express from "express";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStreak,
} from "../controllers/habit.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { idParamSchema } from "../middlewares/validation.middleware";
import { createHabitSchema, updateHabitSchema } from "../validators/habit.validator";

const router = express.Router();

router.post("/", protect, validate({ body: createHabitSchema }), createHabit);
router.get("/", protect, getHabits);
router.put("/:id", protect, validate({ params: idParamSchema, body: updateHabitSchema }), updateHabit);
router.delete("/:id", protect, validate({ params: idParamSchema }), deleteHabit);
router.post("/:id/complete", protect, validate({ params: idParamSchema }), completeHabit);
router.get("/:id/streak", protect, validate({ params: idParamSchema }), getHabitStreak);

export default router;
