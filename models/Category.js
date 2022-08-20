var mongoose = require("mongoose");

var categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
   
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);



var Category = (module.exports = mongoose.model("Category", categorySchema));

module.exports.createCategory = function (newCategory, callback) {
  newCategory.save(callback);
};

module.exports.getCategoryById = function (id, callback) {
  Category.findById(id, callback);
};

module.exports.getAllCategories = function (callback) {
  Category.find(callback);
};
