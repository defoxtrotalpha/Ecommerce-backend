const express = require("express");
const { createUser, logInUser } = require("../controller/AuthController");

const router = express.Router();

// /auth is already added in base path
router.post("/signup", createUser).post("/login", logInUser);

exports.AuthRouter = router;
