# 🔗 **Skill Forge - API Mapping**

## 📋 **Backend Routes & Frontend Integration Status**

### **Authentication Routes**
#### **POST /api/auth/register**
- **Auth**: none
- **Controller**: registerUser (auth.controller.ts) → ✅ implemented
- **Request Body**: `{ name: string, email: string, password: string }`
- **Response (201)**: `{ token: string, user: { id, name, email, level, xp } }`
- **Used by**: frontend/services/auth.ts → register()
- **Status**: frontend calls but UI needs polish

#### **POST /api/auth/login**
- **Auth**: none
- **Controller**: loginUser (auth.controller.ts) → ✅ implemented
- **Request Body**: `{ email: string, password: string }`
- **Response (200)**: `{ token: string, user: { id, name, email, level, xp } }`
- **Used by**: frontend/services/auth.ts → login()
- **Status**: frontend calls but UI needs polish

---

### **Goals Routes**
#### **POST /api/goals**
- **Auth**: protect middleware
- **Controller**: createGoal (goal.controller.ts) → ✅ implemented
- **Request Body**: `{ title: string, description: string, milestones: Array, dueDate: Date }`
- **Response (201)**: Goal object with progress/status
- **Used by**: frontend/features/goals/api.ts → createGoal()
- **Status**: implemented (controller present), integration: working

#### **GET /api/goals**
- **Auth**: protect middleware
- **Controller**: getGoals (goal.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: Array of goal objects
- **Used by**: frontend/features/goals/api.ts → getGoals()
- **Status**: implemented (controller present), integration: working

#### **PUT /api/goals/:id**
- **Auth**: protect middleware
- **Controller**: updateGoal (goal.controller.ts) → ✅ implemented
- **Request Body**: `{ title?: string, description?: string, milestones?: Array }`
- **Response (200)**: Updated goal object
- **Used by**: frontend/features/goals/api.ts → updateGoal()
- **Status**: implemented (controller present), integration: working

#### **PATCH /api/goals/complete/:id**
- **Auth**: protect middleware
- **Controller**: completeGoal (goal.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: `{ message: string, goal: Goal }`
- **Used by**: frontend/features/goals/api.ts → ⚠️ Missing! No completeGoal frontend API call
- **Status**: implemented (controller present), integration: **FRONTEND GAP**

#### **DELETE /api/goals/:id**
- **Auth**: protect middleware
- **Controller**: deleteGoal (goal.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: `{ message: "Goal Deleted!" }`
- **Used by**: frontend/features/goals/api.ts → deleteGoal()
- **Status**: implemented (controller present), integration: working

---

### **Habits Routes**
#### **POST /api/habits**
- **Auth**: protect middleware
- **Controller**: createHabit (habit.controller.ts) → ✅ implemented
- **Request Body**: `{ title: string, description?: string, frequency: enum, customDays?: number }`
- **Response (201)**: Habit object with gamification hooks
- **Used by**: frontend/services/habits.ts → createHabit()
- **Status**: implemented (controller present), integration: working

#### **GET /api/habits**
- **Auth**: protect middleware
- **Controller**: getHabits (habit.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: Array of habit objects
- **Used by**: frontend/services/habits.ts → getHabits()
- **Status**: implemented (controller present), integration: working

#### **PUT /api/habits/:id**
- **Auth**: protect middleware
- **Controller**: updateHabit (habit.controller.ts) → ✅ implemented
- **Request Body**: Habit update data
- **Response (200)**: Updated habit object
- **Used by**: frontend/services/habits.ts → updateHabit()
- **Status**: implemented (controller present), integration: working

#### **DELETE /api/habits/:id**
- **Auth**: protect middleware
- **Controller**: deleteHabit (habit.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (204)**: No content
- **Used by**: frontend/services/habits.ts → deleteHabit()
- **Status**: implemented (controller present), integration: working

#### **POST /api/habits/:id/complete**
- **Auth**: protect middleware
- **Controller**: completeHabit (habit.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: Updated habit with completion
- **Used by**: frontend/services/habits.ts → completeHabit()
- **Status**: implemented (controller present), integration: working

---

### **Milestones Routes**
#### **POST /api/milestones/:goalId**
- **Auth**: protect middleware
- **Controller**: createMilestone (milestone.controller.ts) → ✅ implemented
- **Request Body**: `{ title: string, description?: string }`
- **Response (201)**: Milestone object
- **Used by**: frontend/services/milestones.ts → ⚠️ Missing! No milestone frontend service
- **Status**: implemented (controller present), integration: **FRONTEND GAP**

#### **PATCH /api/milestones/:goalId/:milestoneId**
- **Auth**: protect middleware
- **Controller**: completeMilestone (milestone.controller.ts) → ✅ implemented
- **Request Body**: `{ completed: boolean }`
- **Response (200)**: Updated milestone
- **Used by**: frontend/services/milestones.ts → ⚠️ Missing! No milestone frontend service
- **Status**: implemented (controller present), integration: **FRONTEND GAP**

#### **PUT /api/milestones/:goalId/:milestoneId**
- **Auth**: protect middleware
- **Controller**: updateMilestone (milestone.controller.ts) → ✅ implemented
- **Request Body**: Milestone update data
- **Response (200)**: Updated milestone
- **Used by**: frontend/services/milestones.ts → ⚠️ Missing! No milestone frontend service
- **Status**: implemented (controller present), integration: **FRONTEND GAP**

#### **DELETE /api/milestones/:goalId/:milestoneId**
- **Auth**: protect middleware
- **Controller**: deleteMilestone (milestone.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: `{ message: "Milestone Deleted!" }`
- **Used by**: frontend/services/milestones.ts → ⚠️ Missing! No milestone frontend service
- **Status**: implemented (controller present), integration: **FRONTEND GAP**

---

### **Daily Tasks Routes**
#### **POST /api/daily-tasks**
- **Auth**: protect middleware
- **Controller**: createDailyTask (dailyTask.controller.ts) → ❓ implementation review needed
- **Request Body**: `{ title: string, description?: string, dueTime?: string }`
- **Response (201)**: Daily task object
- **Used by**: frontend/features/dailyTasks/api.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

#### **GET /api/daily-tasks/today**
- **Auth**: protect middleware
- **Controller**: getMyTodayTasks (dailyTask.controller.ts) → ❓ implementation review needed
- **Request Body**: none
- **Response (200)**: Array of today's daily tasks
- **Used by**: frontend/features/dailyTasks/api.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

#### **PATCH /api/daily-tasks/complete/:id**
- **Auth**: protect middleware
- **Controller**: markTaskComplete (dailyTask.controller.ts) → ❓ implementation review needed
- **Request Body**: none
- **Response (200)**: Updated task with completion timestamp
- **Used by**: frontend/features/dailyTasks/api.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

#### **DELETE /api/daily-tasks/:id**
- **Auth**: protect middleware
- **Controller**: deleteMyTask (dailyTask.controller.ts) → ❓ implementation review needed
- **Request Body**: none
- **Response (200)**: `{ message: "Task deleted successfully" }`
- **Used by**: frontend/features/dailyTasks/api.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

---

### **Notifications Routes**
#### **GET /api/notifications**
- **Auth**: protect middleware
- **Controller**: getNotifications (notification.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: Array of notification objects
- **Used by**: frontend/services/notifications.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

#### **PATCH /api/notifications/:id/read**
- **Auth**: protect middleware
- **Controller**: markNotificationAsRead (notification.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: Updated notification
- **Used by**: frontend/services/notifications.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

#### **DELETE /api/notifications/:id**
- **Auth**: protect middleware
- **Controller**: deleteNotification (notification.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: `{ message: "Notification deleted" }`
- **Used by**: frontend/services/notifications.ts → ❓ implementation review needed
- **Status**: ❓ implementation review needed

---

### **Analytics Routes**
#### **GET /api/analytics/weekly-activity**
- **Auth**: protect middleware
- **Controller**: getWeeklyActivity (analytics.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: `{ "2025-09-01": number, ... }` (7-day activity count)
- **Used by**: frontend/services/analytics.ts → getWeeklyActivity()
- **Status**: implemented (controller present), integration: working

#### **GET /api/analytics/xp-summary**
- **Auth**: protect middleware
- **Controller**: getXpSummary (analytics.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: `{ xp: number, level: number, nextLevelXp: number }`
- **Used by**: frontend/services/analytics.ts → getXpSummary()
- **Status**: implemented (controller present), integration: working

#### **GET /api/analytics/heatmap**
- **Auth**: protect middleware
- **Controller**: getHeatmapData (analytics.controller.ts) → ✅ implemented
- **Request Body**: none
- **Response (200)**: Array of date/count objects for last 30 days
- **Used by**: frontend/services/analytics.ts → getHeatmapData()
- **Status**: implemented (controller present), integration: working

---

### **Jobs & Background Tasks**
#### **Goal Reminder Job**
- **Location**: backend/jobs/goalReminder.job.ts
- **Implementation**: ✅ Cron job for goal reminders
- **Status**: Active (started in index.ts)
- **Used by**: None (background process)
- **Notes**: Sends email reminders for goals with dueDate

---

## 🚨 **Key Integration Gaps Identified**

### **Frontend Services Missing**
1. **Complete Goal Endpoint**: `/api/goals/complete/:id` - No frontend API call
2. **Milestone Management**: All milestone routes missing frontend service
3. **Daily Task Implementation**: Frontend services exist but need verification

### **Backend Controllers Need Review**
1. **Daily Task Controller**: Implementation status unclear
2. **Notification Controller**: Frontend integration unclear

### **UI Components Missing**
1. **Goal Completion UI**: No complete button/form in frontend
2. **Milestone Visualization**: Milestones displayed but not individually manageable
3. **Daily Task Display**: Page exists but backend integration unclear

---

## 📊 **Implementation Status Summary**

| Feature | Backend | Frontend Service | UI Integration | Status |
|---------|---------|------------------|----------------|--------|
| Auth (login/register) | ✅ | ✅ | ⚠️ (needs polish) | Mostly Complete |
| Habits CRUD | ✅ | ✅ | ✅ | Complete |
| Goals CRUD | ✅ | ✅ | ⚠️ (missing complete) | Partial |
| Milestones | ✅ | ❌ | ❌ | Backend Only |
| Daily Tasks | ❓ | ❓ | ❓ | Needs Review |
| Notifications | ✅ | ❓ | ❓ | Needs Review |
| Analytics | ✅ | ✅ | ✅ | Complete |
| Gamification | ✅ | ✅ | ⚠️ (components exist but not integrated) | Partial |

---

## 🔄 **Recommended Next Steps**

1. **Immediate Fix**: Add goal completion frontend API call
2. **Frontend Service**: Create milestone management service
3. **Verification**: Review daily task and notification implementations
4. **UI Integration**: Complete gamification component integration
5. **Testing**: Implement E2E tests for verified endpoints
