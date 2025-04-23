import mongoose, {Schema, Document} from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods.comparePassword = async function (password: string){
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model<IUser>("User", userSchema)