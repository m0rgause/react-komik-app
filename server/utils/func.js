const { uri } = require('../config.json');

function _replace(link) {
    return link.replace(uri, '')
}
function _replace2(link) {
    return link.replace(uri + '/manga/', '')
}
function _replaceSpace(link) {
    return link.replaceAll('\t', '').replaceAll('\n', '').replaceAll('\r', '').trim()
}

function getBooks(books) {
    let book = []
    books.each((i, el) => {
        book.push({
            title: $(el).find("div.bsx > a").attr('title'),
            path: _replace2($(el).find("div.bsx > a").attr("href")),
            type: $(el).find('div.bsx > a').eq(0).find('div.limit > span[class*="type"]').attr('class').replace("type", ''),
            status: ($(el).find('div.bsx > a').eq(0).find('div.limit > span[class*="status"]').text() !== "") ? "Completed" : "Ongoing",
            thumb: $(el).find('div.bsx > a').eq(0).find("img").attr('src'),
            chapter: $(el).find('div.bsx > a > div.bigor > div.adds > div.epxs ').text(),
            rating: Number($(el).find('div.bsx > a > div.bigor > div.adds > div.rt > div.rating > div.numscore ').text()),
        })
    })
    return book

}

module.exports = {
    getBooks, _replace, _replace2, _replaceSpace
}