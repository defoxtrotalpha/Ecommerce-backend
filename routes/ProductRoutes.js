const express = require("express");
const {
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
} = require("../controller/ProductController");

const router = express.Router();

// /products is already added in base path
router
  .post("/", createProduct)
  .get("/", findAllProducts)
  .get("/:id", findProductById)
  .patch("/:id", updateProduct);

exports.ProductRouter = router;
