const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await orderService.updateOrder(
      req.params.id,
      req.body
    );

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};