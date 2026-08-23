const Order = require("../models/order.model");
const User = require("../models/user");
const OrderItem = require("../models/orderItem.model");

const createOrder = async (data) => {
  const {
    user,
    totalPrice,
    status,
    paymentMethod,
    deliveryAddress,
    notes
  } = data;

  if (!user) {
    throw new Error("User is required");
  }

  if (!deliveryAddress) {
    throw new Error("Delivery address is required");
  }

  if (totalPrice === undefined || totalPrice < 0) {
    throw new Error("Total price cannot be negative");
  }

  const existingUser = await User.findById(user);

  if (!existingUser) {
    throw new Error("User not found");
  }

  const allowedStatuses = [
    "Pending",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled"
  ];

  if (status && !allowedStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }

  const allowedPaymentMethods = ["Cash", "Card"];

  if (
    paymentMethod &&
    !allowedPaymentMethods.includes(paymentMethod)
  ) {
    throw new Error("Invalid payment method");
  }

  const order = await Order.create({
    user,
    totalPrice,
    status: status || "Pending",
    paymentMethod: paymentMethod || "Cash",
    deliveryAddress: deliveryAddress.trim(),
    notes: notes?.trim()
  });

  return order;
};

const updateOrder = async (id, data) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  const {
    status,
    paymentMethod,
    deliveryAddress,
    notes,
    totalPrice
  } = data;

  if (totalPrice !== undefined && totalPrice < 0) {
    throw new Error("Total price cannot be negative");
  }

  const allowedStatuses = [
    "Pending",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled"
  ];

  if (
    status !== undefined &&
    !allowedStatuses.includes(status)
  ) {
    throw new Error("Invalid order status");
  }

  const allowedPaymentMethods = ["Cash", "Card"];

  if (
    paymentMethod !== undefined &&
    !allowedPaymentMethods.includes(paymentMethod)
  ) {
    throw new Error("Invalid payment method");
  }

  if (status !== undefined) {
    order.status = status;
  }

  if (paymentMethod !== undefined) {
    order.paymentMethod = paymentMethod;
  }

  if (deliveryAddress !== undefined) {
    order.deliveryAddress = deliveryAddress.trim();
  }

  if (notes !== undefined) {
    order.notes = notes.trim();
  }

  if (totalPrice !== undefined) {
    order.totalPrice = totalPrice;
  }

  await order.save();

  return order;
};

const deleteOrder = async (id) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  await OrderItem.deleteMany({
    order: id
  });

  await Order.findByIdAndDelete(id);

  return order;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user");

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

const getOrders = async () => {
  return await Order.find()
    .populate("user")
    .sort({ createdAt: -1 });
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrders
};