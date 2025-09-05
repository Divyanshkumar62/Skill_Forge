import mongoose, {Schema, Document} from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    xp: number;
    level: number;
    completedGoals: number;
    completedMilestones: number;
    badges: Array<{
        title: string;
        achievedAt: Date;
    }>;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
    notificationPreferences: {
        habitReminders: boolean;
        goalReminders: boolean;
        milestoneReminders: boolean;
        streakReminders: boolean;
        gamificationNotifications: boolean;
        weeklyReports: boolean;
    };
    comparePassword(password: string): Promise<boolean>
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    completedGoals: {
      type: Number,
      default: 0,
    },
    completedMilestones: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        title: String,
        achievedAt: Date,
      },
    ],
    currentStreak: {
        type: Number,
        default: 0,
      },
    longestStreak: {
        type: Number,
        default: 0,
      },
    lastActivityDate: {
        type: Date,
      },
    notificationPreferences: {
        habitReminders: {
            type: Boolean,
            default: true,
        },
        goalReminders: {
            type: Boolean,
            default: true,
        },
        milestoneReminders: {
            type: Boolean,
            default: true,
        },
        streakReminders: {
            type: Boolean,
            default: true,
        },
        gamificationNotifications: {
            type: Boolean,
            default: true,
        },
        weeklyReports: {
            type: Boolean,
            default: true,
        },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods['comparePassword'] = async function (password: string){
    return await bcrypt.compare(password, this['password']);
}

export default mongoose.model<IUser>("User", userSchema)
