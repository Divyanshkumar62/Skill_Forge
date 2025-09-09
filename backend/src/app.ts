import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import goalRoutes from './routes/goal.routes'
import notificationRoutes from './routes/notification.routes';
import milestoneRoutes from './routes/milestone.route';
import dailyTaskRoutes from './routes/dailyTask.routes'
import habitRoutes from './routes/habit.routes';
import analyticsRoutes from "./routes/analytics.routes";
import questRoutes from './routes/quest.routes';
import xpRoutes from './routes/xp.routes';
import rewardRoutes from './routes/reward.routes';
const app = express()

const allowedOrigins = process.env['ALLOWED_ORIGINS']?.split(",") || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json())

app.get("/", (_req, res) => {
    res.send("Hello World...!")
})

app.use('/api/auth', authRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/milestones', milestoneRoutes)
app.use('/api/daily-tasks', dailyTaskRoutes)
app.use('/api/habits', habitRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/xp', xpRoutes);
app.use('/api/rewards', rewardRoutes);

export default app
