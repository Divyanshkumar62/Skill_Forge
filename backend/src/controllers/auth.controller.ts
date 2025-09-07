import { Request, Response } from 'express'
import User from '../models/user.model'
import generateToken from '../utils/generateToken'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email })
        if(userExists){
            res.status(400).json({ message: "User already exists!" });
        } else{
            const user = await User.create({ name, email, password });
            if (user) {
              res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                level: user.level,
                token: generateToken(user._id),
              });
            }
        } 
    } catch (err){
        console.error(err)
        res.status(500).json({message: "Internal server error"})
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if(!user){
            res.status(401).json({message: "Please Register first!"})
        }
        if(user && (await user.comparePassword(password))){
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                level: user.level,
                token: generateToken(user._id)
            })
        } else {
            res.status(403).json({message: "Invalid Credentials!"})
        }
    } catch (err){
        console.log(err)
        res.status(500).json({message: "Internal server error"})
    }
}
