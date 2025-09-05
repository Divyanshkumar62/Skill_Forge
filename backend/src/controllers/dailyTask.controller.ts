import { Request, Response } from "express";
import * as taskService from "../services/dailyTask.service";

export const createDailyTask = async (req: Request, res: Response) => {
  const task = await taskService.createTask({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(task);
};

export const getMyTodayTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getTodayTasks(req.user._id);
  res.json(tasks);
};

export const markTaskComplete = async (req: Request, res: Response) => {
  const task = await taskService.completeTask(req.params['id'] as string, req.user._id);
  res.json({ message: 'Task completed', task });
};

export const deleteMyTask = async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params['id'] as string);
  res.status(204).send();
};
