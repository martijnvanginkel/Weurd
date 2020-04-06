const mongoose = require('mongoose');
const Word = require('./word');

const gameSchema = new mongoose.Schema({
    name: {
        type: String
    },
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
