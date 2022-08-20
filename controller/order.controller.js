const orderService = require("../services/order.service");

async function orderData(req, res, next) {
  const response = await orderService.orderList({
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  }, req.user);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      orders: response.orders,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function searchOrder(req, res, next) {
  const response = await orderService.searchOrder(req.params.text);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      orders: response.orders,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}


async function singleOrder(req, res, next) {
  const response = await orderService.singleOrder(req.params.id);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      order: response.order,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function createOrder(req, res, next) {
  const { body, user } = req;

  const response = await orderService.createOrder(body, user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      order: response.order,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}


module.exports = {
  orderData,
  createOrder,
  singleOrder,
  searchOrder
};
