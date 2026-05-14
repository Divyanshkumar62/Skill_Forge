import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  completeGoal,
} from "../controllers/goal.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { idParamSchema } from "../middlewares/validation.middleware";
import { createGoalSchema, updateGoalSchema } from "../validators/goal.validator";

const router = express.Router();

router.post("/", protect, validate({ body: createGoalSchema }), createGoal);
router.get("/", protect, getGoals);
router.patch("/complete/:id", protect, validate({ params: idParamSchema }), completeGoal);
router.put("/:id", protect, validate({ params: idParamSchema, body: updateGoalSchema }), updateGoal);
router.delete("/:id", protect, validate({ params: idParamSchema }), deleteGoal);

export default router;
