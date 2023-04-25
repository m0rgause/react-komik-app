const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { uri } = require('../config.json');
const { _replace, _replace2, _replaceSpace, getBooks } = require('../utils/func.js');
const fs = require('fs');
const path = require('path');


const search = async (req, res) => {
    try {
        let { query, page } = req.query
        page = page || 1
        query = query.replace(/ /g, "+")
        const response = await Axios.get(`${uri}/page/${page}/?s=${query}`)
        $ = cheerio.load(response.data);
        const books = getBooks($('div.listupd > div.bs'))
        let maxPage = Number($('div.pagination > a').eq(-2).text()) || 1
        if (page > maxPage) {
            maxPage = maxPage + 2
        }
        return res.status(200).send({ code: 200, message: "Succesfully", page: Number(page), maxPage, result: books });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: "Bad request"
        })
    }
}



const genres = async (req, res) => {
    try {
        let { genre } = req.params
        let { page } = req.params
        page = page || 1
        const response = await Axios.get(`${uri}/genres/${genre}/page/${page}`)
        $ = cheerio.load(response.data);
        let maxPage = Number($('div.pagination > a').eq(-2).text()) || 1
        if (page > maxPage) {
            maxPage = maxPage + 2
        }

        // Check if the genre already exists in the file
        let listGenres = require('../utils/listGenres.json');
        genre = genre.charAt(0).toUpperCase() + genre.slice(1);
        let isExist = false;
        listGenres.forEach(item => {
            if (item.name === genre) {
                isExist = true;
            }
        });
        if (!isExist) {
            listGenres.push({ name: genre, path: `genres/${genre.toLowerCase()}` });
            const filePath = path.join(__dirname, '../utils/listGenres.json');
            fs.writeFileSync(filePath, JSON.stringify(listGenres));
        }

        return res.send({ code: 200, message: "Succesfully", page: Number(page), maxPage, result: getBooks($('div.listupd > div.bs')) });
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            code: 500,
            message: "Bad request"
        })
    }
}

module.exports = { search, genres }