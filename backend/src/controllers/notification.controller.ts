import { Request, Response } from 'express';
import {Notification}  from '../models/notification.model';


export const getNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 })
        res.status(200).json(notifications)
    } catch (error) {
        console.error("Error fetching notifications:", error)
        res.status(500).json({ error: "Failed to send Notification" })
    }
}

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
        res.status(404).json({ error: "Notification not found." });
    } else {
        res.status(200).json(notification);
    }

  } catch (error) {
    res.status(500).json({ error: "Failed to mark as read." });
  }
};


export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!notification) {
      res.status(404).json({ error: "Notification not found." });
    } else{
        res.status(200).json({ message: "Notification deleted." });
    }

  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification." });
  }
};