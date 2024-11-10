import categoryModel from "../model/categoryModel.js";

export const createCategoryService = async (req) => {
  const body = req.body;

  const category = await categoryModel.create(body);

  return category;
};

export const getCategoryService = async () => {
  const categories = await categoryModel.find().populate({
    path: "menu_lists",
    select: "name ",
  });

  return categories;
};

export const updateCategoryService = async (req) => {
  const id = req.params.id;
  const body = req.body;

  const category = await categoryModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  return category;
};

export const deleteCategoryService = async (req) => {
  const id = req.params.id;

  const category = await categoryModel.findByIdAndDelete(id);

  return category;
};
