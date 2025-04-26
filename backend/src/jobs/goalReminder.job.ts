import cron from "node-cron"
import Goal from '../models/goal.model';
import User from '../models/user.model';
import { createNotification } from '../utils/notify'
import { sendEmailReminder } from '../utils/email'
import dayjs from "dayjs";

export const startGoalReminderJob = () => {
    cron.schedule("0 8 * * *", async () => {
        console.log("Running goals reminder job...")

        const today = dayjs();
        const goals = await Goal.find({ completed: false }).populate("owner")

        for(const goal of goals) {
            const user = goal.owner as any;
            const dueDate = dayjs(goal.dueDate);
            const diffDays = dueDate.diff(today, "day")

            if(diffDays == 2){
                const message = `⏳ Your goal ${goal.title} is due in 2 days.`

                await createNotification(user._id, message, "reminder")
                await sendEmailReminder(user.email, "Goal Reminder", message)
            }

            if(diffDays <= -3){
                const message = `⚠️ Your goal "${goal.title}" is overdue by ${-diffDays} days. Let’s fix this!`

                await createNotification(user._id, message, "goal");
                await sendEmailReminder(
                  user.email,
                  "Overdue Goal Alert",
                  message
                );
            }
        }
        console.log("✅ Goals reminder job completed.")
    })
}