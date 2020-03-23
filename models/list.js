const mongoose = require('mongoose');
const Word = require('./word');

const listSchema = new mongoose.Schema({
    name: {
        type: String
    },
    words: {
        type: [Word.schema]
    }
});

module.exports = mongoose.model('List', listSchema);