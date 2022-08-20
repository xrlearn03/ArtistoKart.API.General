var mongoose = require("mongoose");

var addressSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String},
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, default: "IN" },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

var Order = (module.exports = mongoose.model("Address", addressSchema));
