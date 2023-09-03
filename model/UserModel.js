const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: {
    type: String,
  },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
  addresses: { type: Schema.Types.Mixed },
});

//////////////////////
// MAPPING _id TO id TO MAKE IT COMPATIBLE WITH FRONTEND

// This line defines a virtual property named 'id' on the userSchema
const virtual = userSchema.virtual("id");

// This sets a getter function for the 'id' virtual property
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
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

exports.UserModel = mongoose.model("User", userSchema);
