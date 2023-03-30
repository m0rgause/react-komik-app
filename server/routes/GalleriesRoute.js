const galleries = require('../controller/GalleriesController');

var router = require("express").Router();
var galleriesRoute = require("express").Router();

router.get(["/galleries/:uri", "/galleries/:uri/:page"], galleries.gallery);

galleriesRoute.use("/", router);

module.exports = { galleriesRoute };