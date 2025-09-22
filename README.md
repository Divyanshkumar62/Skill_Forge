# 🚀 Skill Forge - Productivity Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

A full-stack productivity application that transforms boring task management into an engaging gamified experience. Built with modern technologies and production-ready architecture.

## 🎮 Features

### ✅ **Gamification System**
- **XP Rewards**: Complete tasks to earn experience points
- **Level Progression**: Automatic level ups at XP milestones
- **Badge System**: Achievement unlocks and recognition
- **Streak Tracking**: Daily consistency rewards
- **Rewards Shop**: Spend XP on digital rewards

### ✅ **Task Management**
- **Goal Setting**: Create and track personal goals
- **Habit Formation**: Daily/weekly habit tracking
- **Progress Visualization**: Analytics and statistics
- **Smart Reminders**: Automated notification system
- **Milestone Tracking**: Goal subdivision support

### ✅ **Advanced Analytics**
- **Progress Charts**: Weekly activity visualization
- **Consistency Scoring**: Habit adherence tracking
- **Skill Tree**: Multi-dimensional progress tracking
- **Streak Analytics**: Historical streak comparisons
- **Personal Insights**: Data-driven improvement tips

### ✅ **Production Ready**
- **TypeScript**: Full type safety and development experience
- **Unit Tests**: Comprehensive test coverage (Jest/Vitest)
- **API Documentation**: OpenAPI/Swagger specifications
- **Security**: JWT authentication, bcrypt password hashing
- **Performance**: Optimized queries and caching strategies

## 🛠️ Tech Stack

### **Backend**
- **Framework**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **Testing**: Jest + Supertest + mongodb-memory-server
- **Scheduling**: node-cron for automated tasks

### **Frontend**
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS + cyber theme
- **State Management**: Zustand
- **Routing**: React Router v7
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library

### **Dev Tools**
- **Linting**: ESLint
- **API Spec**: OpenAPI 3.0
- **CI/CD Ready**: Jest testing framework
- **Code Formatting**: Consistent TypeScript standards

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- MongoDB Atlas account OR local MongoDB
- npm or yarn package manager

### **1. Clone and Setup**
```bash
# Clone the repository
git clone https://github.com/Divyanshkumar62/Skill_Forge/
cd skill-forge

# Setup backend
cd backend
npm install

# Setup frontend
cd ../frontend
npm install
```

### **2. Environment Configuration**

#### **Backend Environment (.env)**
```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/skillforge
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillforge?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here-minimum-32-characters
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3001
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@skillforge.com
```

#### **Frontend Environment (.env)**
```bash
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

### **3. Database Setup**

#### **Option A: MongoDB Atlas (Recommended)**
1. Create a free MongoDB Atlas cluster
2. Get connection string and add to MONGODB_URI
3. Database will be automatically created on first run

#### **Option B: Local MongoDB**
```bash
# Install MongoDB locally
brew install mongodb-community  # macOS
sudo apt-get install mongodb    # Ubuntu

# Start MongoDB service
mongod
```

### **4. Run the Application**

#### **Development Mode (Recommended)**
```bash
# Terminal 1: Backend
cd backend
npm run dev  # Runs on http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm run dev  # Runs on http://localhost:5173
```

#### **Production Mode**
```bash
# Backend - Build and start
cd backend
npm run build
npm start

# Frontend - Build
cd frontend
npm run build
npm run preview
```

--- 

## 📚 API Documentation

### **OpenAPI Specification**
- Full API documentation: `docs/openapi.yaml`
- Interactive Swagger UI: http://localhost:3001/api-docs (when backend running)

### **Core Endpoints**

```typescript
// Authentication
POST /api/auth/register
POST /api/auth/login

// Tasks & Goals
GET /api/tasks
POST /api/tasks
DELETE /api/tasks/:id

// Gamification
POST /api/xp/earn
GET /api/rewards
POST /api/rewards/:id/purchase

// Analytics (NEW!)
GET /api/analytics/overview
GET /api/analytics/skillTree

// Notifications
GET /api/notifications
PATCH /api/notifications/:id/read
```

### **Authentication**
All secure endpoints require JWT token:
```bash
Authorization: Bearer <your-jwt-token>
```

## 🗃️ Sample Data & Seeding

### **Automated Seeding**
The application includes sample data for testing:

```bash
# Backend seeding (automatically runs on first startup)
npm run seed  # Creates sample users, habits, tasks
```

### **Manual Setup for Demo**
```typescript
// Create sample user (via API)
POST /api/auth/register
{
  "name": "Demo Hero",
  "email": "demo@skillforge.com",
  "password": "password123"
}

// Sample goals created automatically:
// - Read for 30 minutes daily
// - Exercise 3x per week
// - Complete project milestone
// - Write daily journal
```

## 📊 Project Structure

```
skill-forge/
├── backend/
│   ├── src/
│   │   ├── __tests__/          # Unit tests
│   │   │   ├── auth.service.test.ts
│   │   │   └── xp.service.test.ts
│   │   ├── controllers/        # API handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── xp.controller.ts
│   │   ├── models/            # MongoDB schemas
│   │   │   ├── user.model.ts
│   │   │   ├── habit.model.ts
│   │   │   └── goal.model.ts
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middlewares/       # Authentication, validation
│   │   └── utils/            # Helpers and utilities
│   ├── jest.config.js         # Jest configuration
│   ├── package.json           # Dependencies & scripts
│   └── docs/api-spec.yaml     # API documentation
└── frontend/
    ├── src/
    │   ├── __tests__/         # Component tests
    │   │   ├── XpBar.test.tsx
    │   │   ├── HabitCard.test.tsx
    │   │   └── LoginForm.test.tsx
    │   ├── components/       # Reusable UI components
    │   │   ├── gamification/XpBar.tsx
    │   │   ├── notifications/NotificationBell.tsx
    │   │   └── layouts/DashboardLayout.tsx
    │   ├── features/         # Feature-sliced architecture
    │   │   ├── auth/          # Authentication feature
    │   │   ├── habits/        # Habits management
    │   │   ├── tasks/         # Task management
    │   │   └── analytics/     # Analytics dashboard
    │   ├── pages/            # Route-level components
    │   ├── stores/           # Zustand state management
    │   ├── hooks/            # Custom React hooks
    │   └── types/            # TypeScript type definitions
    ├── vite.config.ts         # Vite configuration
    ├── tailwind.config.js     # Tailwind CSS configuration
    └── package.json           # Frontend dependencies
```

## 🔧 Development Guidelines

### **Coding Standards**
- **TypeScript**: 100% type coverage required
- **Error Handling**: Comprehensive try-catch blocks
- **Authentication**: JWT tokens for all user-specific endpoints
- **Security**: Input validation and sanitization
- **Performance**: Optimized database queries and caching

### **Testing Guidelines**
- **Unit Tests**: All services and utilities
- **Integration Tests**: API endpoints and database operations
- **Component Tests**: React components with React Testing Library
- **Coverage**: Minimum 80% coverage target

### **Git Workflow**
```bash
# Development workflow
git checkout -b feature/awesome-feature
# Make changes with tests
git commit -m "Add awesome feature with tests"
git push origin feature/awesome-feature

# Pull Request Requirements
- ✅ All tests passing
- ✅ Code review completed
- ✅ TypeScript compilation successful
- ✅ Documentation updated
```



### **Environment Variables for Production**
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillforge_prod
JWT_SECRET=your-production-jwt-secret-minimum-32-characters
EMAIL_HOST=your-smtp-host
PORT=3001
```

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make changes with tests
5. Ensure all tests pass
6. Open a Pull Request

### **Code Quality**
- Write comprehensive unit tests
- Update API documentation
- Follow TypeScript best practices
- Ensure responsive design works on all devices

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.


### **Support**
- GitHub Issues for bug reports
- Documentation in `docs/` folder
- Community discussions in Discussions tab

---

*Built with ❤️ using modern web technologies. Transform productivity into fun!*
