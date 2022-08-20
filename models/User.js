var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    fcm_token: {
      type: String,
      default: null,
    },
    order: {
      type: String,
      default: null,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
     
    },
    totalArts: {
      type: Number,
      default: 0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id'
});
var User = (module.exports = mongoose.model("User", userSchema));
