const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function cartList(user) {
  try {
    const carts = await Cart.find({ user: user.id }).populate('product');
    return {
      status: 200,
      type: "success",
      carts: carts,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

async function createCart(body, user) {
  let requiredFields = new Array();

  if (!body.product) {
    requiredFields.push({ product: "Product field required" });
  }
  if (!body.quantity) {
    requiredFields.push({ quantity: "Quantity field required" });
  } else if (body.quantity <= 0) {
    requiredFields.push({ quantity: "Quantity must be more then 1" });
  }

  
  const product = await Product.findById(body.product);
  const alreadyCart = await Cart.find({product:body.product, user:user.id, orderId:null});
  if (!product) {
    return {
      status: 404,
      type: "Bad request",
      error: "Product Not Found.",
    };
  }

  if(alreadyCart.length>0){
    return {
      status: 400,
      type: "Bad request",
      error: "Product Already in your cart. you can not add more",
    };
  }

  body["user"] = user.id;
  body["seller"] = product.seller;
  body["price"] = product.priceAfterDiscount;
  body["amount"] = product.priceAfterDiscount * body.quantity;
  try {
    const newCart = new Cart(body);
    const cart = await newCart.save();
    const carts = await Cart.find({ user: user.id, orderId:null });
    return {
      status: 200,
      type: "success",
      carts: carts,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: "Unable to save cart",
    };
  }
}

async function deleteCart(id,user) {
  try {
    const result = await Cart.findByIdAndDelete(id);
    const carts = await Cart.find({ user: user.id, orderId:null });

    return {
      status: 200,
      type: "success",
      carts:carts
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
  cartList,
  createCart,
  deleteCart,
};
