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

// app.use(express.static(path.resolve(__dirname, "..", 'app', 'build')))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "..", 'app', 'build'), "index.html")
// })
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});