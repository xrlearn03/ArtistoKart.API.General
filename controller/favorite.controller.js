const favoriteService = require("../services/favorite.service");

async function favoriteData(req, res, next) {
  const response = await favoriteService.favoriteList(req.user);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      favorites: response.favorites,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}



async function createFavorite(req, res, next) {
  const { body, user } = req;

  const response = await favoriteService.createFavorite(body.product, user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      favorite: response.favorite,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

module.exports = {
  favoriteData,
  createFavorite,
};
