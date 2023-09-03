const express = require("express");
const {
  createOrder,
  fetchOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../controller/OrderController");

const router = express.Router();

// /products is already added in base path
router
  .post("/", createOrder)
  .get("/", fetchOrdersByUserId)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.OrderRouter = router;
