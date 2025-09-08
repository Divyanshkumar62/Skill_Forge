import express from "express";
import * as xpController from "../controllers/xp.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// Apply authentication middleware to all XP routes
router.use(protect);

// POST /api/xp/earn - Award XP to authenticated user
router.post("/earn", xpController.earnXP);

// GET /api/xp/status - Get user's current XP status
router.get("/status", xpController.getXpStatus);

export default router;
