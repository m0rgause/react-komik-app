const book = require('../controller/BookController');

var router = require("express").Router();
var bookRoute = require("express").Router();

router.get("/book/:path", book.read);

bookRoute.use("/", router);

module.exports = { bookRoute };