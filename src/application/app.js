import express from "express";
import connectDB from "./database.js";
import { config } from "dotenv";
import { authRouter } from "../router/private-router.js";

export const app = express();
config();

app.use(express.json());
connectDB();

app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Hello Koppie!");
});
