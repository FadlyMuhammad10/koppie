import express from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validation/category-validation.js";
import {
  createCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controller/category-controller.js";

export const authRouter = express.Router();

// Category
authRouter.post(
  "/api/category/create",
  validateRequest(createCategorySchema),
  createCategoryController
);
authRouter.get("/api/category", getCategoryController);
authRouter.put(
  "/api/category/:id",
  validateRequest(updateCategorySchema),
  updateCategoryController
);
authRouter.delete("/api/category/:id", deleteCategoryController);
