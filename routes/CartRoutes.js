const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  updateCart,
  deleteFromCart,
} = require("../controller/CartController");

const router = express.Router();

// /products is already added in base path
router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteFromCart);

exports.CartRouter = router;
