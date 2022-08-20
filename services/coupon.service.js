const Coupon = require("../models/Coupon");

async function couponList() {
  try {
    const coupons = await Coupon.find();
    return {
      status: 200,
      type: "success",
      coupons: coupons,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function createCoupon(body, file) {
  let imageData = null;
  let requiredFields = new Array();

  if (!body.code) {
    requiredFields.push({ code: "code field required" });
  }
  if (!body.discount) {
    requiredFields.push({ discount: "discount field required" });
  } else if (body.discount <= 0) {
    requiredFields.push({ discount: "discount value must be greater then 0" });
  }
  if (!body.cartValue) {
    requiredFields.push({ cartValue: "cartValue field required" });
  }

  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }
  const _coupon = await Coupon.findOne({ code: body.code });

  if (_coupon) {
    return {
      status: 400,
      type: "error",
      error: "Coupon already exit.",
    };
  }

  if (file) {
    const imageData = file.destination.replace("public/", "") + file.filename;
    body["image"] = imageData;
  }

  let coupon = new Coupon(body);
  try {
    coupon = await coupon.save();
    return {
      status: 200,
      type: "success",
      coupon: coupon,
    };
  } catch (error) {
    console.log("===========>", error);
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}

async function updateCoupon(id, couponData) {
  try {
    const coupon = await Coupon.findById(id);
    coupon.code = couponData.code;
    coupon.type = couponData.type;
    coupon.discount = couponData.discount;
    coupon.cartValue = couponData.cartValue;
    coupon.description = couponData.description;
    coupon.status = couponData.status;
    if (couponData.image) {
      let imageData =
        couponData.image.destination.replace("public/", "") +
        couponData.image.filename;
      coupon.image = imageData;
    }
    coupon.save();
    return {
      status: 200,
      type: "success",
      coupon: coupon,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function deleteCoupon(id) {
  try {
    const result = await Coupon.findByIdAndDelete(id);
    if (result) {
      return {
        status: 204,
        type: "success",
      };
    }
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

module.exports = {
  couponList,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
