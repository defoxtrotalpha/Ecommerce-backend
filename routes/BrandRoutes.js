const express = require("express");
const { createBrand, fetchBrands } = require("../controller/BrandController");

const router = express.Router();

// /products is already added in base path
router.post("/", createBrand).get("/", fetchBrands);

exports.BrandRouter = router;
