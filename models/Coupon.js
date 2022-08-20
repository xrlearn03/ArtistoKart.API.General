var mongoose = require("mongoose");

var couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true
    },
    cartValue: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: null,
     },
    image: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["fixed", "percent"],
      default: "fixed",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

var Coupon = (module.exports = mongoose.model("Coupon", couponSchema));
