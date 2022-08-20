var mongoose = require("mongoose");
import slugify from "slugify";

var reviewSchema  = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a product']
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  { timestamps: true }
);

var Review = (module.exports = mongoose.model("Review", reviewSchema));

