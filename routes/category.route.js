const router = require("express").Router();
const { categoryData, createCategory, updateCategory, deleteCategory } = require("../controller/category.controller");
const {categoryUpload} = require('../helper/fileHelper');

router.get("/", categoryData);
 router.post("/create",categoryUpload.single('image',1), createCategory);
 router.patch("/:id",categoryUpload.single('image',1), updateCategory);
 router.delete("/:id",deleteCategory);


module.exports = router;