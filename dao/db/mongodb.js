import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const init = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected.");
  } catch (error) {
    console.error("Error to connecto to database", error.message);
  }
};
