const couponService = require("../services/coupon.service");

async function couponData(req, res, next) {
  const response = await couponService.couponList();

  if (response.status == 500) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      error: response.error,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    coupons: response.coupons,
  });
}

async function createCoupon(req, res, next) {
  const { body, file } = req;

  const response = await couponService.createCoupon(body, file);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      coupon: response.coupon,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function updateCoupon(req, res, next) {
  const { code, type, description, discount, cartValue, status } = req.body;

  const coupon = {
    code,
    type,
    discount,
    cartValue,
    description,
    status,
    image: req.file,
  };
  const response = await couponService.updateCoupon(req.params.id, coupon);

  if (response.status == 500) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      error: response.error,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    coupon: response.coupon,
  });
}

async function deleteCoupon(req, res, next) {
  const { status, type, error } = await couponService.deleteCoupon(
    req.params.id
  );

  if (status == 500) {
    return res.status(status).json({
      status,
      type,
      error,
    });
  }
  return res.status(status).json({
    status,
    type,
  });
}

module.exports = { couponData, createCoupon, updateCoupon, deleteCoupon };
