import express from "express";
import { getUserMenuController } from "../controller/menu-controller.js";

export const publicRouter = express.Router();

publicRouter.get("/menu-list", getUserMenuController);
