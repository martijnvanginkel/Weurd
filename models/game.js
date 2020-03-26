const mongoose = require('mongoose');
const List = require('./list');
const Word = require('./word');

const gameSchema = new mongoose.Schema({
    list: {
        type: [List.schema]
    },
    wordArray: {
        type: Array,
        value: {
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
    }
});

module.exports = mongoose.model('Game', gameSchema);
