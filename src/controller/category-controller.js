import {
  createCategoryService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../service/categoryService.js";

export const createCategoryController = async (req, res, next) => {
  try {
    const category = await createCategoryService(req);
    res.status(201).json({
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCategoryController = async (req, res, next) => {
  try {
    const category = await getCategoryService();
    res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const category = await updateCategoryService(req);
    res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const category = await deleteCategoryService(req);
    res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
