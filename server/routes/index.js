const express = require('express');

// getRoute
const { bookRoute } = require("./BookRoute");
const { galleriesRoute } = require('./GalleriesRoute');
const { homeRoute } = require('./HomeRoute');
const { searchRoute } = require('./SearchRoute');


const router = express()

// initRoute
router.use(galleriesRoute)
router.use(bookRoute)
router.use(homeRoute)
router.use(searchRoute)

module.exports = { router };