const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config.json');

function _replace(link) {
    return link.replace(uri, '')
}
const read = async (req, res) => {
    try {
        const path = req.params.path
        const response = await Axios.get(`${uri}/${path}`)
        $ = cheerio.load(response.data);

        const title = $("h1.entry-title").eq(0).text()
        let getPage = $('script:contains(ts_reader.run)').text()
        let regex = /ts_reader.run[(]\s*([^);]+)/
        getPage = JSON.parse(regex.exec(getPage)[1])

        return res.status(200).send({
            code: 200,
            message: "Successfully",
            result: {
                id: getPage.post_id,
                title: title,
                prevChapter: getPage.prevUrl,
                nextChapter: getPage.nextUrl,
                pages: getPage.sources,
            }
        })
    } catch (error) {
        console.log([error.code, error.request.res.statusCode, error.config.url])
        return res.status(404).send({ code: 404, message: "Not Found" })
    }
}

module.exports = { read }