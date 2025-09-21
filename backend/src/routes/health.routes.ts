import express from 'express';
import { healthCheck, readinessCheck, performanceMetrics } from '../controllers/health.controller';

const router = express.Router();

router.get('/health', healthCheck);
router.get('/ready', readinessCheck);
router.get('/metrics', performanceMetrics);

export default router;