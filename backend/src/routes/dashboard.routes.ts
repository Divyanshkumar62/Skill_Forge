import express from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

// All dashboard routes require authentication
router.use(protect);

router.get('/data', getDashboardData);

export default router;