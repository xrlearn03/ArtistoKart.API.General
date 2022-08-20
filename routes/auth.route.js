const router = require("express").Router();

const {
  login,
  sendOTP,
  adminLogin,
  verifyOTP,
} = require("../controller/auth.controller");

router.post("/login", login);
router.post("/admin/login", adminLogin);
router.post("/admin/verify", verifyOTP);
router.post("/send-otp", sendOTP);

module.exports = router;
