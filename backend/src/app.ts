import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import goalRoutes from './routes/goal.routes'
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
    res.send("Hello World...!")
})

app.use('/api/auth', authRoutes)
app.use('/api/goals', goalRoutes)

export default app