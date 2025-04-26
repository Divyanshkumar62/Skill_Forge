import { Router } from "express";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notification.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, markNotificationAsRead);
router.delete("/:id", protect, deleteNotification);

export default router;
