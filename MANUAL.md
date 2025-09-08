# 📋 Skill Forge Manual Testing Guide

## 🎯 Testing Overview

This manual provides comprehensive step-by-step instructions for testing the Skill Forge application. It covers everything from initial setup to advanced features testing, ensuring the platform works correctly for both users and developers.

---

## 🚀 Testing Environment Setup

### **Prerequisites**
- ✅ Node.js 18+ installed
- ✅ MongoDB connection (Atlas or local)
- ✅ All npm dependencies installed
- ✅ Environment variables configured

### **Start Testing Environment**

```bash
# Terminal 1: Backend Server
cd backend
npm run dev
# Should see: Server running on http://localhost:3001

# Terminal 2: Frontend Development
cd frontend
npm run dev
# Should see: Local server running at http://localhost:5173
```

---

## 🧪 Automated Testing

### **Backend Tests (Jest)**
```bash
cd backend

# Run all backend tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Expected Results:**
```
✅ All tests should pass
✅ Coverage should be >80%
✅ No errors in console
```

### **Frontend Tests (Vitest)**
```bash
cd frontend

# Run all frontend tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Expected Results:**
```
✅ Component tests pass
✅ React Testing Library assertions work
✅ No console errors
```

---

## 🖥️ Manual Testing Scenarios

### **Scenario 1: User Registration & Authentication**

#### **Step 1: Initial Application Launch**
1. Open browser and navigate to `http://localhost:5173`
2. **Expected**: Landing page with registration/login options
3. **Visual Check**: Cyber theme, responsive design, modern UI

#### **Step 2: User Registration**
1. Click **"Register"** or **"Create Account"**
2. Fill registration form:
   - **Name**: "Test Hero"
   - **Email**: "tester@example.com"
   - **Password**: "password123"
3. Click **"Register"**

**Expected Results:**
```
✅ Success message displayed
✅ Automatic redirect to login page
✅ User created in database
```

#### **Step 3: User Login**
1. Return to login page
2. Enter credentials:
   - **Email**: "tester@example.com"
   - **Password**: "password123"
3. Click **"Login"**

**Expected Results:**
```
✅ JWT token stored in localStorage
✅ Redirect to dashboard
✅ User information displayed
✅ Notification bell in header
```

### **Scenario 2: Dashboard & Gamification Basics**

#### **Step 1: Dashboard Initial State**
After login, check:

**Expected Initial State:**
```json
{
  "userXP": 0,
  "userLevel": 1,
  "currentStreak": 0,
  "longestStreak": 0,
  "activeHabits": 0,
  "activeTasks": 0,
  "completedTasks": 0
}
```

#### **Step 2: Navigation Testing**
Test all navigation links:
1. ✅ Dashboard (current page)
2. ⚠️ Goals (require creation)
3. ⚠️ Tasks (require creation)
4. ⚠️ Habits (require creation)
5. ⚠️ Notifications (require activity)

**Expected**: All navigation links functional

#### **Step 3: Gamification Elements**
Check visual components:
- ✅ XP Bar showing 0 XP / Level 1
- ✅ Streak counter showing 0 days
- ✅ Badge area with "No badges yet"
- ✅ Cyber theme consistency

### **Scenario 3: Task Management & XP Earning**

#### **Step 1: Create First Task**
1. Navigate to **Dashboard**
2. Click **"Add New Task"** or **"+" button**
3. Enter task details:
   - **Title**: "Complete Skill Forge testing documentation"
   - **Description**: "Write comprehensive test scenarios"
   - **XP Reward**: 25
4. Click **"Create Task"**

**Expected Results:**
```
✅ Task appears in dashboard task list
✅ Database contains new task
✅ XP reward visible
```

#### **Step 2: Complete Task**
1. Find created task in list
2. Click **"Mark Complete"** or checkbox
3. Confirm completion if prompted

**Expected Results:**
```
✅ XP increased by 25 points
✅ Level remains 1 (need 75 more XP for level 2)
✅ Task moves to completed section
✅ Success notification appears
```

#### **Step 3: Batch Task Completion**
1. Create 2-3 more tasks with different XP values
2. Complete them sequentially
3. Monitor XP accumulation

**Expected Results:**
```
✅ XP counter increases correctly
✅ Visual progress bar updates
✅ Level up occurs after reaching 100 XP
✅ Achievement notification for level up
```

### **Scenario 4: Habit Formation & Streak Tracking**

#### **Step 1: Create Habit**
1. Navigate to **Habits** page
2. Click **"Add New Habit"**
3. Enter habit details:
   - **Title**: "Daily Meditation"
   - **Description**: "10 minutes of mindful meditation"
   - **Frequency**: "daily"
   - **XP Reward**: 10
4. Click **"Create Habit"**

**Expected Results:**
```
✅ Habit appears in active habits list
✅ Streak counter shows 0 (not completed today)
✅ Habit visible on dashboard
```

#### **Step 2: Habit Completion**
1. On **Dashboard**, find habit card
2. Click **"Mark Complete"** on habit
3. Confirm completion

**Expected Results:**
```
✅ Habit streak increases to 1
✅ XP increases by 10
✅ Completion date recorded
✅ Streak visualization updates
```

#### **Step 3: Multi-Day Streak Building**
1. Complete habit on consecutive days
2. Monitor streak progression
3. Check XP accumulation rate
4. Test streak preservation

**Expected Results:**
```
✅ Streak counter increases daily
✅ Bonus XP for longer streaks
✅ Visual indicators for streak continuity
✅ Streak break protection
```

### **Scenario 5: Goal Management**

#### **Step 1: Create Goal**
1. Navigate to **Goals** page
2. Click **"Add New Goal"**
3. Enter goal details:
   - **Title**: "Master React Development"
   - **Description**: "Complete skill forge project fully"
   - **Due Date**: "2024-12-31"
4. Click **"Create Goal"**

**Expected Results:**
```
✅ Goal appears in active goals list
✅ Progress bar shows 0%
✅ Due date visible
```

#### **Step 2: Add Milestones**
1. Open goal details
2. Add milestone:
   - **Title**: "Complete backend API"
   - **Description**: "Build all REST endpoints"
3. Save milestone

**Expected Results:**
```
✅ Milestone appears under goal
✅ Progress percentage remains 0%
✅ Dependency structure visible
```

### **Scenario 6: Notification System**

#### **Step 1: Generate Notifications**
1. Complete tasks to earn achievements
2. Reach level milestones
3. Maintain daily streaks
4. Trigger various activity types

#### **Step 2: Notification Interface**
1. Check notification bell in header
2. Click bell to open dropdown
3. Review recent notifications

**Expected Results:**
```
✅ Bell shows unread count badge
✅ Dropdown displays real-time notifications
✅ Different notification types visible
✅ Timestamp and priority indicators
```

#### **Step 3: Notification Management**
1. Click **"View All Notifications"**
2. Test **"Mark as Read"** functionality
3. Test **"Delete Notification"** feature
4. Test bulk actions

**Expected Results:**
```
✅ Notification read status updates
✅ Unread badge decreases
✅ Database persistence verified
✅ Real-time UI updates
```

### **Scenario 7: Analytics Dashboard**

#### **Step 1: Accumulate Data**
1. Complete multiple tasks (>5)
2. Build habit streaks (>3 days)
3. Unlock achievements
4. Generate sufficient activity history

#### **Step 2: Analytics Overview**
1. Navigate to **Analytics** page
2. View **XP Progress Chart**
3. Check **Streak History**
4. Review **Consistency Score**

**Expected Results:**
```
✅ Charts render correctly
✅ Data points accurate
✅ Interactive tooltips work
✅ Time range filtering functions
```

#### **Step 3: Skill Tree Analysis**
1. Open **Skill Tree** tab
2. View different skill axes:
   - Productivity points
   - Discipline points
   - Learning points
   - Health points
3. Check total skill score

**Expected Results:**
```
✅ SKill axes show realistic progression
✅ VIsual progress bars update
✅ Total level calculation accurate
```

### **Scenario 8: Advanced Features & Edge Cases**

#### **Step 1: Streak Recovery**
1. Break a habit streak intentionally
2. Try to continue after break
3. Test streak recovery mechanisms

#### **Step 2: Level Progression**
1. Accumulate XP to reach higher levels
2. Verify level calculation accuracy
3. Test level up notifications

#### **Step 3: Concurrent User Actions**
1. Open multiple browser tabs
2. Perform actions simultaneously
3. Verify data consistency

**Expected Results:**
```
✅ No race conditions
✅ State consistency maintained
✅ Optimistic UI updates work
```

### **Scenario 9: Error Handling**

#### **Step 1: Network Failures**
1. Disconnect internet briefly
2. Perform actions during outage
3. Reconnect and verify synchronization

#### **Step 2: Invalid Data**
1. Try creating tasks with invalid data
2. Submit empty forms
3. Test boundary conditions

**Expected Results:**
```
✅ Graceful error messages
✅ Validation feedback provided
✅ Application remains stable
```

### **Scenario 10: Mobile Responsiveness**

#### **Step 1: Device Testing**
1. Use browser device emulation
2. Test on actual mobile devices
3. Open on tablets and desktops

**Expected Results:**
```
✅ Responsive layout maintained
✅ Touch interactions work
✅ Navigation functional on all sizes
✅ Font scaling appropriate
```

### **Scenario 11: Logout & Session Management**

#### **Step 1: User Logout**
1. Find logout button in header/user menu
2. Click **"Logout"**
3. Confirm logout

**Expected Results:**
```
✅ User redirected to login page
✅ JWT token removed from localStorage
✅ Protected routes become inaccessible
✅ Fresh login required for access
```

#### **Step 2: Session Expiration**
1. Leave session idle for 7 days (simulate expiry)
2. Try accessing protected route
3. Handle expired token gracefully

**Expected Results:**
```
✅ Automatic logout on token expiry
✅ Clear error message for expired session
✅ Redirection to login page
```

### **Scenario 12: Performance Testing**

#### **Step 1: Heavy Data Load**
1. Create 20+ tasks
2. Build extensive habit history
3. Accumulate long activity log
4. Test analytics with large dataset

**Expected Results:**
```
✅ UI remains responsive (>60fps)
✅ API responses <200ms
✅ Memory usage stable
✅ No crashes under load
```

#### **Step 2: Concurrent Operations**
1. Open multiple browser tabs
2. Perform rapid task completions
3. Test real-time notification updates

**Expected Results:**
```
✅ No performance degradation
✅ Real-time updates working
✅ State synchronization maintained
```

---

## 🧪 API Testing with Manual HTTP Requests

### **Authentication Testing**

#### **Register User**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "api@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "...",
    "name": "API Test User",
    "email": "api@example.com"
  },
  "token": "JWT_TOKEN_HERE"
}
```

#### **Login User**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@example.com",
    "password": "password123"
  }'
```

### **Protected Endpoint Testing**

#### **Create Task**
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "API Test Task",
    "xpReward": 15
  }'
```

#### **Get Analytics**
```bash
curl -X GET http://localhost:3001/api/analytics/overview \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### **Complete Task (XP Award)**
```bash
curl -X POST http://localhost:3001/api/xp/earn \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "xpAmount": 25
  }'
```

---

## 🔧 Developer Testing Guidelines

### **Unit Test Execution**
```bash
# Run all tests
npm test

# Run with detailed output
npm test -- --verbose

# Run specific test file
npm test auth.service.test.ts

# Run tests in watch mode
npm test -- --watch
```

### **Component Testing**
```bash
# Frontend component tests
cd frontend
npm test XpBar.test.tsx
npm test HabitCard.test.tsx
npm test LoginForm.test.tsx
```

### **Integration Testing**
```bash
# API endpoint testing
npm install -g artillery  # Load testing
artillery quick --count 10 --num 5 http://localhost:3001/api/health

# Database testing
# Check MongoDB collections
mongo
use skillforge
db.users.find()
db.tasks.find()
db.activities.find()
```

### **Performance Testing**
```bash
# Lighthouse audit
npx lighthouse http://localhost:5173

# Bundle analysis
npm run build -- --analyze

# Memory leak detection
npm install -g clinic
clinict --stop-delay=5 http://localhost:5173
```

---

## 📊 Testing Checklists

### **Critical Path Verification**
- [ ] User registration works
- [ ] Login authentication successful
- [ ] Task creation and completion
- [ ] XP earning and level progression
- [ ] Habit tracking with streaks
- [ ] Goal management with milestones
- [ ] Notification system functional
- [ ] Analytics data generation
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility
- [ ] Error handling graceful
- [ ] Session management proper

### **Quality Assurance**
- [ ] All automated tests pass
- [ ] TypeScript compilation succeeds
- [ ] No console errors in browser
- [ ] No network errors (404/500)
- [ ] Loading states present
- [ ] Forms validation working
- [ ] Accessibility compliant
- [ ] Performance satisfactory

### **Edge Cases Tested**
- [ ] Empty form submissions
- [ ] Network interruptions
- [ ] Invalid authentication
- [ ] Large data volumes
- [ ] Browser refresh scenarios
- [ ] Session timeout handling
- [ ] Race condition prevention

---

## 🚨 Common Issues & Troubleshooting

### **During Manual Testing**

#### **Authentication Issues**
- **Problem**: Login redirects back to login page
- **Solution**: Check JWT token storage, verify backend connectivity
- **Debug**: `console.log(localStorage.getItem('token'))`

#### **Database Connection Errors**
- **Problem**: Unable to save/create items
- **Solution**: Verify MongoDB connection, check environment variables
- **Debug**: Check backend logs for connection errors

#### **Notification Delays**
- **Problem**: Notifications not appearing instantly
- **Solution**: Check WebSocket connections, verify cron job status
- **Debug**: Monitor network tab for real-time updates

#### **Analytics Not Loading**
- **Problem**: Chart data not appearing
- **Solution**: Ensure sufficient user activity history
- **Debug**: Check browser console for API errors

#### **Performance Issues**
- **Problem**: UI freezing with large data sets
- **Solution**: Implement pagination, optimize queries
- **Debug**: Use React DevTools Profiler

---

## 📈 Success Metrics

### **Test Coverage Goals**
```
✅ Unit Tests: >80% coverage
✅ Component Tests: Key components tested
✅ API Tests: All endpoints verified
✅ E2E Tests: Critical user flows working
```

### **Performance Benchmarks**
```
✅ Initial Load Time: <3 seconds
✅ API Response Time: <200ms average
✅ Bundle Size: <2MB for production
✅ Core Web Vitals: All 'Good' scores
```

### **User Experience Metrics**
```
✅ Task Completion Rate: >90%
✅ Login Success Rate: >99%
✅ Notification Engagement: >70%
✅ Mobile Usage: Fully functional
```

---

## 🎯 Final Testing Checklist

### **Pre-Deployment Verification**
- [ ] All automated tests passing
- [ ] Manual user journey completed
- [ ] Mobile and tablet testing done
- [ ] Cross-browser compatibility verified
- [ ] Error boundaries working
- [ ] Performance metrics acceptable
- [ ] Security scan completed
- [ ] Accessibility audit passed

### **Post-Deployment Monitoring**
- [ ] Error rate monitoring set up
- [ ] Performance monitoring active
- [ ] User analytics tracking
- [ ] Log aggregation configured
- [ ] Backup procedures verified

---

## 🚀 Deployment Readiness

### **Production Launch Checklist**
- [ ] Environment configuration verified
- [ ] Database backup created
- [ ] SSL certificates installed
- [ ] CDN configuration complete
- [ ] Monitoring tools deployed
- [ ] Rollback plan documented

**Skill Forge is ready for production deployment!** 🌟

---

*This manual ensures comprehensive testing coverage and successful production deployment of the Skill Forge application.*
