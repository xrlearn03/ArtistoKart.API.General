var mongoose = require("mongoose");

var cartSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 1,
    },
    amount: {
      type: Number,
      default: 1,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default:null
    },
  },
  { timestamps: true }
);

var Cart = (module.exports = mongoose.model("Cart", cartSchema));
