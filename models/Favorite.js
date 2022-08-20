var mongoose = require("mongoose");

var favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    ]
  },
  { timestamps: true }
);

var Favorite = (module.exports = mongoose.model("Favorite", favoriteSchema));

