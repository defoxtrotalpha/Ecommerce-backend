const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//////////////////////
// MAPPING _id TO id TO MAKE IT COMPATIBLE WITH FRONTEND

// This line defines a virtual property named 'id' on the cartSchema
const virtual = cartSchema.virtual("id");

// This sets a getter function for the 'id' virtual property
virtual.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
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

exports.CartModel = mongoose.model("Cart", cartSchema);
