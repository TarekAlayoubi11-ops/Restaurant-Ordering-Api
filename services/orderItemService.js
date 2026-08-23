const OrderItem = require("../models/orderItem.model");
const Order = require("../models/order.model");
const Product = require("../models/product");

const createOrderItem = async (data) => {
  const {
    order,
    product,
    quantity
  } = data;

  if (!order) {
    throw new Error("Order is required");
  }

  if (!product) {
    throw new Error("Product is required");
  }

  if (!quantity || quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const existingOrder = await Order.findById(order);

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  const existingProduct = await Product.findById(product);

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  if (!existingProduct.isAvailable) {
    throw new Error("Product is not available");
  }

  if (existingProduct.stock < quantity) {
    throw new Error("Not enough stock");
  }

  const price = existingProduct.price;

  const orderItem = await OrderItem.create({
    order,
    product,
    quantity,
    price
  });

  existingProduct.stock -= quantity;

  if (existingProduct.stock === 0) {
    existingProduct.isAvailable = false;
  }

  await existingProduct.save();

  return orderItem;
};

const updateOrderItem = async (id, data) => {
  const orderItem = await OrderItem.findById(id);

  if (!orderItem) {
    throw new Error("Order item not found");
  }

  const {
    quantity
  } = data;

  if (quantity === undefined) {
    throw new Error("Quantity is required");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const product = await Product.findById(orderItem.product);

  if (!product) {
    throw new Error("Product not found");
  }

  const quantityDifference =
    quantity - orderItem.quantity;

  if (quantityDifference > 0) {
    if (product.stock < quantityDifference) {
      throw new Error("Not enough stock");
    }

    product.stock -= quantityDifference;
  }

  if (quantityDifference < 0) {
    product.stock += Math.abs(quantityDifference);
  }

  product.isAvailable = product.stock > 0;

  await product.save();

  orderItem.quantity = quantity;

  await orderItem.save();

  return orderItem;
};

const deleteOrderItem = async (id) => {
  const orderItem = await OrderItem.findById(id);

  if (!orderItem) {
    throw new Error("Order item not found");
  }

  const product = await Product.findById(orderItem.product);

  if (product) {
    product.stock += orderItem.quantity;
    product.isAvailable = product.stock > 0;

    await product.save();
  }

  await OrderItem.findByIdAndDelete(id);

  return orderItem;
};

const getOrderItemById = async (id) => {
  const orderItem = await OrderItem.findById(id)
    .populate("product")
    .populate("order");

  if (!orderItem) {
    throw new Error("Order item not found");
  }

  return orderItem;
};

const getOrderItems = async () => {
  return await OrderItem.find()
    .populate("product")
    .populate("order")
    .sort({ createdAt: -1 });
};

module.exports = {
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getOrderItemById,
  getOrderItems
};