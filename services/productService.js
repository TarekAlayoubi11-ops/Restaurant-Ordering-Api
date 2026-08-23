const Product = require("../models/Product");
const Category = require("../models/category.model");

const createProduct = async (data) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    isAvailable
  } = data;

  if (!name) {
    throw new Error("Product name is required");
  }

  if (price === undefined || price < 0) {
    throw new Error("Product price must be greater than or equal to 0");
  }

  if (stock !== undefined && stock < 0) {
    throw new Error("Product stock cannot be negative");
  }

  const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const existingProduct = await Product.findOne({
    name,
    category
  });

  if (existingProduct) {
    throw new Error("Product already exists in this category");
  }

  const product = await Product.create({
    name: name.trim(),
    description: description?.trim(),
    price,
    stock: stock ?? 0,
    category,
    isAvailable: stock > 0
  });

  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  const {
    name,
    description,
    price,
    stock,
    category,
    isAvailable
  } = data;

  const newName =
    name !== undefined ? name.trim() : product.name;

  const newDescription =
    description !== undefined
      ? description.trim()
      : product.description;

  const newPrice =
    price !== undefined ? price : product.price;

  const newStock =
    stock !== undefined ? stock : product.stock;

  const newCategory =
    category !== undefined ? category : product.category;

  if (newPrice < 0) {
    throw new Error("Product price cannot be negative");
  }

  if (newStock < 0) {
    throw new Error("Product stock cannot be negative");
  }

  const existingCategory = await Category.findById(newCategory);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const existingProduct = await Product.findOne({
    _id: { $ne: id },
    name: newName,
    category: newCategory
  });

  if (existingProduct) {
    throw new Error("Product already exists in this category");
  }

  product.name = newName;
  product.description = newDescription;
  product.price = newPrice;
  product.stock = newStock;
  product.category = newCategory;

  if (newStock === 0) {
    product.isAvailable = false;
  } else  {
    product.isAvailable = true;
  }

  await product.save();

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);

  return product;
};

const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("category");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const getProducts = async () => {
  return await Product.find()
    .populate("category")
    .sort({ createdAt: -1 });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts
};