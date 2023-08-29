const { ProductModel } = require("../model/ProductModel");

exports.createProduct = async (req, res) => {
  const product = new ProductModel(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.findAllProducts = async (req, res) => {
  // filter:{"category":["smartphones","laptops"]}
  // sort: {"_sort":"price","_order":"desc"}
  // pagination: {"_page":1,"_limit":10}
  //TODO: we will also try with multiple categories/ brands

  // Product.find returns a query waiting to be executed
  let query = ProductModel.find({});
  const product = new ProductModel(req.body);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
  }

  //Creating a deep copy of query obj
  const totalProductsQuery = query.clone();

  //Sorting
  // Square brackets are used to set the key in object dynamically [syntax]
  if (req.query._sort && req.query._order) {
    const order = req.query._order;
    query = query.sort({ [req.query._sort]: order });
  }

  //Pagination
  if (req.query._page && req.query._limit) {
    const currPage = req.query._page;
    const limit = req.query._limit;
    query = query.skip(limit * (currPage - 1)).limit(limit);
  }

  // .count executes the query. So we copied the original query
  const totalDocs = await totalProductsQuery.count();

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(201).json(docs);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.findProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await ProductModel.findById(id);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // {new:true} shows the updated product
    const doc = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
