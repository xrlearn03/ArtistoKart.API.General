const shippingChargeService = require("../services/shippingCharge.service");

async function shippingChargeData(req, res, next) {
 const response = await shippingChargeService.shippingChargeList();

  if (response.status === 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      shippingCharges: response.shippingCharges,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function createShippingCharge(req, res, next) {
  const { body, user } = req;

  const response = await shippingChargeService.createShippingCharge(body);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      shippingCharge: response.shippingCharge,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function updateShippingCharge(req, res, next) {
  const { body, user } = req;
  const response = await shippingChargeService.updateShippingCharge(body, req.params.id);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      shippingCharge: response.shippingCharge,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function deleteShippingCharge(req, res, next) {
  const response = await shippingChargeService.deleteShippingCharge(req.params.id);

  if (response.status === 204) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

module.exports = {
  shippingChargeData,
  createShippingCharge,
  updateShippingCharge,
  deleteShippingCharge,
};
