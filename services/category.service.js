const Category = require("../models/Category");
var slugify = require("slugify");

async function categoryList() {
  try {
    const categories = await Category.find();
    return {
      status: 200,
      type: "success",
      categories: categories,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function createCategory(title,isFeatured, image, status) {
  let requiredFields = new Array();

  if (!title) {
    requiredFields.push({ title: "title field required" });
  } else if (title.length < 3) {
    requiredFields.push({
      title: "title field must have text more then 3 letters.",
    });
  }

  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }
  

  let imageData = null;
  if (image) {
    imageData = image.destination.replace("public/", "") + image.filename;
  }
  const slug = slugify(title, { lower: true });
  const cate = await Category.findOne({ slug: slug });

  if (cate) {
    return {
      status: 400,
      type: "error",
      error: "Category already exit.",
    };
  }


  let category = new Category({
    title: title,
    image: imageData,
    isFeatured:isFeatured?isFeatured:false,
    status: status?status:"active",
    slug: slug,
  });

  try {
    category = await category.save();

    return {
      status: 200,
      type: "success",
      category: category,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}

async function updateCategory(id, title,isFeatured, image, status) {
  try {
    const category = await Category.findById(id);
    category.title = title;
    category.isFeatured = isFeatured;
    category.status = status;
    if (image) {
      let imageData = image.destination.replace("public/", "") + image.filename;
      category.image = imageData;
    }

    category.save();
    return {
      status: 200,
      type: "success",
      category: category,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function deleteCategory(id) {
  try {
    const result = await Category.findByIdAndDelete(id);

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
  categoryList,
  createCategory,
  updateCategory,
  deleteCategory,
};
