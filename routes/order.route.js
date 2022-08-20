const router = require("express").Router();
const {orderData,singleOrder,createOrder, searchOrder } = require("../controller/order.controller");

router.get("/", orderData);
router.post("/create", createOrder);
router.get("/:id", singleOrder);
router.get("/search/:text", searchOrder);


module.exports = router;