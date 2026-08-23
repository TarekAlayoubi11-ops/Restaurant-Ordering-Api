const express = require("express");

const userController = require("../controllers/UserController");

const authenticate = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();
const ownership=require("../middleware/ownership")



router.post("/", userController.createUser);

router.post("/login", userController.login);

router.post("/refresh", userController.refresh);

router.post("/logout", userController.logout);



router.get(
  "/",
  authenticate,
  authorize("admin"),
  userController.getUsers
);

router.get(
  "/:id",
  authenticate,
  ownership,
  userController.getUserById
);

router.put(
  "/:id",
  authenticate,
  ownership,
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  ownership,
  userController.deleteUser
);

module.exports = router;