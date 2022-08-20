const router = require("express").Router();
const { shippingChargeData, createShippingCharge, updateShippingCharge, deleteShippingCharge } = require("../controller/shippingCharge.controller");

 router.get("/", shippingChargeData);
 router.post("/create", createShippingCharge);
 router.patch("/:id", updateShippingCharge);
 router.delete("/:id",deleteShippingCharge);


module.exports = router;