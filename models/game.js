const mongoose = require('mongoose');
const List = require('./list');
const Word = require('./word');

const gameSchema = new mongoose.Schema({
    list_id: {
        type: String
    },
    direction: {
        type: Boolean
    },
    words: {
        type: Array,
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
