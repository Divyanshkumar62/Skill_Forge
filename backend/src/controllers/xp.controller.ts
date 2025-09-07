import { Request, Response } from "express";
import User from "../models/user.model";

export const getXpStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
