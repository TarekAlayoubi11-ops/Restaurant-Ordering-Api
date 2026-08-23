const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:id", OrderController.getOrderById);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;