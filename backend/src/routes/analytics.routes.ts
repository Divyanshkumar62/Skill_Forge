import express from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  getWeeklyActivity,
  getXpSummary,
  getHeatmapData,
} from "../controllers/analytics.controller";

const router = express.Router();
router.use(protect);

router.get("/weekly-activity", getWeeklyActivity);
router.get("/xp-summary", getXpSummary);
router.get("/heatmap", getHeatmapData);

export default router;
