import { z } from "zod";

export const createMenuSchema = z.object({
  name: z.string().min(1, "Name Menu is required"),
  price: z.string().min(1, "Price Menu is required"),
  category_id: z.string().min(1, "Category Menu is required"),
});

export const updateMenuSchema = createMenuSchema;
