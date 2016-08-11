'use strict'

const mongoose = require('mongoose')

const wordsSchema = new mongoose.Schema({
    source: String,
    date: {
        type: Date,
        index: true
    },
    words: [{
        value: String,
        count: Number,
        occurrenceRefs: [{
            headline: String,
            url: String
        }]
    }]
})

wordsSchema.statics.create = function(source, date, words) {
    return new this({
        source,
        date,
        words
    }).save()
}

wordsSchema.statics.retrieve = function(source, date) {
    return this.findOne({
        source,
        date
    }, {
        _id: 0,
        __v: 0,
        'words._id': 0
    })
}

wordsSchema.statics.update = function(source, date, words) {
    return this.findOneAndUpdate({
        source,
        date
    }, {
        $set: {
            words
        }
    }, {
        upsert: true
    })
}

wordsSchema.statics.delete = function(source, date) {
    return this.findOneAndRemove({
        source,
        date
    })
}

wordsSchema.statics.sortByDate = function(source) {
    return this.find({
        source
    }, {
        date: 1
    }, {
        sort: {
            date: 1
        }
    })
}

module.exports = mongoose.model('Words', wordsSchema)
