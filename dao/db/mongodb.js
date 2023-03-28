import mongoose from "mongoose";

export const init = async () => {
  try {
    const URI =
      "mongodb+srv://maoaltacba:maoaltacba@cluster0.rqzmcmr.mongodb.net/ecommerce?retryWrites=true&w=majority";
    await mongoose.connect(URI);
    console.log("Database connected.");
  } catch (error) {
    console.error("Error to connecto to database", error.message);
  }
};
