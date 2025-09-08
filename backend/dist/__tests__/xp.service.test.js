"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testUtils_1 = require("../utils/testUtils");
const user_model_1 = __importDefault(require("../models/user.model"));
// import Habit from '../models/habit.model';
const xp_service_1 = require("../services/xp.service");
describe("XP Service", () => {
    beforeAll(async () => {
        await (0, testUtils_1.connectDB)();
    });
    afterAll(async () => {
        await (0, testUtils_1.closeDatabase)();
    });
    beforeEach(async () => {
        await (0, testUtils_1.clearDatabase)();
    });
    describe("awardXP", () => {
        test("should award XP to user successfully", async () => {
            // Create test user
            const user = await user_model_1.default.create({
                name: "XP Test User",
                email: "xp@example.com",
                password: "password123",
            });
            const initialXP = user.xp;
            const xpToAward = 50;
            const result = await (0, xp_service_1.awardXP)(user._id.toString(), xpToAward);
            expect(result).toBe(true);
            // Verify XP was added
            const updatedUser = await user_model_1.default.findById(user._id);
            expect(updatedUser).toBeTruthy();
            expect(updatedUser.xp).toBe(initialXP + xpToAward);
        });
        test("should level up user when XP threshold reached", async () => {
            // Create test user with XP close to next level (100 XP for level 2)
            const user = await user_model_1.default.create({
                name: "Level Up Test User",
                email: "levelup@example.com",
                password: "password123",
                xp: 90, // Close to level 2 (level * 100)
                level: 1,
            });
            const result = await (0, xp_service_1.awardXP)(user._id.toString(), 15); // Push over 100 XP
            expect(result).toBe(true);
            const updatedUser = await user_model_1.default.findById(user._id);
            expect(updatedUser).toBeTruthy();
            expect(updatedUser.xp).toBe(105);
            expect(updatedUser.level).toBe(2);
        });
        test("should handle consecutive level ups", async () => {
            const user = await user_model_1.default.create({
                name: "Multi Level Up User",
                email: "multilevel@example.com",
                password: "password123",
                xp: 180, // Close to level 3
                level: 2,
            });
            await (0, xp_service_1.awardXP)(user._id.toString(), 120); // Should reach level 4 (300 XP needed)
            const updatedUser = await user_model_1.default.findById(user._id);
            expect(updatedUser.xp).toBe(300);
            expect(updatedUser.level).toBe(4);
        });
        test("should throw error for invalid user ID", async () => {
            await expect((0, xp_service_1.awardXP)("invaliduserid", 10)).rejects.toThrow();
        });
    });
    describe("calculateLevel", () => {
        test("should calculate correct level for XP amounts", () => {
            expect((0, xp_service_1.calculateLevel)(0)).toBe(1); // Level 1 starts at 0-99 XP
            expect((0, xp_service_1.calculateLevel)(50)).toBe(1);
            expect((0, xp_service_1.calculateLevel)(99)).toBe(1);
            expect((0, xp_service_1.calculateLevel)(100)).toBe(2); // Level 2 starts at 100-199 XP
            expect((0, xp_service_1.calculateLevel)(150)).toBe(2);
            expect((0, xp_service_1.calculateLevel)(199)).toBe(2);
            expect((0, xp_service_1.calculateLevel)(200)).toBe(3); // Level 3 starts at 200-299 XP
            expect((0, xp_service_1.calculateLevel)(500)).toBe(5); // Level 5 starts at 400-499 XP
        });
        test("should handle edge cases", () => {
            expect((0, xp_service_1.calculateLevel)(-10)).toBe(1); // Negative XP defaults to level 1
            expect((0, xp_service_1.calculateLevel)(1000)).toBeGreaterThan(5);
        });
    });
    describe("XP Awards from Habits and Tasks", () => {
        test("should award XP when completing habits", async () => {
            // This test would require habit completion functionality
            // For now, testing basic XP award mechanics
            const user = await user_model_1.default.create({
                name: "Habit XP User",
                email: "habitxp@example.com",
                password: "password123",
            });
            // Award XP similar to what habit completion would do
            await (0, xp_service_1.awardXP)(user._id.toString(), 10);
            const updatedUser = await user_model_1.default.findById(user._id);
            expect(updatedUser.xp).toBe(10);
        });
        test("should handle large XP awards without errors", async () => {
            const user = await user_model_1.default.create({
                name: "Large XP User",
                email: "largexp@example.com",
                password: "password123",
            });
            await (0, xp_service_1.awardXP)(user._id.toString(), 1000); // Large award
            const updatedUser = await user_model_1.default.findById(user._id);
            expect(updatedUser.xp).toBe(1000);
            expect(updatedUser.level).toBe(10);
        });
    });
    describe("XP Validation and Error Handling", () => {
        test("should reject negative XP awards", async () => {
            const user = await user_model_1.default.create({
                name: "Negative XP User",
                email: "negativexp@example.com",
                password: "password123",
            });
            await expect((0, xp_service_1.awardXP)(user._id.toString(), -10)).rejects.toThrow();
        });
        test("should handle extremely high XP values", async () => {
            const user = await user_model_1.default.create({
                name: "High XP User",
                email: "highxp@example.com",
                password: "password123",
            });
            const largeXP = 100000;
            await (0, xp_service_1.awardXP)(user._id.toString(), largeXP);
            const updatedUser = await user_model_1.default.findById(user._id);
            expect(updatedUser.xp).toBe(largeXP);
            expect(updatedUser.level).toBeGreaterThan(1);
        });
    });
});
//# sourceMappingURL=xp.service.test.js.map