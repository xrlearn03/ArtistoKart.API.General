const Order = require("../models/Order");
const Cart = require("../models/Cart");

async function orderList(pageOptions, user) {
  try {
    const limit = parseInt(pageOptions.limit);
    const page = parseInt(pageOptions.page);
    const skip = parseInt((page-1) * limit);
    const orders = await Order.find().populate('shippingCharge').populate('user').limit(limit).skip(skip);
    return {
      status: 200,
      type: "success",
      orders: orders,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}

async function singleOrder(id) {
  try {
    const order = await Order.findById(id).populate({ 
      path: 'carts',
      populate: {
        path: 'product',
        model: 'Product'
      } 
   }).populate('shippingCharge').populate('discount');
    if (order) {
      return {
        status: 200,
        type: "success",
        order: order,
      };
    }
    return {
      status: 500,
      type: "error",
      error: "order not found.",
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}


async function searchOrder(text) {
  try {
    const orders = await Order.find(
        {
          "$or":[
            {orderId:{$regex:text}},
            {status:{$regex:text}}
          ]
        }
    ).populate('shippingCharge').populate('user');
    if (orders) {
      return {
        status: 200,
        type: "success",
        orders: orders,
      };
    }
    return {
      status: 500,
      type: "error",
      error: "Order not found.",
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

async function createOrder(body, user) {
  let requiredFields = new Array();

  if (!body.shippingAddress) {
    requiredFields.push({ shippingAddress: "shippingAddress field required" });
  }
  if (!body.paymentMethod) {
    requiredFields.push({ paymentMethod: "paymentMethod field required" });
  }
  if (!body.shippingCharge) {
    requiredFields.push({ shippingCharge: "shippingCharge field required" });
  } 
  
  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }
  const carts = await Cart.find({ user: user.id, orderId:null });
  let result = carts.map(a => a.id);
  if(result && result.length===0){
    return {
      status: 500,
      type: "error",
      error: "Cart not found",
    };
  }

  let orderId = "ORD-"+Date.now() ;
  const total_amount = carts.reduce((accumulator, object) => {
    return accumulator + parseFloat(object.amount);
  }, 0);
  body['carts'] = result;
  body['user'] = user.id;
  body['orderId'] = orderId;
  body['totalPrice'] = total_amount;


  try {
    const newOrder = new Order(body);
    const order = await newOrder.save();

    return {
      status: 200,
      type: "success",
      order: order,
    };
  } catch (error) {
    console.log("=======>", error);
    return {
      status: 500,
      type: "error",
      error: "Unable to save product",
    };
  }
}


module.exports = {
  orderList,
  singleOrder,
  createOrder,
  searchOrder
};
