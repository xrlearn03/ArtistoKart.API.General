var mongoose = require("mongoose");

var orderSchema = mongoose.Schema(
  {
    carts: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Cart',
        required: true
      }
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    orderId:{
      type:String,
      required:true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    paidAt: {
      type: Date,
      default: null,
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    shippingAddress: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String, default:'IN' }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentId: {
      type: String
    },
    taxPrice: {
      type: Number,
      default: 0.0
    },
    shippingCharge: {
        type: mongoose.Types.ObjectId,
        ref: 'ShippingCharge',
        required: true
    },
    discount: {
      type: mongoose.Types.ObjectId,
      ref: 'Coupon',
      default:null
    },
    status: {
      type: String,
      default: 'Not Processed',
      enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
  },
  { timestamps: true }
);

var Order = (module.exports = mongoose.model("Order", orderSchema));

