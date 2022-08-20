const ShippingCharge = require("../models/ShippingCharge");

async function shippingChargeList() {

  try {
    const shippingCharges = await ShippingCharge.find().sort({minimum_order_amount: 1});
    return {
      status: 200,
      type: "success",
      shippingCharges: shippingCharges,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      type: "error",
      error: "Unable to fetch data.",
    };
  }
}

async function createShippingCharge(body) {
  let requiredFields = new Array();

  if (!body.title) {
    requiredFields.push({ title: "title field required" });
  } else if (body.title.length < 3) {
    requiredFields.push({
      title: "title field must have text more then 3 letters.",
    });
  }
  
  if (!body.deliverable) {
    requiredFields.push({ deliverable: "deliverable field required" });
  } 
  
  if (!body.minimum_order_amount) {
    requiredFields.push({ minimum_order_amount: "minimum_order_amount field required" });
  }
  if (!body.price) {
    requiredFields.push({ price: "price field required" });
  }
  
  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }

  let shippingCharge = new ShippingCharge(body);

  try {
    shippingCharge = await shippingCharge.save();

    return {
      status: 200,
      type: "success",
      shippingCharge: shippingCharge,
    };
  } catch (error) {
    console.log("==================>",error);
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}

async function updateShippingCharge(body,id) {

  let requiredFields = new Array();

  if (!body.title) {
    requiredFields.push({ title: "title field required" });
  } else if (body.title.length < 3) {
    requiredFields.push({
      title: "title field must have text more then 3 letters.",
    });
  }
  
  if (!body.deliverable) {
    requiredFields.push({ deliverable: "phone field required" });
  }
  
  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }

  try {
    const shippingCharge = await ShippingCharge.findByIdAndUpdate(id, body, {
      new: true,
    });
    shippingCharge.save();
    return {
      status: 200,
      type: "success",
      shippingCharge: shippingCharge,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function deleteShippingCharge(id) {
  try {
    const result = await ShippingCharge.findByIdAndDelete(id);

    return {
      status: 204,
      type: "success",
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
  shippingChargeList,
  createShippingCharge,
  updateShippingCharge,
  deleteShippingCharge,
};
