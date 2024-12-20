import mongoose from "mongoose"

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!)
  } catch (e) {
    console.log(e)
  }
}
