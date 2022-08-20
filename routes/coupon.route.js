const router = require("express").Router();
const { couponData, createCoupon, updateCoupon, deleteCoupon } = require("../controller/coupon.controller");
const { upload } = require("../helper/fileHelper");

router.get("/", couponData);
router.post("/create", upload.single("image",1), createCoupon);
router.patch("/:id", upload.single("image",1), updateCoupon); 
router.delete("/:id", deleteCoupon);

module.exports = router;
