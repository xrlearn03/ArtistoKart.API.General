var mongoose = require("mongoose");

var shippingChargeSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    deliverable: { type: String },
    minimum_order_amount: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default:"active" },
   
  },
  { timestamps: true }
);

var Order = (module.exports = mongoose.model("ShippingCharge", shippingChargeSchema));
