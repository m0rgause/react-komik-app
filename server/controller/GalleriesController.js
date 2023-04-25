const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config.json');
const { _replace } = require('../utils/func.js');

const gallery = async (req, res) => {
    try {
        let page = req.params.page ? req.params.page : 1;
        let url = req.params.uri;

        let response
        if (url == "manga") {
            response = await Axios.get(`${uri}/manga/page/${page}`)
        } else if (url == "project") {
            response = await Axios.get(`${uri}/project/page/${page}`)
        } else if (url == "new-release") {
            response = await Axios.get(`${uri}/manga/page/${page}?order=update`)
        } else {
            return res.status(500).send({
                code: 500,
                message: "Bad request"
            })
        }

        $ = cheerio.load(response.data);

        const books = $('div.listupd > div.bs');
        let book = []
        books.each((i, el) => {
            book.push({
                title: $(el).find("div.bsx > a").attr('title'),
                path: _replace($(el).find("div.bsx > a").attr("href")),
                type: $(el).find('div.bsx > a').eq(0).find('div.limit > span[class*="type"]').attr('class').replace("type", ''),
                status: ($(el).find('div.bsx > a').eq(0).find('div.limit > span[class*="status"]').text() !== "") ? "Completed" : "Ongoing",
                thumb: $(el).find('div.bsx > a').eq(0).find("img").attr('src'),
                chapter: $(el).find('div.bsx > a > div.bigor > div.adds > div.epxs ').text(),
                rating: Number($(el).find('div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore ').text()),
            })
        })
        return res.status(200).send({ code: 200, message: "Succesfully", page: Number(page), result: book });
    } catch (error) {
        console.log([error.code, error.request.res.statusCode, error.config.url])
        return res.status(500).send({
            code: 500,
            message: "Bad request"
        })
    }

}

module.exports = {
    gallery
}