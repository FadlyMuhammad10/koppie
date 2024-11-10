import {
  createMenuService,
  getMenuService,
  getUserMenuService,
  updateMenuService,
  deleteMenuService,
} from "../service/menuService.js";

export const createMenuController = async (req, res, next) => {
  try {
    const menu = await createMenuService(req);
    res.status(201).json({
      data: menu,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMenuController = async (req, res, next) => {
  try {
    const menu = await getMenuService();
    res.status(200).json({
      data: menu,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserMenuController = async (req, res, next) => {
  try {
    const menu = await getUserMenuService(req);
    res.status(200).json({
      data: menu,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateMenuController = async (req, res, next) => {
  try {
    const menu = await updateMenuService(req);
    res.status(200).json({
      data: menu,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteMenuController = async (req, res, next) => {
  try {
    const menu = await deleteMenuService(req);
    res.status(200).json({
      data: menu,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
