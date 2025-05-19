import express from "express";
import * as dailyTaskController from "../controllers/dailyTask.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();


router.post("/", protect, dailyTaskController.createDailyTask);
router.get("/today", protect, dailyTaskController.getMyTodayTasks);
router.patch("/complete/:id", protect, dailyTaskController.markTaskComplete);
router.delete("/:id", protect, dailyTaskController.deleteMyTask);

export default router;
