const productService = require("../services/product.service");

async function productData(req, res, next) {
  const response = await productService.productList({
    page: req.query.page || 1,
    limit: req.query.limit || 10,
  });

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      products: response.products,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function productByCategory(req, res, next) {
  const response = await productService.productByCategory(req.params.id,{
    page: req.query.page || 0,
    limit: req.query.limit || 10,
  });

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      products: response.products,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}


async function singleProduct(req, res, next) {
  const response = await productService.singleProduct(req.params.id);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      product: response.product,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function searchProduct(req, res, next) {
  const response = await productService.searchProduct(req.params.text);

  if (response?.status == 200) {
    return res.status(response?.status).json({
      status: response.status,
      type: response.type,
      products: response.products,
    });
  }
  return res.status(response?.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function createProduct(req, res, next) {
  const { body, files, user } = req;

  const response = await productService.createProduct(body, files, user);

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      product: response.product,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function updateProduct(req, res, next) {
  const { body, files, user, params } = req;

  const response = await productService.updateProduct(
    body,
    files,
    user,
    params.id
  );

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      product: response.product,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function deleteProduct(req, res, next) {
  const { status, type, error } = await productService.deleteProduct(
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

module.exports = {
  productData,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProduct,
  productByCategory,
  searchProduct
};
