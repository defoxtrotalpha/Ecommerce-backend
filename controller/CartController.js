const { CartModel } = require("../model/CartModel");

exports.addToCart = async (req, res) => {
  const cart = new CartModel(req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.fetchCartByUser = async (req, res) => {
  try {
    const user = req.query.user;
    const cartItems = await CartModel.find({ user: user }).populate("product");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    // {new:true} shows the updated Cart
    const doc = await CartModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await CartModel.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
