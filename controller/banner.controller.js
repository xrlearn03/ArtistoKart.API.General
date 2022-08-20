const bannerService = require("../services/banner.service");
const TypedError = require("../helper/ErrorHandler");


async function bannerData(req, res, next) {
  const { type, error, status, banners } = await bannerService.bannerList();

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
    banners,
  });
}

async function createBanner(req, res, next) {
  const {title} = req.body;

  const { status,type,error,banner } = await bannerService.createBanner(title, req.body.status, req.file);

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
    banner,
  });
}

async function updateBanner(req, res, next) {
  const {title} = req.body;
  const image = req.file;
  const { status,type,error,banner } = await bannerService.updateBanner(req.params.id, title, req.body.status, image);

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
    banner,
  });
}

async function deleteBanner(req, res, next) {

  const { status,type,error } = await bannerService.deleteBanner(req.params.id);

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

module.exports = { bannerData, createBanner, updateBanner, deleteBanner };
