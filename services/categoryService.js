const Category = require("../models/category.model");

const createCategory = async ({ name, description }) => {
  const trimmedName = name?.trim();

  if (!trimmedName) {
    throw new Error("Category name is required");
  }

  const existingCategory = await Category.findOne({
    name,
    description
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name: trimmedName,
    description: description?.trim()
  });

  return category;
};

const updateCategory = async (id,  name, description ) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  const trimmedName = name?.trim();

  if (!trimmedName) {
    throw new Error("Category name is required");
  }


    const existingCategory = await Category.findOne({
      name
    });

    if (existingCategory) {
      throw new Error("Category name already exists");
    }

    category.name = trimmedName;
  

  if (description !== undefined) {
    category.description = description.trim();
  }

  await category.save();

  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  const productExists = await Product.findOne({
    category: category.id
  });

  if (productExists) {
    throw new Error("Cannot delete category because it has products");
  }

  await Category.findByIdAndDelete(id);

  return category;
};
const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const getCategories = async () => {
  return Category.find().sort({ createdAt: -1 });
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories
};