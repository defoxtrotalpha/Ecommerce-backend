const express = require("express");
const {
  createCategory,
  fetchCategories,
} = require("../controller/CategoryController");

const router = express.Router();

// /products is already added in base path
router.post("/", createCategory).get("/", fetchCategories);

exports.CategoryRouter = router;
