const mongoose = require('mongoose');
const List = require('./list');
const Word = require('./word');

const gameSchema = new mongoose.Schema({
    list_id: {
        type: String
    },
    test: {
        type: Number
    },
    words: {
        type: Array,
        test2: {
            type: Number
        },
        word: {
            type: [Word.schema]
        },
        retries: {
            type: Number
        },
        passed: {
            type: Boolean
        }   
    }
});

module.exports = mongoose.model('Game', gameSchema);
