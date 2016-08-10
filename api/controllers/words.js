'use strict'

const moment = require('moment'),
    Words = require('../models/words')

function getWords(req, res, next) {
    const source = req.swagger.params.source.value,
        date = req.swagger.params.date.value

    Words.retrieve(source, date)
        .then(result => result ? res.json(result) : next())
        .catch(err => next(err))
}

function postWords(req, res, next) {
    const source = req.swagger.params.source.value,
        date = req.swagger.params.date.value,
        words = req.swagger.params.words.value

    Words.retrieve(source, date)
        .then(result => result ? next('Words already exists') : Words.create(source, date, words))
        .then(result => res.send(401))
        .catch(err => next(err))
}

function putWords(req, res, next) {
    const source = req.swagger.params.source.value,
        date = req.swagger.params.date.value,
        words = req.swagger.params.words.value

    Words.update(source, date, words)
        .then(result => result ? res.send(200) : res.send(201))
        .catch(err => next(err))
}

function deleteWords(req, res, next) {
    const source = req.swagger.params.source.value,
        date = req.swagger.params.date.value

    Words.delete(source, date)
        .then(result => result ? res.send(200) : next())
        .catch(err => next(err))
}

function getDateRange(req, res, next) {
    const source = req.swagger.params.source.value

    Words.find({
            source: source
        }, {
            date: 1
        }, {
            sort: {
                date: 1
            }
        })
        .then(results => res.json({
            from: results[0],
            to: results[results.length - 1]
        }))
        .catch(err => next(err))
}

module.exports = {
    getWords,
    postWords,
    putWords,
    deleteWords,
    getDateRange
}
