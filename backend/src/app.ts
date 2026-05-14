import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
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
import healthRoutes from './routes/health.routes';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "http://localhost:5173", // vite dev server (if you use it)
  "https://skill-forge-3rkilo9wv-ds-projects-71ee473d.vercel.app", // vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true, // if you're using cookies/auth headers
  })
);

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
app.use('/api/health', healthRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  globalErrorHandler(err, _req, res, _next);
});

export default app
