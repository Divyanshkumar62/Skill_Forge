import express from "express";
import * as questController from "../controllers/quest.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protect, questController.getQuests);
router.post("/complete/:questId", protect, questController.completeQuestStep);

export default router;
