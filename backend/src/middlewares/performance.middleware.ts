import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface PerformanceMetrics {
  route: string;
  method: string;
  duration: number;
  statusCode: number;
  timestamp: Date;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
}

// Store metrics in memory (in production, you'd want to use a proper metrics store)
const metrics: PerformanceMetrics[] = [];
const MAX_METRICS = 1000; // Keep only last 1000 metrics

export const performanceMonitoring = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = process.hrtime.bigint();
  const startCpuUsage = process.cpuUsage();
  const startMemory = process.memoryUsage();

  // Override res.end to capture metrics when response is sent
  const originalEnd = res.end;
  res.end = function(...args: any[]) {
    const endTime = process.hrtime.bigint();
    const endCpuUsage = process.cpuUsage(startCpuUsage);
    const endMemory = process.memoryUsage();

    const duration = Number(endTime - startTime) / 1_000_000; // Convert to milliseconds

    const metric: PerformanceMetrics = {
      route: req.route?.path || req.path,
      method: req.method,
      duration,
      statusCode: res.statusCode,
      timestamp: new Date(),
      memoryUsage: {
        rss: endMemory.rss - startMemory.rss,
        heapTotal: endMemory.heapTotal - startMemory.heapTotal,
        heapUsed: endMemory.heapUsed - startMemory.heapUsed,
        external: endMemory.external - startMemory.external,
        arrayBuffers: endMemory.arrayBuffers - startMemory.arrayBuffers,
      },
      cpuUsage: endCpuUsage,
    };

    // Store metric
    metrics.push(metric);
    if (metrics.length > MAX_METRICS) {
      metrics.shift(); // Remove oldest metric
    }

    // Log slow requests
    if (duration > 1000) { // Log requests taking more than 1 second
      logger.warn(`Slow request detected: ${req.method} ${req.path} took ${duration.toFixed(2)}ms`);
    }

    // Log high memory usage
    if (endMemory.heapUsed > 100 * 1024 * 1024) { // 100MB
      logger.warn(`High memory usage detected: ${(endMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
    }

    // Call original end method
    originalEnd.apply(this, args);
  };

  next();
};

// Get performance metrics endpoint
export const getPerformanceMetrics = (_req: Request, res: Response): void => {
  const recentMetrics = metrics.slice(-100); // Last 100 metrics
  
  const summary = {
    totalRequests: metrics.length,
    averageResponseTime: metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length,
    slowestRequests: metrics
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10)
      .map(m => ({
        route: m.route,
        method: m.method,
        duration: m.duration,
        timestamp: m.timestamp,
      })),
    statusCodeDistribution: metrics.reduce((acc, m) => {
      acc[m.statusCode] = (acc[m.statusCode] || 0) + 1;
      return acc;
    }, {} as Record<number, number>),
    currentMemoryUsage: process.memoryUsage(),
    currentCpuUsage: process.cpuUsage(),
  };

  res.json({
    summary,
    recentMetrics: recentMetrics.map(m => ({
      route: m.route,
      method: m.method,
      duration: m.duration,
      statusCode: m.statusCode,
      timestamp: m.timestamp,
    })),
  });
};