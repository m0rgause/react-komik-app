const book = require('../controller/BookController');

var router = require("express").Router();
var bookRoute = require("express").Router();

router.get("/book/:path", book.read);
router.get("/book/detail/:path", book.detail);

bookRoute.use("/", router);

module.exports = { bookRoute };