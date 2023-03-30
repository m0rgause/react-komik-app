const { default: Axios } = require('axios');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const { router } = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router)
app.use(express.static(path.join(__dirname, "..", 'app', 'build')))
app.use(express.static("public"));
app.use('/app', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", 'app', 'build', 'index.html'))
})
app.use("*", (req, res) => {
    res.status(404).send({ code: 404, message: "Not found" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});