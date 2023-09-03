const { OrderModel } = require("../model/OrderModel");

exports.createOrder = async (req, res) => {
  const order = new OrderModel(req.body);
  try {
    const doc = await order.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.fetchOrdersByUserId = async (req, res) => {
  try {
    const user = req.query.user;
    const orderItems = await OrderModel.find({ user: user });
    res.status(200).json(orderItems);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    // {new:true} shows the updated order
    const doc = await OrderModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await OrderModel.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
