const Product = require("../models/Product");
const User = require("../models/User");
var slugify = require("slugify");

async function productList(pageOptions) {
  try {
    const limit = parseInt(pageOptions.limit);
    const page = parseInt(pageOptions.page);
    const skip = parseInt((page-1) * limit);
    const products = await Product.find().populate('seller').populate('category').limit(limit).skip(skip);
    return {
      status: 200,
      type: "success",
      products: products,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function singleProduct(id) {
  try {
    const product = await Product.findById(id).populate("seller");
    if (product) {
      return {
        status: 200,
        type: "success",
        product: product,
      };
    }
    return {
      status: 500,
      type: "error",
      error: "Product not found.",
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

async function searchProduct(text) {
  try {
    const products = await Product.find(
        {
          "$or":[
            {title:{$regex:text}},
            {slug:{$regex:text}},
            {description:{$regex:text}},
            {tags:{$regex:text}}
          ]
        }
    ).populate('seller').populate('category');
    if (products) {
      return {
        status: 200,
        type: "success",
        products: products,
      };
    }
    return {
      status: 500,
      type: "error",
      error: "Product not found.",
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}


async function productByCategory(id, pageOptions) {
  try {
    const limit = parseInt(pageOptions.limit);
    const skip = parseInt(pageOptions.page * pageOptions.limit);
    const products = await Product.find({category:id}).limit(limit).skip(skip);
    if (products) {
      return {
        status: 200,
        type: "success",
        products: products,
      };
    }
    return {
      status: 500,
      type: "error",
      error: "Product not found.",
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}

async function createProduct(body, files, user) {
  let requiredFields = new Array();

  if (files.length === 0) {
    requiredFields.push({
      images: "Upload at least one image for this product",
    });
  }
  if (!body.title) {
    requiredFields.push({ title: "Title field required" });
  } else if (body.title.length < 3) {
    requiredFields.push({
      title: "Title field must have text more then 3 letters.",
    });
  }
  if (!body.description) {
    requiredFields.push({ description: "description field required" });
  }
  if (!body.category) {
    requiredFields.push({ category: "Category field required" });
  }
  if (!body.price) {
    requiredFields.push({ price: "Price field required" });
  } else if (body.price < 1) {
    requiredFields.push({ price: "Price field must be more then 0" });
  }

  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }




  let productImages = files.map((image) => {
    return image.destination.replace("public/", "") + image.filename;
  });

  body["images"] = productImages;
  const slug = slugify(body.title, { lower: true });
  const data = await Product.findOne({ slug: slug });

  if (data) {
    body["slug"] = slug + "-" + Date.now();
  } else {
    body["slug"] = slug;
  }

  body["seller"] = user.id;

  if (body.discount && body.discount > 0) {
    body["priceAfterDiscount"] =
      body.price - (body.price * body.discount) / 100;
  } else {
    body["priceAfterDiscount"] = body.price;
  }
  try {
    const newProduct = new Product(body);
    const product = await newProduct.save();

    const userData = await User.findById(user.id);
    let totalArts = userData.totalArts?userData.totalArts:0;
    userData.totalArts = totalArts+1;
    const userdata = await userData.save();

    return {
      status: 200,
      type: "success",
      product: product,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: "Unable to save product",
    };
  }
}

async function updateProduct(body, files, user, id) {
  const product = await Product.findById(id);
  if (!product) {
    return {
      status: 404,
      type: "Not Found",
      error: "Product not found",
    };
  }

  let requiredFields = new Array();
  if (!body.title) {
    requiredFields.push({ title: "Title field required" });
  } else if (body.title.length < 3) {
    requiredFields.push({
      title: "Title field must have text more then 3 letters.",
    });
  }
  if (!body.description) {
    requiredFields.push({ description: "description field required" });
  }
  if (!body.category) {
    requiredFields.push({ category: "Category field required" });
  }
  if (!body.price) {
    requiredFields.push({ price: "Price field required" });
  } else if (body.price < 1) {
    requiredFields.push({ price: "Price field must be more then 0" });
  }

  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }
  if (files && files.length > 0) {
    let productImages = files.map((image) => {
      return image.destination.replace("public/", "") + image.filename;
    });
    product.images = productImages;
  }
  product.title = body.title;
  product.description = body.description;
  product.price = body.price;
  product.discount = body.discount;
  product.category = body.category;
  product.stock = body.stock;
  product.isFeatured = body.isFeatured;
  product.condition = body.condition;
  product.status = body.status;

  const slug = slugify(body.title, { lower: true });
  const data = await Product.findOne({ slug: slug });

  if (data !==null) {
    product.slug = slug + "-" + Date.now();
  } else {
    product.slug = slug;
  }
  if (body.discount && body.discount > 0) {
    product.priceAfterDiscount =
      body.price - (body.price * body.discount) / 100;
  }

  try {
    product.save();
    return {
      status: 200,
      type: "success",
      product: product,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function deleteProduct(id) {
  try {
    const result = await Product.findByIdAndDelete(id);
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
  productList,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productByCategory,
  searchProduct
};
