const router = require("express").Router();
const { cartData,createCart,deleteCart } = require("../controller/cart.controller");

router.get("/", cartData);
router.post("/create",createCart);
router.get("/delete/:id",deleteCart);


module.exports = router;