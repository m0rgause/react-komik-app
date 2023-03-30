const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config.json');

function _replace(link) {
    return link.replace(uri, '')
}
const home = async (req, res) => {
    try {
        const response = await Axios.get(uri)
        $ = cheerio.load(response.data);

        let popular = []
        const getPopular = $('div.listupd > div.bs');
        getPopular.each((i, el) => {
            popular.push({
                title: $(el).find("div.bsx > a").attr('title'),
                path: _replace($(el).find("div.bsx > a").attr("href")),
                type: $(el).find('div.bsx > a').eq(0).find('div.limit > span[class*="type"]').attr('class').replace("type", ''),
                status: ($(el).find('div.bsx > a').eq(0).find('div.limit > span[class*="status"]').text() !== "") ? "Completed" : "Ongoing",
                thumb: $(el).find('div.bsx > a').eq(0).find("img").attr('src'),
                chapter: $(el).find('div.bsx > a > div.bigor > div.adds > div.epxs ').text(),
                rating: Number($(el).find('div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore ').text()),
            })
        })

        let project = []
        $('div.listupd').eq(1).find('div.utao').each((i, el) => {
            let chapters = []
            $(el).find('div.luf > ul > li').each((i, ell) => {
                chapters.push({
                    path: _replace($(ell).find('a').attr('href')),
                    ch: $(ell).find('a').text(),
                    date_updated: $(ell).find('span').text()
                })
            })
            project.push({
                title: $(el).find('div.imgu > a').attr('title'),
                path: _replace($(el).find('div.imgu > a').attr('href')),
                type: $(el).find('div.luf > ul').attr('class'),
                chapters: chapters
            })
        })


        let newRelease = []
        $('div.listupd').eq(2).find('div.utao').each((i, el) => {
            let chapters = []
            $(el).find('div.luf > ul> li').each((j, ell) => {
                chapters.push({
                    path: _replace($(ell).find('a').attr('href')),
                    ch: $(ell).find('a').text(),
                    date_updated: $(ell).find('span').text()
                })
            })
            newRelease.push({
                title: $(el).find('div.imgu > a').attr('title'),
                path: _replace($(el).find('div.imgu > a').attr('href')),
                type: $(el).find('div.luf > ul').attr('class'),
                chapters: chapters
            })
        })


        return res.status(200).send({
            code: 200,
            message: "Successfully!",
            result: {
                popular,
                project,
                newRelease,
            }
        })
    } catch (error) {
        console.log([error.code, error.request.res.statusCode, error.config.url])
        return res.status(500).send({ code: 500, message: "Bad request" })
    }
}
module.exports = {
    home
}