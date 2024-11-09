import { ZodError } from "zod";

export const validateRequest = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((issue) => issue.message);

      return res
        .status(400)
        .json({ error: "Invalid request", details: errorMessages });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
