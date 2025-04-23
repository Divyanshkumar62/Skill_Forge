import app from "./app";
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI!

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Mongodb Connected Successfully!")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err)
        process.exit(1) 
    })