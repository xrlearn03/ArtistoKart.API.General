const router = require("express").Router();
const { productData, createProduct,updateProduct,deleteProduct, singleProduct,searchProduct, productByCategory } = require("../controller/product.controller");
const {productUpload} = require('../helper/fileHelper');

router.get("/", productData);
router.get("/category/:id",productByCategory);
router.post("/create",productUpload.array('images',5), createProduct);
router.get("/:id", singleProduct);
router.get("/search/:text", searchProduct);
router.patch("/:id",productUpload.array('images',5), updateProduct);
router.delete("/:id",deleteProduct);


module.exports = router;