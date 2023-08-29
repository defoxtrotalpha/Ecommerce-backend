const { brandModel } = require("../model/BrandModel");

exports.createBrand = async (req, res) => {
  const brand = new brandModel(req.body);
  try {
    const doc = await brand.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.fetchBrands = async (req, res) => {
  try {
    const docs = await brandModel.find({});
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
