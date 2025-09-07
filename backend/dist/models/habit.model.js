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
exports.Habit = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const habitSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'custom'],
        required: true,
    },
    customDays: {
        type: Number,
        default: 1,
    },
    daysOfWeek: {
        type: [Number], // 0=Monday, 1=Tuesday, ..., 6=Sunday
        default: [],
        validate: {
            validator: function (arr) {
                return arr.length === 0 || arr.every(day => day >= 0 && day <= 6);
            },
            message: 'Days of week must be numbers 0-6'
        }
    },
    startDate: {
        type: Date,
        default: () => new Date(),
    },
    endDate: {
        type: Date,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completedDates: {
        type: [Date],
        default: [],
    },
    streakCount: {
        type: Number,
        default: 0,
    },
    lastCompletedDate: {
        type: Date,
    },
    xpReward: {
        type: Number,
        default: 10,
    },
}, { timestamps: true });
exports.Habit = mongoose_1.default.model('Habit', habitSchema);
//# sourceMappingURL=habit.model.js.map