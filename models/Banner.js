var mongoose = require("mongoose");

var bannerSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
   
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

var Banner = (module.exports = mongoose.model("Banner", bannerSchema));

module.exports.createBanner = function (newBanner, callback) {
  newBanner.save(callback);
};

module.exports.getAllBanners = function (callback) {
  Banner.find(callback);
};
