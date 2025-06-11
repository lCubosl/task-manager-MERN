import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    
    console.log("connection to mongodb established")
  } catch (error) {
    console.error("error connecting to mongodb", error)
    process.exit(1)
  }
}