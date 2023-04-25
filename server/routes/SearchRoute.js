const { search, genres } = require('../controller/SearchController');

var router = require("express").Router();
var searchRoute = require("express").Router();

router.get('/search', search);
router.get(['/genres/:genre', '/genres/:genre/:page'], genres);

searchRoute.use("/", router);

module.exports = { searchRoute };