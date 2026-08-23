const express = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
