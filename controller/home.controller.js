const homeService = require("../services/home.service");

async function homeData(req, res, next) {
  const {user} = req;
  const response = await homeService.homeData();
  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      banners: response.banners,
      topProducts: response.topProducts,
      premiumProducts: response.premiumProducts,
      recentProducts: response.recentProducts,
      topSellers: response.topSellers,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}



module.exports = {
  homeData
};
