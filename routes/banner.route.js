const router = require("express").Router();
const { bannerData, createBanner,updateBanner, deleteBanner } = require("../controller/banner.controller");
const {bannerUpload} = require('../helper/fileHelper');

router.get("/", bannerData);
router.post("/create",bannerUpload.single('image',1), createBanner);
router.patch("/:id",bannerUpload.single('image',1), updateBanner);
router.delete("/:id",deleteBanner);


module.exports = router;