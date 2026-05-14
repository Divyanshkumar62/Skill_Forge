# Skill Forge - Complete Codebase Audit

**Date:** May 14, 2026  
**Auditor:** Claude Code Audit  
**Version:** 1.0.0

---

## 1. EXECUTIVE SUMMARY

### Project Overview
Skill Forge is a gamified productivity application allowing users to track habits, daily tasks, and long-term goals with XP, levels, streaks, and badges. The stack consists of:
- **Backend:** Node.js/Express with TypeScript, MongoDB/Mongoose
- **Frontend:** React 19 with Vite, TypeScript, TailwindCSS, Zustand
- **Auth:** JWT-based authentication

### Overall Assessment
- **Architecture:** 7/10 - Solid foundation but needs improvements
- **Security:** 6/10 - Basic security implemented, gaps exist
- **Performance:** 6/10 - Several N+1 queries and inefficient patterns
- **Code Quality:** 7/10 - Generally clean but inconsistent patterns
- **Maintainability:** 7/10 - Good separation, some code duplication

---

## 2. CRITICAL ISSUES (Require Immediate Attention)

### 2.1 JWT Secret Fallback (SECURITY)
**Location:** `backend/src/utils/generateToken.ts`, `backend/src/middlewares/auth.middleware.ts`

**Issue:** JWT secret falls back to undefined if not set in environment variables.

```typescript
// generateToken.ts - Line 5
jwt.sign({userId}, process.env['JWT_SECRET'] as string, {  // Can be undefined!
```

**Impact:** If JWT_SECRET is not set, the application will crash or use undefined as secret.

**Recommendation:**
```typescript
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
```

### 2.2 No Input Validation on Most Endpoints (SECURITY/FUNCTIONALITY)
**Location:** Most controllers in `backend/src/controllers/`

**Issue:** While validators exist (`backend/src/validators/`), they are NOT used in routes/controllers.

**Example:**
- `auth.controller.ts` - No validation of name/email/password
- `goal.controller.ts` - No validation of required fields
- `habit.controller.ts` - No validation of frequency/date inputs

**Impact:**
- Invalid data can cause runtime errors
- Inconsistent data in database
- Potential for injection attacks

### 2.3 No Error Handling Middleware (FUNCTIONALITY)
**Location:** `backend/src/app.ts`

**Issue:** No global error handler middleware. Unhandled errors return generic messages or crash.

**Recommendation:** Add error handler:
```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});
```

### 2.4 Duplicate Token Parsing in Frontend (DUPLICATE CODE)
**Location:** Multiple API files in `frontend/src/features/*/api.ts` and `frontend/src/services/`

**Issue:** Every API file implements its own token extraction and response interceptor.

**Files affected:**
- `frontend/src/features/habits/api.ts`
- `frontend/src/services/dailyTasks.ts`
- `frontend/src/services/auth.ts`
- `frontend/src/features/goals/api.ts`
- And more...

**Recommendation:** Create a centralized API client:
```typescript
// frontend/src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

api.interceptors.request.use((config) => {
  // Token extraction logic here
});

export default api;
```

---

## 3. HIGH PRIORITY ISSUES

### 3.1 N+1 Query in Goal Reminder Job (PERFORMANCE)
**Location:** `backend/src/jobs/goalReminder.job.ts`

**Issue:** The job fetches all goals and then iterates through them one by one without proper filtering.

```typescript
const goals = await Goal.find({ completed: false })  // Missing owner filter!
```

**Impact:** Can cause timeout on large datasets.

### 3.2 No Database Indexes (PERFORMANCE)
**Location:** All models in `backend/src/models/`

**Issue:** No indexes defined on frequently queried fields.

**Missing indexes:**
- User: `email` (already unique, but verify), `lastActivityDate`
- Habit: `user`, `createdAt`, `completedDates`
- Goal: `owner`, `status`, `dueDate`
- DailyTask: `user`, `dueDate`, `completed`
- Activity: `user`, `createdAt`

### 3.3 Race Condition in Streak Update (FUNCTIONALITY)
**Location:** `backend/src/services/streak.service.ts`

**Issue:** Multiple concurrent completions could cause stale data issues.

```typescript
const user = await User.findById(userId);  // Read
// ... calculations ...
await user.save();  // Write (no atomic update)
```

**Recommendation:** Use atomic operations:
```typescript
await User.findByIdAndUpdate(userId, {
  $inc: { currentStreak: 1 },
  $set: { lastActivityDate: new Date() }
});
```

### 3.4 Inconsistent Response Format (FUNCTIONALITY)
**Location:** Multiple controllers

**Issue:** Inconsistent response structures between endpoints.

**Examples:**
- Auth: Returns `{ id, name, email, xp, level, token }`
- Habits: Returns raw Mongoose documents
- Goals: Returns mixed formats

**Recommendation:** Standardize API response format with wrapper:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### 3.5 No Pagination (PERFORMANCE)
**Location:** `getGoals`, `getHabits`, `getMyTasks` endpoints

**Issue:** All items are returned without pagination.

**Impact:** Performance degrades as data grows.

### 3.6 No Rate Limiting (SECURITY)
**Location:** `backend/src/app.ts`

**Issue:** No rate limiting on API endpoints.

**Impact:** Vulnerable to brute force and DoS attacks.

### 3.7 Duplicate Route Parameter Access (CODE QUALITY)
**Location:** Several controllers

**Issue:** Inconsistent access patterns for route parameters.

```typescript
// Mix of these patterns:
req.params['id']
req.params.id
```

**Recommendation:** Standardize on one pattern.

---

## 4. MEDIUM PRIORITY ISSUES

### 4.1 No Request Body Type Validation (QUALITY)
**Issue:** Controllers accept `any` types for request bodies.

```typescript
export const createHabit = async (req: Request, res: Response) => {
  const habit = await habitService.createHabit(userId, req.body);  // req.body is any
```

**Recommendation:** Use proper Request types with generics.

### 4.2 Hardcoded XP Values (MAINTAINABILITY)
**Location:** `backend/src/controllers/goal.controller.ts`

```typescript
await awardXP(userId, 100);  // XP values hardcoded
await awardXP(userId, 10);   // Should be configurable
await awardXP(userId, 30);
```

**Recommendation:** Move to a configuration or constants file.

### 4.3 No Proper Logging (MAINTAINABILITY)
**Issue:** Only console.log/error used. No structured logging.

**Recommendation:** Implement proper logger (e.g., Winston, Pino).

### 4.4 Unused Code (QUALITY)
**Location:** `backend/src/controllers/dashboard.controller.ts` - File exists but not imported in app.ts

**Issue:** Dashboard routes defined but not registered.

### 4.5 Inconsistent Error Messages (QUALITY)
**Location:** Multiple controllers

```typescript
res.status(500).json({message: "Internal server error"})
res.status(500).json({ error: "Failed to fetch habits" })
res.status(500).json({ message: "Server error" })
```

### 4.6 Missing Health Check Endpoint (FUNCTIONALITY)
**Location:** `backend/src/routes/health.routes.ts` exists but not imported in app.ts

**Issue:** Health check defined but not registered.

---

## 5. PERFORMANCE OPTIMIZATIONS

### 5.1 Lazy Loading in Frontend Stores
**Location:** `frontend/src/features/*/store.ts`

**Issue:** Dynamic imports used but not optimal.

```typescript
// Current (unnecessary dynamic import)
const response = await import("../../services/dailyTasks").then(m => m.getTasks());

// Better (direct import)
import { getTasks } from "../../services/dailyTasks";
const response = await getTasks();
```

### 5.2 Missing select() in Auth Middleware
**Location:** `backend/src/middlewares/auth.middleware.ts`

**Issue:** Full user object fetched including password, then excluded.

```typescript
const user = await User.findById(decoded.userId).select("-password");  // Good
// But should also select only needed fields
```

### 5.3 No Caching
**Issue:** Same data fetched repeatedly (analytics, user stats).

**Recommendation:** Implement Redis or in-memory caching.

### 5.4 Large Payloads
**Issue:** Activity log fetches large amounts of data without limit.

**Recommendation:** Add `.limit()` to queries.

### 5.5 Aggregation in Analytics
**Issue:** Analytics endpoints run multiple separate queries.

**Recommendation:** Combine into single aggregation pipeline.

---

## 6. FRONTEND SPECIFIC ISSUES

### 6.1 Inconsistent API Base URLs
**Location:** Multiple service files

**Issue:** Different patterns for API base URL:
- `import.meta.env.VITE_API_BASE_URL`
- `import.meta.env.VITE_API_BASE`
- Hardcoded fallback "http://localhost:5000/api"

### 6.2 No Type Safety for API Responses
**Issue:** Generic `any` types used extensively.

**Recommendation:** Create response type guards.

### 6.3 State Management Duplication
**Location:** `frontend/src/features/auth/store.ts` and `frontend/src/services/auth.ts`

**Issue:** Both handle auth, creating confusion.

### 6.4 No Loading States Properly Handled
**Issue:** Loading states exist but UI doesn't always reflect them.

### 6.5 No Error Boundaries
**Issue:** React errors can crash entire app.

---

## 7. RECOMMENDATIONS BY PRIORITY

### Phase 1: Security Fixes (Week 1)
1. Add JWT_SECRET validation with proper error
2. Add input validation to all endpoints (use existing validators!)
3. Add rate limiting
4. Add global error handler middleware

### Phase 2: Performance (Week 2)
1. Add database indexes
2. Add pagination to list endpoints
3. Fix N+1 queries
4. Optimize streak calculations

### Phase 3: Code Quality (Week 3)
1. Create centralized API client
2. Standardize response format
3. Add TypeScript strict mode
4. Fix inconsistent patterns

### Phase 4: Features (Week 4)
1. Add health check routes
2. Add proper logging
3. Implement caching
4. Add request/response interceptors

---

## 8. TESTING GAPS

### Current Tests
- Backend has `__tests__` directory with basic tests
- Frontend has some component tests

### Missing
- Integration tests
- E2E tests
- Security tests
- Performance/load tests

---

## 9. SUMMARY

This codebase has a solid foundation with good separation of concerns. The main issues are:
1. **Security gaps** - Missing validation, rate limiting, proper error handling
2. **Performance bottlenecks** - No indexes, N+1 queries, no pagination
3. **Code duplication** - Repeated patterns across files
4. **Inconsistency** - Mixed patterns for similar operations

The recommended approach is to tackle security issues first, then optimize performance, and finally refactor for consistency and maintainability.