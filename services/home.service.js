const Product = require("../models/Product");
const User = require("../models/User");
const Banner = require("../models/Banner");

async function homeData() {
  try {
    const topProducts = await Product.find({condition:"top"}).limit(5);
    const premiumProducts = await Product.find({condition:"premium"}).limit(5);
    const recentProducts = await Product.find().sort({created_at:-1}).limit(5);
    const topSellers = await User.find({ role: "seller" }).sort({order:1}).limit(5);
    const banners = await Banner.find({status:"active"});

    return {
      status: 200,
      type: "success",
      banners:banners,
      topProducts: topProducts,
      premiumProducts: premiumProducts,
      recentProducts: recentProducts,
      topSellers: topSellers,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

module.exports = {
  homeData
};
