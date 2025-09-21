import request from 'supertest';
import app from '../app';
import { connectDB, clearDatabase, closeDatabase } from '../utils/testUtils';

describe('Health Check Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('GET /api/health/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
      expect(response.body.environment).toBeDefined();
      expect(response.body.memory).toBeDefined();
      expect(response.body.memory.used).toBeGreaterThan(0);
      expect(response.body.memory.total).toBeGreaterThan(0);
    });
  });

  describe('GET /api/health/ready', () => {
    test('should return readiness status', async () => {
      const response = await request(app)
        .get('/api/health/ready')
        .expect(200);

      expect(response.body.status).toBe('ready');
      expect(response.body.checks).toBeDefined();
      expect(response.body.timestamp).toBeDefined();
      expect(typeof response.body.checks.database).toBe('boolean');
      expect(typeof response.body.checks.externalServices).toBe('boolean');
    });
  });
});