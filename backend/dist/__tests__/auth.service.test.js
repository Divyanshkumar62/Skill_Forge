"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const testUtils_1 = require("../utils/testUtils");
const user_model_1 = __importDefault(require("../models/user.model"));
describe('Auth Service', () => {
    beforeAll(async () => {
        await (0, testUtils_1.connectDB)();
    });
    afterAll(async () => {
        await (0, testUtils_1.closeDatabase)();
    });
    beforeEach(async () => {
        await (0, testUtils_1.clearDatabase)();
    });
    describe('register', () => {
        test('should register a new user successfully', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };
            const result = await register(userData);
            expect(result.user).toHaveProperty('_id');
            expect(result.user.name).toBe(userData.name);
            expect(result.user.email).toBe(userData.email);
            expect(result.user).toHaveProperty('xp', 0);
            expect(result.user).toHaveProperty('level', 1);
            expect(result).toHaveProperty('token');
        });
        test('should hash password on registration', async () => {
            const password = 'password123';
            const userData = {
                name: 'Test User',
                email: 'test2@example.com',
                password
            };
            await register(userData);
            const user = await user_model_1.default.findOne({ email: userData.email });
            expect(user).toBeTruthy();
            if (user) {
                // Ensure password is hashed (not equal to original)
                const isValidPassword = await bcrypt_1.default.compare(password, user.password);
                expect(isValidPassword).toBe(true);
                expect(user.password).not.toBe(password);
            }
        });
        test('should throw error for duplicate email', async () => {
            const userData = {
                name: 'Test User',
                email: 'test3@example.com',
                password: 'password123'
            };
            // First registration
            await register(userData);
            // Second registration should fail
            await expect(register(userData)).rejects.toThrow('User already exists');
        });
    });
    describe('login', () => {
        test('should login user with correct credentials', async () => {
            const userData = {
                name: 'Login Test User',
                email: 'login@example.com',
                password: 'password123'
            };
            // Register user first
            await register(userData);
            // Now login
            const result = await login(userData.email, userData.password);
            expect(result.user).toHaveProperty('_id');
            expect(result.user.email).toBe(userData.email);
            expect(result).toHaveProperty('token');
        });
        test('should throw error for invalid email', async () => {
            await expect(login('nonexistent@example.com', 'password123')).rejects.toThrow('User not found');
        });
        test('should throw error for incorrect password', async () => {
            const userData = {
                name: 'Password Test User',
                email: 'password@example.com',
                password: 'password123'
            };
            await register(userData);
            // Try login with wrong password
            await expect(login(userData.email, 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });
    });
    describe('Password Security', () => {
        test('should use proper bcrypt hashing', async () => {
            const password = 'mypassword123';
            const userData = {
                name: 'Password Security Test',
                email: 'security@example.com',
                password
            };
            await register(userData);
            const user = await user_model_1.default.findOne({ email: userData.email });
            expect(user).toBeTruthy();
            if (user) {
                // Password should be hashed with minimum security rounds
                expect(user.password.startsWith('$2')).toBe(true); // bcrypt format
                // Original password should not match the hash
                expect(user.password).not.toBe(password);
                // But should verify correctly
                const isValid = await bcrypt_1.default.compare(password, user.password);
                expect(isValid).toBe(true);
                // Wrong password should fail
                const isInvalid = await bcrypt_1.default.compare('wrongpassword', user.password);
                expect(isInvalid).toBe(false);
            }
        });
    });
});
//# sourceMappingURL=auth.service.test.js.map