import { z } from "zod";

export const createCategorySchema = z.object({
  name_category: z.string().min(1, "Name Category is required"),
});

export const updateCategorySchema = createCategorySchema;
