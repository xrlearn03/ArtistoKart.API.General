const Favorite = require("../models/Favorite");

async function favoriteList(user) {
  try {
   //  const favorites = await Favorite.findOne({ user: user.id }).populate({
   //    path: 'products',
   //    populate: {
   //      path: 'seller',
   //      model: 'User'
   //    }
   // });
    const favorites = await Favorite.findOne({ user: user.id }).populate('products');
    return {
      status: 200,
      type: "success",
      favorites: favorites,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

async function createFavorite(product, user) {
  let requiredFields = new Array();

  if (!product) {
    requiredFields.push({ product: "Product field required" });
  }

  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }

  const favorite = await Favorite.findOne({ user: user.id });

  if (favorite) {
    if (favorite.products.includes(product)) {
      const { products } = favorite;

      let filterData = products.filter(
        (item) => item.toString() !== product.toString()
      );

      favorite.products = filterData;
      await favorite.save();
      return {
        type: "Success",
        status: 200,
        favorite: favorite,
      };
    }
    favorite.products.push(product);
    await favorite.save();

    return {
      type: "Success",
      status: 200,
      favorite: favorite,
    };
  } else {
    try {
      let favorite = new Favorite({
        products: [product],
        user: user.id,
      });

      favorite = favorite.save();
      const favorite1 = await Favorite.findOne({ user: user.id });

      return {
        type: "Success",
        status: 200,
        favorite: favorite1,
      };
    } catch (err) {
      return {
        type: "Error",
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
}

module.exports = {
  favoriteList,
  createFavorite,
};
