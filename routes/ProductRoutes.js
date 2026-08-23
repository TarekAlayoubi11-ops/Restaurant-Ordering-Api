const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;