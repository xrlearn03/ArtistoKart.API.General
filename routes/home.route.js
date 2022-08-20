const router = require("express").Router();
const { homeData } = require("../controller/home.controller");
const {upload} = require('../helper/fileHelper');

router.get("/", homeData);


module.exports = router;
