const express = require("express");
const { updateUser, fetchUserById } = require("../controller/UserController");

const router = express.Router();

// /users is already added in base path
router.patch("/:id", updateUser).get("/:id", fetchUserById);

exports.UserRouter = router;
