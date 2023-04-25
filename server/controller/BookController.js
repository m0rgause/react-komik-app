const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config.json');
const { _replace, _replace2, _replaceSpace, getBooks } = require('../utils/func.js');


const read = async (req, res) => {
    try {
        const path = req.params.path
        const response = await Axios.get(`${uri}/${path}`)
        $ = cheerio.load(response.data);

        const title = $("h1.entry-title").eq(0).text()
        let getPage = $('script:contains(ts_reader.run)').text()
        let regex = /ts_reader.run[(]\s*([^);]+)/
        getPage = JSON.parse(regex.exec(getPage)[1])
        let allBook = $('div.allc > a').attr('href')
        const response2 = await Axios.get(`${allBook}`)
        $2 = cheerio.load(response2.data);
        const thumb = $2('div.thumb > img').attr('src')

        return res.status(200).send({
            code: 200,
            message: "Successfully",
            result: {
                id: getPage.post_id,
                book: _replace2(allBook),
                thumb: thumb,
                title: title,
                prevChapter: _replace(getPage.prevUrl),
                nextChapter: _replace(getPage.nextUrl),
                pages: getPage.sources,
            }
        })
    } catch (error) {
        console.log([error.code, error.request.res.statusCode, error.config.url])
        return res.status(404).send({ code: 404, message: [error.code, error.request.res.statusCode] })
    }
}

const detail = async (req, res) => {
    try {
        const path = req.params.path
        const response = await Axios.get(`${uri}/manga/${path}`)
        $ = cheerio.load(response.data);

        const title = {
            english: _replaceSpace($("h1.entry-title").eq(0).text()),
            full: _replaceSpace($("div.seriestualt").eq(0).text())
        }
        const thumb = $("div.thumb > img").attr("src")
        const description = _replaceSpace($("div.seriestuhead > div").attr("itemprop", "description").eq(0).text())
        const chapters = {
            first: {
                ch: $("div.seriestuhead > div.lastend > div.inepcx").eq(0).find('span.epcurfirst').text(),
                path: $("div.seriestuhead > div.lastend > div.inepcx").eq(0).find("a").attr("href"),
            },
            last: {
                ch: $("div.seriestuhead > div.lastend > div.inepcx").eq(1).find('span.epcurlast').text(),
                path: _replace($("div.seriestuhead > div.lastend > div.inepcx").eq(1).find("a").attr("href")),
            },
            list: $("#chapterlist > ul.clstyle > li").map((i, el) => {
                return {
                    ch: $(el).find("div.eph-num > a > span.chapternum").text(),
                    uploaded: $(el).find("div.eph-num > a > span.chapterdate").text(),
                    path: _replace($(el).find("div.eph-num > a").attr("href")),

                }
            }).get()

        }

        const info = {
            status: _replaceSpace($("table.infotable > tbody > tr > td:contains('Status')").parent().find("td").eq(1).text()),
            released: _replaceSpace($("table.infotable > tbody > tr > td:contains('Released')").parent().find("td").eq(1).text()),
            artis: _replaceSpace($("table.infotable > tbody > tr > td:contains('Artist')").parent().find("td").eq(1).text()),
            updatedOn: _replaceSpace($("table.infotable > tbody > tr > td:contains('Updated On')").parent().find("td").eq(1).text()),
            type: _replaceSpace($("table.infotable > tbody > tr > td:contains('Type')").parent().find("td").eq(1).text()),
            author: _replaceSpace($("table.infotable > tbody > tr > td:contains('Author')").parent().find("td").eq(1).text()),
            postedOn: _replaceSpace($("table.infotable > tbody > tr > td:contains('Posted On')").parent().find("td").eq(1).text()),
        }
        const genres = $("div.seriestugenre > a").map((i, el) => {
            return {
                tag: $(el).text(),
                path: _replace($(el).attr("href"))
            }
        }).get()

        const related = getBooks($('div.listupd > div.bs'))


        return res.status(200).send({
            code: 200,
            message: "Successfully",
            result: {
                title: title,
                thumb: thumb,
                description: description,
                chapters: chapters,
                info: info,
                genres: genres,
            },
            related: related
        })

    } catch (err) {
        // console.log([error.code, error.request.res.statusCode, error.config.url])
        return res.status(404).send({ code: 404, message: "Not Found" })
    }
}

module.exports = { read, detail }