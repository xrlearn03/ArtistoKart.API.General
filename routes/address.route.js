const router = require("express").Router();
const { addressData, createAddress, updateAddress, deleteAddress } = require("../controller/address.controller");

 router.get("/", addressData);
 router.post("/create", createAddress);
 router.patch("/:id", updateAddress);
 router.delete("/:id",deleteAddress);


module.exports = router;