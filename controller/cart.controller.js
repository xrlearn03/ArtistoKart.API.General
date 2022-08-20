const cartService = require("../services/cart.service");

async function cartData(req, res, next) {
  const {user} = req;
  const response = await cartService.cartList(user);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      carts: response.carts,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}


async function createCart(req, res, next) {
  const { body,  user } = req;

  const response = await cartService.createCart(body, user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      carts: response.carts,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function deleteCart(req, res, next) {
  const { status, type, error, carts } = await cartService.deleteCart(
    req.params.id, req.user
  );

  if (status == 200) {
    return res.status(status).json({
      status,
      type,
      carts,
    });
  }
  return res.status(status).json({
    status,
    type,
    error
  });
}

module.exports = {
  cartData,
  createCart,
  deleteCart,
};
