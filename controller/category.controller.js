const categoryService = require("../services/category.service");

async function categoryData(req, res, next) {
  const response = await categoryService.categoryList();

  if (response.status == 200) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      categories: response.categories,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    error: response.error,
  });
}

async function createCategory(req, res, next) {
  const { title, status,isFeatured } = req.body;

  const response = await categoryService.createCategory(
    title,
    isFeatured,
    req.file,
    status
  );

  if (response.status == 500) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      error: response.error,
    });
  } else if (response.status == 400) {
    return res.status(response.status).json({
      status: response.status,
      type: response.type,
      error: response.error,
    });
  }
  return res.status(response.status).json({
    status: response.status,
    type: response.type,
    category: response.category,
  });
}

async function updateCategory(req, res, next) {
  const { title, isFeatured, status } = req.body;
  const image = req.file;
  const response = await categoryService.updateCategory(
    req.params.id,
    title,
    isFeatured,
    image,
    status
  );

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
    category: response.category,
  });
}

async function deleteCategory(req, res, next) {
  const { status, type, error } = await categoryService.deleteCategory(
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
  categoryData,
  createCategory,
  updateCategory,
  deleteCategory,
};
