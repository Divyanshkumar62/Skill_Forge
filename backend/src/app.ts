import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import goalRoutes from './routes/goal.routes'
import notificationRoutes from './routes/notification.routes';
import milestoneRoutes from './routes/milestone.route';
import dailyTaskRoutes from './routes/dailyTask.routes'
import habitRoutes from './routes/habit.routes';
import analyticsRoutes from "./routes/analytics.routes";
const app = express()

app.use(cors())
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

export default app