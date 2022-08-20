const router = require("express").Router();
const {
  settingData,
  createSetting,
} = require("../controller/setting.controller");
const { upload } = require("../helper/fileHelper");

router.get("/", settingData);
router.post(
  "/",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "favIcon",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  createSetting
);

module.exports = router;
