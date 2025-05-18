import { Request, Response } from "express";
import Goal from "../models/goal.model";
import mongoose, { Schema, Document, Types } from "mongoose";
import { awardXP } from "../services/xp.service";
import { checkAndAwardBadges } from "../services/badge.service";
import { updateStreak } from "../services/streak.service";

export const createMilestone = async (req: Request, res: Response): Promise<void> => {
    const { goalId } = req.params;
    const { title } = req.body;

    try {
        const goal = await Goal.findById(goalId)
        if(!goal){
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        if(goal.owner.toString() !== req.user.id){
            res.status(403).json({ message: "You are not authorized to create a milestone for this goal" });
            return;
        }
        const newMilestone = {
            title,
            completed: false
        };
        goal.milestones.push(newMilestone);
        await goal.save();
        
        res.status(201).json({ message: "Milestone created successfully", milestone: newMilestone });
        await checkAndAwardBadges(req.user.id);

    } catch (error) {
        console.error("Error creating milestone:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const completeMilestone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { goalId, milestoneId } = req.params;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      res.status(404).json({ message: "Goal not found!" });
      return;
    }
    if (goal.owner.toString() !== req.user.id) {
      res
        .status(403)
        .json({
          message: "You are not authorized to create a milestone for this goal",
        });
      return;
    }
   
    const milestone = goal.milestones.id(milestoneId)
    if (!milestone) {
      res.status(404).json({ message: "Milestone not found" });
      return;
    }
    milestone.completed = true;

    await awardXP(req.user.id, 20);
    
    const total = goal.milestones.length;
    const completed = goal.milestones.filter(m => m.completed).length;
    goal.progress = total > 0 ? (completed / total) * 100 : 0;
    
    await goal.save();
    res.status(200).json({ message: "Milestone completed successfully", milestone });

    await checkAndAwardBadges(req.user.id);
    
    await updateStreak(req.user.id); 
  } catch (error) {
    console.error("Error completing milestone:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMilestone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { goalId, milestoneId } = req.params;
  const { title } = req.body;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      res.status(404).json({ message: "Goal not found" });
      return;
    }
    if (goal.owner.toString() !== req.user.id) {
      res
        .status(403)
        .json({
          message: "You are not authorized to create a milestone for this goal",
        });
      return;
    }
    const milestone = goal.milestones.id(milestoneId);
    if(!milestone){
        res.status(404).json({ message: "Milestone not found" });
        return;
    }
    milestone.title = title;
    await goal.save();

    res
      .status(201)
      .json({
        message: "Milestone updated successfully",
        milestone: milestone,
      });
  } catch (error) {
    console.error("Error updating milestone:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMilestone = async (req: Request, res: Response): Promise<void> => {
    const { goalId, milestoneId } = req.params;

    try {
        
        const goal = await Goal.findById(goalId);
        if (!goal) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }

   
        if (goal.owner.toString() !== req.user.id.toString()) {
            res.status(403).json({ message: "You are not authorized to modify this goal" });
            return;
        }
        const index = goal.milestones.findIndex(
          (m) => m._id.toString() === milestoneId
        );

        if (index !== -1) {
          goal.milestones.splice(index, 1); // Remove the milestone at the given index
        }
        
    
        const total = goal.milestones.length;
        const completed = goal.milestones.filter((m) => m.completed).length;
        goal.progress = total > 0 ? (completed / total) * 100 : 0;

    
        await goal.save();
        res.status(200).json({ message: "Milestone deleted successfully" });
    } catch (error) {
        console.error("Error deleting milestone:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};