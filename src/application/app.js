import express from "express";
import connectDB from "./database.js";
import { config } from "dotenv";
import { authRouter } from "../router/private-router.js";
import { publicRouter } from "../router/public-router.js";

export const app = express();
config();

app.use(express.json());
connectDB();

app.use(authRouter);
app.use(publicRouter);

app.get("/", (req, res) => {
  res.send("Hello Koppie!");
});
