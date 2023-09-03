const { UserModel } = require("../model/UserModel");

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // {new:true} shows the updated user
    const doc = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.fetchUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await UserModel.findById(id);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
