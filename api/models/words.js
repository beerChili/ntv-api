'use strict'

const mongoose = require('mongoose')

const wordsSchema = new mongoose.Schema({
    source: String,
    date: Date,
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

module.exports = mongoose.model('Words', wordsSchema)
