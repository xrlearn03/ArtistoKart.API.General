const settingService = require("../services/setting.service");

async function settingData(req, res, next) {
  const response = await settingService.settingData();

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
    setting: response.setting,
  });
}

async function createSetting(req, res, next) {
  const logo = req.files.logo ? req.files.logo[0] : null;
  const favicon = req.files.favIcon ? req.files.favIcon[0] : null;
  const banner = req.files.banner ? req.files.banner[0] : null;
  const {
    title,
    description,
    address,
    phone,
    email,
    currency,
    copyright,
    firebaseKey,
  } = req.body;

  const newSetting = {
    title,
    description,
    address,
    phone,
    email,
    currency,
    copyright,
    firebaseKey,
    logo:logo,
    favIcon:favicon,
    banner:banner
  };

  const response = await settingService.createSetting(newSetting);

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
    setting: response.setting,
  });
}

module.exports = { settingData, createSetting };
