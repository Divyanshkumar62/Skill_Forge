import cron from "node-cron";
import Goal from "../models/goal.model";
import { createReminder } from "../utils/notify";
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
            const message = `⏳ Your goal "${goal.title}" is due in 2 days. Take action now to achieve your objective!`;
            console.log(`Creating reminder for goal ${goal._id}`);

            await createReminder(user._id, message, "reminder");
          }

          if (diffDays <= -3) {
            const overdueDays = -diffDays;
            const message = `⚠️ Your goal "${goal.title}" is overdue by ${overdueDays} days. Time to get back on track and complete your mission!`;
            console.log(`Creating overdue notification for goal ${goal._id}`);

            await createReminder(user._id, message, "goal");
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
