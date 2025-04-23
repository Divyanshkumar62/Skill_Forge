import { Request, Response } from "express";
import Goal from '../models/goal.model'

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

    } catch (err){
        console.error(err)
        res.status(500).json({message: "Internal server error!"})
    }
}

export const getGoals = async (req: Request, res: Response): Promise<void> => {
    const goals = await Goal.find({ owner: req.user._id })

    res.status(200).json(goals)
}

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
    let goal = await Goal.findOne({ _id: req.params.id, owner: req.user._id })

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
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if(goal)
        res.status(200).json({ message: "Goal Deleted!"} )
    else
        res.status(404).json({ message: "Goal not found!"} )
}