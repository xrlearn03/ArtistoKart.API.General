const router = require("express").Router();
const { userData, userUpdate, addUser, deleteUser, topSellers } = require("../controller/user.controller");
const {upload} = require('../helper/fileHelper');

router.post("/create", upload.single('profileImage',1), addUser);
router.get("/:id", userData);
router.delete("/:id", deleteUser);
router.get("/top/sellers", topSellers);
router.patch("/:id",upload.single('profileImage',1), userUpdate);

module.exports = router;
