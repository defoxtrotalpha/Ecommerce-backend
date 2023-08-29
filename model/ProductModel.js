const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: [1, "Wrong min price"],
    max: [10000, "Wrong max price"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "Wrong min discount"],
    max: [100, "Wrong max discount"],
  },
  rating: {
    type: Number,
    min: [1, "Wrong min rating"],
    max: [5, "Wrong max rating"],
    default: 0,
  },
  stock: { type: Number, min: [0, "Wrong min stock"], default: 1 },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  isDeleted: { type: Boolean, default: false },
});

//////////////////////
// MAPPING _id TO id TO MAKE IT COMPATIBLE WITH FRONTEND

// This line defines a virtual property named 'id' on the productSchema
const virtual = productSchema.virtual("id");

// This sets a getter function for the 'id' virtual property
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  // This option includes virtual properties in the JSON representation of the document
  virtuals: true,
  // This option suppresses the inclusion of the default __v version key in the JSON output
  versionKey: false,
  // The ret parameter represents the object that will eventually become the final output of the transformation
  // doc is the original document
  transform: function (doc, ret) {
    delete ret._id;
  },
});
/////////////////////

exports.ProductModel = mongoose.model("Product", productSchema);
