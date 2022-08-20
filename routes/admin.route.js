const router = require("express").Router();
const { adminData, adminUpdate, sellers, customers } = require("../controller/user.controller");
const {upload} = require('../helper/fileHelper');

router.get("/details", adminData);
router.get("/sellers", sellers);
router.get("/customers", customers);
router.patch("/:id",upload.single('profileImage',1), adminUpdate);

module.exports = router;
