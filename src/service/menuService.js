import categoryModel from "../model/categoryModel.js";
import menuModel from "../model/menuModel.js";
import cloudinary from "../utils/cloudinary.js";
import {
  createMenuSchema,
  updateMenuSchema,
} from "../validation/menu-validation.js";

export const createMenuService = async (req) => {
  const body = req.body;
  const parse = createMenuSchema.safeParse(body);

  const uploadThumbnail = await cloudinary.uploader.upload(req.file.path, {
    folder: "koppie",
  });

  if (!parse.success) {
    return (
      {
        error: "Invalid request",
        details: parse.error.issues,
      } || (await cloudinary.uploader.destroy(uploadThumbnail.public_id))
    );
  }

  const category = await categoryModel.findById(parse.data.category_id);
  if (!category) {
    return res.status(404).json({
      message: "Category ID not found",
    });
  }

  const menu = await menuModel.create({
    name: parse.data.name,
    price: parse.data.price,
    thumbnail: uploadThumbnail.secure_url,
    public_id: uploadThumbnail.public_id,
    category_id: category._id,
    ...body,
  });

  await categoryModel.findByIdAndUpdate(
    category._id,
    { $push: { menu_lists: menu._id } },
    { new: true }
  );

  return menu;
};

export const getMenuService = async () => {
  const menus = await menuModel
    .find()
    .populate({ path: "category_id", select: "name_category" });
  return menus;
};

export const updateMenuService = async (req) => {
  const id = req.params.id;
  const body = req.body;

  const parse = updateMenuSchema.safeParse(body);
  const oldMenu = await menuModel.findById(id);

  if (!parse.success) {
    return (
      {
        error: "Invalid request",
        details: parse.error.issues,
      } || (await cloudinary.uploader.destroy(oldMenu.public_id))
    );
  }

  let uploadThumbnail = {};

  if (req.file) {
    await cloudinary.uploader.destroy(oldMenu.public_id);
    uploadThumbnail = await cloudinary.uploader.upload(req.file.path, {
      folder: "koppie",
    });
  } else {
    uploadThumbnail = {
      secure_url: oldMenu.thumbnail,
      public_id: oldMenu.public_id,
    };
  }

  const category = await categoryModel.findById(parse.data.category_id);
  if (!category) {
    return res.status(404).json({
      message: "Category ID not found",
    });
  }

  const menu = await menuModel.findByIdAndUpdate(
    id,
    {
      name: parse.data.name,
      price: parse.data.price,
      thumbnail: uploadThumbnail.secure_url,
      public_id: uploadThumbnail.public_id,
      category_id: category._id,
      ...body,
    },
    { new: true }
  );

  await categoryModel.findByIdAndUpdate(
    category._id,
    { $push: { menu_lists: menu._id } },
    { new: true }
  );

  return menu;
};

export const deleteMenuService = async (req) => {
  const id = req.params.id;

  const menu = await menuModel.findByIdAndDelete(id);

  await cloudinary.uploader.destroy(menu.public_id);

  const category = await categoryModel.findById(menu.category_id);
  await categoryModel.findByIdAndUpdate(
    category._id,
    { $pull: { menu_lists: menu._id } },
    { new: true }
  );

  return menu;
};
