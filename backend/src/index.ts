import app from "./app";
import mongoose from "mongoose"
import dotenv from "dotenv"
import { startGoalReminderJob } from "./jobs/goalReminder.job";

dotenv.config();

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI!

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Mongodb Connected Successfully!")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err)
        process.exit(1) 
    })

// startGoalReminderJob() is called to start the cron job for goal reminders
startGoalReminderJob()