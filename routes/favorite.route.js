const router = require("express").Router();
const {createFavorite,favoriteData } = require("../controller/favorite.controller");
const {productUpload} = require('../helper/fileHelper');

router.get("/", favoriteData);
router.post("/create", createFavorite);


module.exports = router;