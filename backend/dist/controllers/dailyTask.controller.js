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
exports.deleteMyTask = exports.markTaskComplete = exports.updateMyTask = exports.getMyTodayTasks = exports.getMyTasks = exports.createDailyTask = void 0;
const taskService = __importStar(require("../services/dailyTask.service"));
const createDailyTask = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const task = await taskService.createTask({
            ...req.body,
            user: userId,
        });
        res.status(201).json(task);
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createDailyTask = createDailyTask;
const getMyTasks = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const tasks = await taskService.getAllTasks(userId);
        res.json(tasks);
    }
    catch (error) {
        console.error("Error getting tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getMyTasks = getMyTasks;
const getMyTodayTasks = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const tasks = await taskService.getTodayTasks(userId);
        res.json(tasks);
    }
    catch (error) {
        console.error("Error getting today tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getMyTodayTasks = getMyTodayTasks;
const updateMyTask = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const task = await taskService.updateTask(req.params['id'], userId, req.body);
        res.json(task);
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateMyTask = updateMyTask;
const markTaskComplete = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const task = await taskService.completeTask(req.params['id'], userId);
        res.json({ message: 'Task completed', task });
    }
    catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.markTaskComplete = markTaskComplete;
const deleteMyTask = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        await taskService.deleteTask(req.params['id'], userId);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteMyTask = deleteMyTask;
//# sourceMappingURL=dailyTask.controller.js.map