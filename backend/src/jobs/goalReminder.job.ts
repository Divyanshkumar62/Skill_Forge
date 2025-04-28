import cron from "node-cron";
import Goal from "../models/goal.model";
import User from "../models/user.model";
import { createNotification } from "../utils/notify";
import { sendEmailReminder } from "../utils/email";
import dayjs from "dayjs";

export const startGoalReminderJob = () => {
  cron.schedule("0 8 * * *", async () => {
    console.log("Running goals reminder job...");

    try {
      const today = dayjs();
      const goals = await Goal.find({ completed: false })
        .populate("owner")
        .lean();

      console.log(`Found ${goals.length} active goals to check`);

      for (const goal of goals) {
        try {
          const user = goal.owner as any;
          if (!user || !user._id) {
            console.error(`Invalid user data for goal ${goal._id}`);
            continue;
          }

          const dueDate = dayjs(goal.dueDate);
          const diffDays = dueDate.diff(today, "day");

          if (diffDays === 2) {
            const message = `⏳ Your goal "${goal.title}" is due in 2 days.`;
            console.log(`Creating reminder for goal ${goal._id}`);

            await createNotification(user._id, message, "reminder");
            await sendEmailReminder(user.email, "Goal Reminder", message);
          }

          if (diffDays <= -3) {
            const message = `⚠️ Your goal "${
              goal.title
            }" is overdue by ${-diffDays} days. Let's fix this!`;
            console.log(`Creating overdue notification for goal ${goal._id}`);

            await createNotification(user._id, message, "goal");
            await sendEmailReminder(user.email, "Overdue Goal Alert", message);
          }
        } catch (error) {
          console.error(`Error processing goal ${goal._id}:`, error);
        }
      }
      console.log("✅ Goals reminder job completed successfully");
    } catch (error) {
      console.error("Error in goal reminder job:", error);
    }
  });
};
