const { categoryModel } = require("../model/CategoryModel");

exports.createCategory = async (req, res) => {
  const category = new categoryModel(req.body);
  try {
    const doc = await category.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.fetchCategories = async (req, res) => {
  try {
    const docs = await categoryModel.find({});
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
