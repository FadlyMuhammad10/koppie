import mongoose from "mongoose";
import { config } from "dotenv";
config();

const URL = process.env.DB_URL;

export default async function connectDB() {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  const db = mongoose.connection;
  db.on("error", console.error);
  db.once("open", () => {
    console.log("Database connected");
  });
}
