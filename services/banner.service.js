const Banner = require("../models/Banner");

async function bannerList() {
  try {
    const banners = await Banner.find({});
    return {
      status: 200,
      type: "success",
      banners: banners,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function createBanner(title,status, image) {
  let requiredFields = new Array();

  if (!title) {
    requiredFields.push({ title: "title field required" });
  } else if (title.length < 3) {
    requiredFields.push({
      title: "title field must have text more then 3 letters.",
    });
  } if (!image) {
    requiredFields.push({ image: "image field required" });
  }else if (!image.filename) {
    requiredFields.push({ image: "image required" });
  }

    
  if (requiredFields.length > 0) {
    return {
      status: 400,
      type: "Bad request",
      error: requiredFields,
    };
  }

  let imageData = image.destination.replace("public/", "") + image.filename;

  let banner = new Banner({
    title: title,
    image: imageData,
    status: status,
  });
  try {
    banner = await banner.save();
    return {
      status: 200,
      type: "success",
      banner: banner,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: "Internal server error.",
    };
  }
}

async function updateBanner(id, title,status, image) {

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
  

  try {
    const banner = await Banner.findById(id);
    banner.title = title;
    banner.status = status;
    if (image) {
      let imageData = image.destination.replace("public/", "") + image.filename;
      banner.image = imageData;
    }

    banner.save();
    return {
      status: 200,
      type: "success",
      banner: banner,
    };
  } catch (error) {
    return {
      status: 500,
      type: "error",
      error: error,
    };
  }
}
async function deleteBanner(id) {
  try {
    const result = await Banner.findByIdAndDelete(id);

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

module.exports = { bannerList, createBanner, updateBanner, deleteBanner };
