import express from "express";
import * as rewardController from "../controllers/reward.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

// Apply authentication middleware to all reward routes
router.use(protect);

// GET /api/rewards/claimable - Get rewards user can claim
router.get("/claimable", rewardController.getClaimableRewards);

// POST /api/rewards/claim/:rewardId - Claim a reward
router.post("/claim/:rewardId", rewardController.claimReward);

export default router;
