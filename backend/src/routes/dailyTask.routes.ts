import express from "express";
import * as dailyTaskController from "../controllers/dailyTask.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { idParamSchema } from "../middlewares/validation.middleware";
import { createDailyTaskSchema, updateDailyTaskSchema } from "../validators/dailyTask.validator";

const router = express.Router();

router.get("/", protect, dailyTaskController.getMyTasks);
router.post("/", protect, validate({ body: createDailyTaskSchema }), dailyTaskController.createDailyTask);
router.get("/today", protect, dailyTaskController.getMyTodayTasks);
router.put("/:id", protect, validate({ params: idParamSchema, body: updateDailyTaskSchema }), dailyTaskController.updateMyTask);
router.post("/complete/:id", protect, validate({ params: idParamSchema }), dailyTaskController.markTaskComplete);
router.delete("/:id", protect, validate({ params: idParamSchema }), dailyTaskController.deleteMyTask);

export default router;