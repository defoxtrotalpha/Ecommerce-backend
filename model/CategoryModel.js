const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

//////////////////////
// MAPPING _id TO id TO MAKE IT COMPATIBLE WITH FRONTEND

// This line defines a virtual property named 'id' on the categorySchema
const virtual = categorySchema.virtual("id");

// This sets a getter function for the 'id' virtual property
virtual.get(function () {
  return this._id;
});

categorySchema.set("toJSON", {
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

exports.categoryModel = mongoose.model("Category", categorySchema);
