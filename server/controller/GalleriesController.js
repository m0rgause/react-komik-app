const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config.json');
const { _replace, getBooks } = require('../utils/func.js');

const gallery = async (req, res) => {
    try {
        let page = req.params.page ? req.params.page : 1;
        let url = req.params.uri;
        let { status, order, type } = req.query;
        // [status = [ongoing, completed, hiatus,all]]
        status = (status && status != "all") ? status : "";
        // [order = [default, title, titlereverse, update, latest, popular]]
        order = (order && order != "default") ? order : "";
        // [type = [all, manga, manhwa, manhua, comic, novel]]
        type = (type && type != "all") ? type : "";
        let response;
        if (url == "manga") {
            response = await Axios.get(`${uri}/manga?page=${page}&status=${status}&order=${order}`);
        } else if (url == "project") {
            response = await Axios.get(`${uri}/project/page/${page}`);
        } else {
            return res.status(500).send({
                code: 500,
                message: "Bad request"
            });
        }

        $ = cheerio.load(response.data);
        return res.status(200).send({ code: 200, message: "Succesfully", page: Number(page), result: getBooks($('div.listupd > div.bs')) });
    } catch (error) {
        console.log([error.code, error.request.res.statusCode, error.config.url]);
        return res.status(500).send({
            code: 500,
            message: "Bad request"
        });
    }
};

module.exports = {
    gallery
};