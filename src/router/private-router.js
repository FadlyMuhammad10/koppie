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
import multer from "multer";
import { fileFilter, fileStorage } from "../utils/multer.js";
import {
  createMenuController,
  getMenuController,
  updateMenuController,
  deleteMenuController,
} from "../controller/menu-controller.js";

export const authRouter = express.Router();

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

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

// Menu
authRouter.post(
  "/api/menu/create",
  upload.single("thumbnail"),
  createMenuController
);
authRouter.get("/api/menu", getMenuController);
authRouter.put(
  "/api/menu/:id",
  upload.single("thumbnail"),
  updateMenuController
);
authRouter.delete("/api/menu/:id", deleteMenuController);
