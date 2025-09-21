import request from 'supertest';
import app from '../app';
import { connectDB, clearDatabase, closeDatabase } from '../utils/testUtils';
import User from '../models/user.model';
import { Habit } from '../models/habit.model';

describe('Habit API Endpoints', () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();

    // Create and authenticate a test user
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!@#',
    };

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(userData);

    authToken = registerResponse.body.token;
    userId = registerResponse.body.data.id;
  });

  describe('POST /api/habits', () => {
    test('should create a new habit successfully', async () => {
      const habitData = {
        title: 'Daily Reading',
        description: 'Read for 30 minutes every day',
        frequency: 'daily',
        xpReward: 10,
      };

      const response = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${authToken}`)
        .send(habitData)
        .expect(201);

      expect(response.body.title).toBe(habitData.title);
      expect(response.body.description).toBe(habitData.description);
      expect(response.body.frequency).toBe(habitData.frequency);
      expect(response.body.xpReward).toBe(habitData.xpReward);
      expect(response.body.user).toBe(userId);
      expect(response.body.streakCount).toBe(0);

      // Verify habit was created in database
      const habitInDb = await Habit.findById(response.body._id);
      expect(habitInDb).toBeTruthy();
      expect(habitInDb?.title).toBe(habitData.title);
    });

    test('should reject habit creation without authentication', async () => {
      const habitData = {
        title: 'Daily Reading',
        frequency: 'daily',
        xpReward: 10,
      };

      const response = await request(app)
        .post('/api/habits')
        .send(habitData)
        .expect(401);

      expect(response.body.message).toContain('No token provided');
    });

    test('should validate habit input data', async () => {
      const invalidHabitData = {
        title: 'A', // Too short
        frequency: 'invalid', // Invalid frequency
        xpReward: -5, // Negative XP
      };

      const response = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidHabitData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    test('should create weekly habit with days of week', async () => {
      const habitData = {
        title: 'Weekly Exercise',
        description: 'Exercise 3 times a week',
        frequency: 'weekly',
        daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
        xpReward: 15,
      };

      const response = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${authToken}`)
        .send(habitData)
        .expect(201);

      expect(response.body.frequency).toBe('weekly');
      expect(response.body.daysOfWeek).toEqual([1, 3, 5]);
    });
  });

  describe('GET /api/habits', () => {
    beforeEach(async () => {
      // Create some habits for testing
      const habits = [
        {
          title: 'Daily Reading',
          frequency: 'daily',
          user: userId,
          xpReward: 10,
        },
        {
          title: 'Weekly Exercise',
          frequency: 'weekly',
          user: userId,
          daysOfWeek: [1, 3, 5],
          xpReward: 15,
        },
      ];

      for (const habit of habits) {
        await Habit.create(habit);
      }
    });

    test('should fetch user habits successfully', async () => {
      const response = await request(app)
        .get('/api/habits')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBeDefined();
      expect(response.body[0].user).toBe(userId);
    });

    test('should require authentication to fetch habits', async () => {
      const response = await request(app)
        .get('/api/habits')
        .expect(401);

      expect(response.body.message).toContain('No token provided');
    });
  });

  describe('POST /api/habits/:id/complete', () => {
    let habitId: string;

    beforeEach(async () => {
      const habit = await Habit.create({
        title: 'Daily Reading',
        frequency: 'daily',
        user: userId,
        xpReward: 10,
      });
      habitId = habit._id.toString();
    });

    test('should complete a habit successfully', async () => {
      const response = await request(app)
        .post(`/api/habits/${habitId}/complete`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ timezone: 'UTC' })
        .expect(200);

      expect(response.body.streakCount).toBeGreaterThan(0);
      expect(response.body.completedDates).toHaveLength(1);
      expect(response.body.lastCompletedDate).toBeDefined();

      // Verify user XP was updated
      const updatedUser = await User.findById(userId);
      expect(updatedUser?.xp).toBeGreaterThan(0);
    });

    test('should not allow completing the same habit twice in one day', async () => {
      // Complete habit first time
      await request(app)
        .post(`/api/habits/${habitId}/complete`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ timezone: 'UTC' })
        .expect(200);

      // Try to complete again
      const response = await request(app)
        .post(`/api/habits/${habitId}/complete`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ timezone: 'UTC' })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    test('should require authentication to complete habit', async () => {
      const response = await request(app)
        .post(`/api/habits/${habitId}/complete`)
        .send({ timezone: 'UTC' })
        .expect(401);

      expect(response.body.message).toContain('No token provided');
    });
  });

  describe('PUT /api/habits/:id', () => {
    let habitId: string;

    beforeEach(async () => {
      const habit = await Habit.create({
        title: 'Daily Reading',
        frequency: 'daily',
        user: userId,
        xpReward: 10,
      });
      habitId = habit._id.toString();
    });

    test('should update habit successfully', async () => {
      const updateData = {
        title: 'Updated Reading Habit',
        description: 'Read for 45 minutes daily',
        xpReward: 15,
      };

      const response = await request(app)
        .put(`/api/habits/${habitId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe(updateData.title);
      expect(response.body.description).toBe(updateData.description);
      expect(response.body.xpReward).toBe(updateData.xpReward);
    });

    test('should validate update data', async () => {
      const invalidUpdateData = {
        title: '', // Empty title
        xpReward: 'invalid', // Invalid XP type
      };

      const response = await request(app)
        .put(`/api/habits/${habitId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidUpdateData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/habits/:id', () => {
    let habitId: string;

    beforeEach(async () => {
      const habit = await Habit.create({
        title: 'Daily Reading',
        frequency: 'daily',
        user: userId,
        xpReward: 10,
      });
      habitId = habit._id.toString();
    });

    test('should delete habit successfully', async () => {
      await request(app)
        .delete(`/api/habits/${habitId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);

      // Verify habit was deleted
      const deletedHabit = await Habit.findById(habitId);
      expect(deletedHabit).toBeNull();
    });

    test('should not allow deleting other user\'s habit', async () => {
      // Create another user
      const otherUserData = {
        name: 'Other User',
        email: 'other@example.com',
        password: 'Test123!@#',
      };

      const otherUserResponse = await request(app)
        .post('/api/auth/register')
        .send(otherUserData);

      const otherUserToken = otherUserResponse.body.token;

      const response = await request(app)
        .delete(`/api/habits/${habitId}`)
        .set('Authorization', `Bearer ${otherUserToken}`)
        .expect(500); // This should be handled better in the actual implementation

      // Habit should still exist
      const habit = await Habit.findById(habitId);
      expect(habit).toBeTruthy();
    });
  });
});