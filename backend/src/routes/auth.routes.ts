import express from "express";
import rateLimit from "express-rate-limit";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authLimiter, validate({ body: registerSchema }), registerUser);
router.post('/login', authLimiter, validate({ body: loginSchema }), loginUser);

export default router;