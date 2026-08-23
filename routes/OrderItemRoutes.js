const express = require("express");
const OrderItemController = require("../controllers/OrderItemController");

const router = express.Router();

router.post("/", OrderItemController.createOrderItem);
router.get("/", OrderItemController.getOrderItems);
router.get("/:id", OrderItemController.getOrderItemById);
router.put("/:id", OrderItemController.updateOrderItem);
router.delete("/:id", OrderItemController.deleteOrderItem);

module.exports = router;
