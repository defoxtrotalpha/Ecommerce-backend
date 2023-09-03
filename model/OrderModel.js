const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  selectedAddress: { type: [Schema.Types.Mixed], required: true },
  totalPrice: { type: Number },
  totalItems: { type: Number },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//////////////////////
// MAPPING _id TO id TO MAKE IT COMPATIBLE WITH FRONTEND

// This line defines a virtual property named 'id' on the orderSchema
const virtual = orderSchema.virtual("id");

// This sets a getter function for the 'id' virtual property
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
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

exports.OrderModel = mongoose.model("Order", orderSchema);
