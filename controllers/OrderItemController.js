const orderItemService = require("../services/orderItemService");

const createOrderItem = async (req, res, next) => {
  try {
    const orderItem = await orderItemService.createOrderItem(req.body);

    res.status(201).json(orderItem);
  } catch (error) {
    next(error);
  }
};

const getOrderItems = async (req, res, next) => {
  try {
    const orderItems = await orderItemService.getOrderItems();

    res.status(200).json(orderItems);
  } catch (error) {
    next(error);
  }
};

const getOrderItemById = async (req, res, next) => {
  try {
    const orderItem = await orderItemService.getOrderItemById(
      req.params.id
    );

    res.status(200).json(orderItem);
  } catch (error) {
    next(error);
  }
};

const updateOrderItem = async (req, res, next) => {
  try {
    const orderItem = await orderItemService.updateOrderItem(
      req.params.id,
      req.body
    );

    res.status(200).json(orderItem);
  } catch (error) {
    next(error);
  }
};

const deleteOrderItem = async (req, res, next) => {
  try {
    await orderItemService.deleteOrderItem(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem
};