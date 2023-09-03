const { UserModel } = require("../model/UserModel");

exports.createUser = async (req, res) => {
  const user = new UserModel(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.logInUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "Invalid username" });
    } else if (user.password === req.body.password) {
      //TODO: This is temporary. We will use strong password encryption later
      res
        .status(201)
        .json({ email: user.email, id: user.id, addresses: user.addresses });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
