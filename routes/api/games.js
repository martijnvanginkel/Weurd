const express = require('express');
const router = express.Router();
const Game = require('./../../models/game');

router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

const findWordById = (word_id) => {
    return (value) => word_id == value.word._id;
}

const checkAnswer = (word, answer) => {
    if (word.word.langTwo === answer) {
        word.passed = true;
    }
    else {
        word.retries++;
    }
    return word;
}

const filterOnUnpassed = (word) => word.passed === false;

const getRandomWord = (words) => words[Math.floor((Math.random() * words.length))];

router.put('/update/:id/word/:word_id', async (req, res) => {
    try {
        const answer = await req.body.answer;
        let game = await Game.findById(req.params.id);
        let word = game.words.find(findWordById(req.params.word_id));

        word = checkAnswer(word, answer);
        game.markModified('words');
        game = await game.save();
        game.words = game.words.filter(filterOnUnpassed);
        if (game.words.length === 0) {
            console.log('end');
            res.json();
        }
        else {
            const new_word = getRandomWord(game.words.filter(filterOnUnpassed));
            res.json({new_word: new_word,
                    old_passed: word.passed,
                    old_answer: word.word.langTwo });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
});

module.exports = router;