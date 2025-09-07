# 🧪 **Testing Documentation Structure**

## 📋 **Test Documentation Index**

### **1. Unit Testing**
- [Controller Tests](#controller-tests)
- [Service Tests](#service-tests)
- [Component Tests](#component-tests)
- [Store Tests](#store-tests)

### **2. Integration Testing**
- [API Integration Tests](#api-integration-tests)
- [Database Integration Tests](#database-integration-tests)
- [Frontend-Backend Integration](#frontend-backend-integration)

### **3. End-to-End Testing**
- [E2E Test Scenarios](#e2e-test-scenarios)
- [User Journey Tests](#user-journey-tests)
- [Gamification Flow Tests](#gamification-flow-tests)

### **4. Test Utilities & Setup**
- [Test Environment Setup](#test-environment-setup)
- [Test Data Management](#test-data-management)
- [Mocking Strategy](#mocking-strategy)

---

## 🧪 **Unit Testing**

### **Controller Tests**
#### **Habit Controller Tests**
```typescript
// tests/unit/controllers/habit.controller.test.ts
describe('Habit Controller', () => {
  describe('createHabit', () => {
    it('should create habit successfully')
    it('should handle database errors')
    it('should validate required fields')
  })

  describe('completeHabit', () => {
    it('should award XP on completion')
    it('should update streak')
    it('should prevent double completion')
  })
})
```

#### **Goal Controller Tests**
```typescript
// tests/unit/controllers/goal.controller.test.ts
describe('Goal Controller', () => {
  describe('completeGoal', () => {
    it('should require all milestones completed')
    it('should award bonus XP')
    it('should check badges')
  })
})
```

### **Service Tests**
#### **XP Service Tests**
```typescript
// tests/unit/services/xp.service.test.ts
describe('XP Service', () => {
  describe('awardXP', () => {
    it('should update user XP')
    it('should handle level advancement')
    it('should create level up notification')
  })
})
```

#### **Streak Service Tests**
```typescript
// tests/unit/services/streak.service.test.ts
describe('Streak Service', () => {
  describe('updateStreak', () => {
    it('should increment consecutive days')
    it('should reset on missed day')
    it('should update longest streak')
  })
})
```

### **Component Tests**
#### **Habit Components**
```typescript
// tests/unit/components/HabitCard.test.tsx
describe('HabitCard', () => {
  it('should display habit information')
  it('should show completion status')
  it('should handle complete action')
})
```

### **Store Tests**
#### **Habit Store Tests**
```typescript
// tests/unit/stores/habit.store.test.ts
describe('Habit Store', () => {
  describe('createHabit', () => {
    it('should add habit to state')
    it('should handle loading states')
    it('should handle errors')
  })
})
```

---

## 🔗 **Integration Testing**

### **API Integration Tests**
#### **Habit API Tests**
```typescript
// tests/integration/api/habit.api.test.ts
describe('Habit API', () => {
  describe('POST /api/habits', () => {
    it('should create habit via API')
    it('should integrate with gamification')
    it('should log activity')
  })

  describe('POST /api/habits/:id/complete', () => {
    it('should update both frontend and backend')
    it('should sync gamification state')
  })
})
```

### **Database Integration Tests**
#### **User-Gamification Integration**
```typescript
// tests/integration/database/user-gamification.test.ts
describe('User-Gamification DB Integration', () => {
  it('should update XP across related tables')
  it('should maintain data consistency')
  it('should handle concurrent updates')
})
```

### **Frontend-Backend Integration**
#### **State Synchronization**
```typescript
// tests/integration/frontend-backend/state-sync.test.ts
describe('Frontend-Backend State Sync', () => {
  it('should sync XP changes')
  it('should handle real-time updates')
  it('should manage offline scenarios')
})
```

---

## 🌐 **End-to-End Testing**

### **E2E Test Scenarios**

#### **Habit Creation Flow**
```typescript
// tests/e2e/habit-creation.e2e.test.ts
describe('Habit Creation E2E', () => {
  it('should create habit from UI to database', async () => {
    // 1. Navigate to habits page
    // 2. Click create button
    // 3. Fill form
    // 4. Submit
    // 5. Verify in database
    // 6. Verify in UI
  })
})
```

#### **Gamification Flow**
```typescript
// tests/e2e/gamification-flow.e2e.test.ts
describe('Gamification E2E', () => {
  it('should award XP and update UI', async () => {
    // 1. Complete habit
    // 2. Verify XP increase
    // 3. Verify level advancement
    // 4. Verify badge awarding
  })
})
```

### **User Journey Tests**

#### **New User Onboarding**
```typescript
// tests/e2e/user-onboarding.e2e.test.ts
describe('New User Onboarding', () => {
  it('should guide new user through first habit', async () => {
    // 1. Register
    // 2. Create first habit
    // 3. Complete habit
    // 4. See XP/level changes
    // 5. Explore dashboard
  })
})
```

#### **Power User Journey**
```typescript
// tests/e2e/power-user.e2e.test.ts
describe('Power User Journey', () => {
  it('should handle advanced user interactions', async () => {
    // Multiple habits
    // Goal completion
    // Analytics exploration
    // Badge achievements
  })
})
```

---

## 🛠️ **Test Utilities & Setup**

### **Test Environment Setup**
#### **Database Setup**
```typescript
// tests/setup/database.ts
export const setupTestDatabase = async () => {
  // Create test database
  // Run migrations
  // Seed initial data
}

export const teardownTestDatabase = async () => {
  // Clean up test data
  // Close connections
}
```

#### **Mock Services**
```typescript
// tests/mocks/services.mock.ts
export const mockHabitService = {
  createHabit: jest.fn(),
  completeHabit: jest.fn(),
}

export const mockNotificationService = {
  createNotification: jest.fn(),
}
```

### **Test Data Management**
#### **Test Data Factories**
```typescript
// tests/factories/user.factory.ts
export const createTestUser = (overrides = {}) => ({
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  ...overrides
})

export const createTestHabit = (userId, overrides = {}) => ({
  title: 'Test Habit',
  description: 'Test description',
  frequency: 'daily',
  user: userId,
  ...overrides
})
```

### **Test Configuration**
```typescript
// tests/config/test-config.ts
export const testConfig = {
  database: {
    url: process.env.TEST_DATABASE_URL,
  },
  api: {
    baseUrl: 'http://localhost:3001',
  },
  timeouts: {
    api: 5000,
    database: 10000,
  }
}
```

---

## 📊 **Test Coverage Requirements**

### **Coverage Goals**
| Component | Unit Test Coverage | Integration Coverage |
|-----------|-------------------|---------------------|
| Controllers | 90% | 100% |
| Services | 95% | 100% |
| React Components | 80% | N/A |
| Stores | 90% | 100% |
| Utilities | 95% | N/A |

### **Coverage Tools**
```json
// package.json test scripts
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:unit": "jest tests/unit",
    "test:integration": "jest tests/integration",
    "test:e2e": "jest tests/e2e"
  }
}
```

---

## 🔧 **Testing Best Practices**

### **Test Organization**
```
/tests
├── unit/
│   ├── controllers/
│   ├── services/
│   ├── components/
│   └── stores/
├── integration/
│   ├── api/
│   ├── database/
│   └── frontend-backend/
├── e2e/
│   ├── flows/
│   └── journeys/
├── setup/
│   ├── database.ts
│   └── server.ts
├── mocks/
│   ├── services.ts
│   └── data.ts
├── factories/
│   ├── user.factory.ts
│   └── habit.factory.ts
└── config/
    └── test-config.ts
```

### **Test Naming Convention**
```typescript
// Good: Specific and descriptive
describe('HabitService.completeHabit', () => {
  it('should award XP when habit is completed for the first time', () => {
    // test implementation
  })

  it('should not award XP for already completed habit', () => {
    // test implementation
  })
})

// Bad: Too vague
describe('Habit Service', () => {
  it('should work', () => {
    // test implementation
  })
})
```

---

## 🚀 **CI/CD Integration**

### **GitHub Actions Workflow**
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:unit
      - run: npm run test:integration

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run test:e2e
```

### **Coverage Reporting**
```typescript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

---

## 📋 **Test Case Checklist**

### **Habit System**
- [ ] Create habit (all frequencies)
- [ ] Complete habit (daily check)
- [ ] Prevent double completion
- [ ] XP awarding
- [ ] Streak updates
- [ ] Activity logging

### **Gamification**
- [ ] XP calculation
- [ ] Level advancement
- [ ] Badge awarding
- [ ] Notification sending
- [ ] UI updates

### **Error Handling**
- [ ] Invalid input validation
- [ ] Database connection errors
- [ ] Network failures
- [ ] Authentication errors

### **Performance**
- [ ] Response times < 500ms
- [ ] Concurrent user handling
- [ ] Database query optimization
- [ ] Memory leak prevention
