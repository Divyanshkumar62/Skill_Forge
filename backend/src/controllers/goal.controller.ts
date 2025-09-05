import { Request, Response } from "express";
import Goal from '../models/goal.model'
import { awardXP } from "../services/xp.service";
import { checkAndAwardBadges } from "../services/badge.service";
import { updateStreak } from "../services/streak.service";
import { logActivity } from "../services/activity.service";

const calculateProgress = (milestones: { completed: boolean }[]): number => {
    if(milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.completed).length

    return Math.round((completed / milestones.length) * 100)                                                                 
}

export const createGoal = async (req: Request, res: Response): Promise<void> => {
    const { title, description, milestones, dueDate } = req.body;
    try {
        const progress = calculateProgress(milestones);
        const status = progress === 100 ? "completed": progress > 0 ? "in-progress" : "pending"

        const goal = await Goal.create({
            title,
            description,
            milestones,
            progress,
            status,
            dueDate,
            owner: req.user._id
        })

        res.status(201).json(goal)
        await checkAndAwardBadges(req.user.id);

        await logActivity(
          req.user._id,
          "goal_created",
          `Created goal "${goal.title}"`,
          {
            goalId: goal._id,
          }
        );
          

    } catch (err){
        console.error(err)
        res.status(500).json({message: "Internal server error!"})
    }
}

export const getGoals = async (req: Request, res: Response): Promise<void> => {
    const goals = await Goal.find({ owner: req.user._id })
    
    res.status(200).json(goals)
}


export const completeGoal = async (req: Request, res: Response): Promise<void> => {
  const { goalId } = req.params;

  try {
    const goal = await Goal.findById(goalId);

    if (!goal) {
        res.status(404).json({ message: "Goal not found" });
        return;
    }

    // Check if all milestones are completed
    const allCompleted = goal.milestones.every((milestone) => milestone.completed);

    if (!allCompleted) {
        res.status(400).json({ message: "Not all milestones completed yet" });
        return;
    }

    if (goal.status === "completed") {
        res.status(400).json({ message: "Goal is already completed" });
        return;
    }

    goal.status = "completed";
    goal.progress = 100; 
    await goal.save();

    await awardXP(req.user.id, 100);

    // Award extra XP if completed before due date
    if (new Date(Number(goal.dueDate)) > new Date()) {
      await awardXP(req.user.id, 10);
    }

    // Award bonus XP if goal had many milestones
    if (goal.milestones.length > 5) {
      await awardXP(req.user.id, 30);
    }

    await updateStreak(req.user.id);

    await checkAndAwardBadges(req.user.id);
    res.status(200).json({ message: "Goal completed successfully", goal });

  } catch (err) {
    console.error("Error completing goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateGoal = async (req: Request, res: Response): Promise<void> => {
    let goal = await Goal.findOne({ _id: req.params['id'], owner: req.user._id })

    if(!goal){
        res.status(404).json({message: "Goal not found!"})
    } else {
        const updateGoalData = req.body;
        if(updateGoalData.milestones){
            goal.milestones = updateGoalData.milestones;
            goal.progress = calculateProgress(updateGoalData.milestones);
            goal.status = goal!.progress === 100 ? "completed" : goal.progress > 0 ? "in-progress": "pending"
        }

        goal.set(updateGoalData)
    
        await goal.save()
        res.status(200).json(goal)

    }
};

export const deleteGoal = async (req: Request, res: Response) => {
    try {
        const goal = await Goal.findOneAndDelete({ _id: req.params['id'], owner: req.user._id })
        if(goal)
            res.status(200).json({ message: "Goal Deleted!"} )
        else
            res.status(404).json({ message: "Goal not found!"} )
    } catch (err){
        console.error(err)
        res.status(500).json({ message: "Internal server error!" })
    }
}