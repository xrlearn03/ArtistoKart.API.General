var mongoose = require("mongoose");

var productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    images: {
      type: [String],
      required: [true, 'A product must have a image']
    },
    description: {
      type: String,
      required: [true, 'A product must have a description']
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category'
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    priceAfterDiscount: {
      type: Number,
      required: true,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 1
    },
    sold: {
      type: Number,
      default: 0
    },
    isOutOfStock: {
      type: Boolean,
      default: false
    },
   
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: {
      type: String,
      default: null
    },
    condition: {
          type: String,
          enum: ["default", "premium","top", "new", "hot"],
          default: "default",
    },
    fullText: {
          type: String,
          default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

var Product = (module.exports = mongoose.model("Product", productSchema));

module.exports.saveProduct = function (newProduct, callback) {
  newProduct.save(callback);
};



module.exports.getProductById = function (id, callback) {
  Product.findById(id, callback);
};


module.exports.getAllProducts = function (callback) {
  Product.find(callback);
};
