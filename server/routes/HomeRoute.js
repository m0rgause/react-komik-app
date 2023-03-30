const home = require('../controller/HomeController');

var router = require("express").Router();
var homeRoute = require("express").Router();

router.get('/home', home.home);

homeRoute.use("/", router);

module.exports = { homeRoute };