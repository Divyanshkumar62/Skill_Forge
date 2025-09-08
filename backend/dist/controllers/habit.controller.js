"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHabitStreak = exports.completeHabit = exports.deleteHabit = exports.updateHabit = exports.getHabits = exports.createHabit = void 0;
const habitService = __importStar(require("../services/habit.service"));
const activity_service_1 = require("../services/activity.service");
const createHabit = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const habit = await habitService.createHabit(userId, req.body);
        res.status(201).json(habit);
        await (0, activity_service_1.logActivity)(userId, "habit_created", `Created habit "${habit.title}"`, {
            habitId: habit._id,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Failed to create habit" });
    }
};
exports.createHabit = createHabit;
const getHabits = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const habits = await habitService.getHabits(userId);
        res.status(200).json(habits);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch habits" });
    }
};
exports.getHabits = getHabits;
const updateHabit = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const habit = await habitService.updateHabit(req.params['id'], userId, req.body);
        res.status(200).json(habit);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update habit" });
    }
};
exports.updateHabit = updateHabit;
const deleteHabit = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        await habitService.deleteHabit(req.params['id'], userId);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete habit" });
    }
};
exports.deleteHabit = deleteHabit;
const completeHabit = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const timezone = req.body.timezone || 'Etc/UTC';
        const updatedHabit = await habitService.completeHabit(req.params['id'], userId, timezone);
        res.status(200).json(updatedHabit);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Failed to complete habit" });
    }
};
exports.completeHabit = completeHabit;
const getHabitStreak = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const streakInfo = await habitService.getHabitStreak(req.params['id'], userId);
        res.status(200).json(streakInfo);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Failed to get habit streak" });
    }
};
exports.getHabitStreak = getHabitStreak;
//# sourceMappingURL=habit.controller.js.map