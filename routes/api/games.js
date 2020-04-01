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
}

const filterOnUnpassed = (word) => word.passed === false;

const getRandomWord = (words) => words[Math.floor((Math.random() * words.length))]

router.put('/update/:id/word/:word_id', async (req, res) => {
    try {

        const answer = req.body.answer;
        let game = await Game.findById(req.params.id);
        let word = game.words.find(findWordById(req.params.word_id));

        checkAnswer(word, answer);
        game.words = game.words.filter(filterOnUnpassed);
        if (game.words.length === 0) {
            // game = await game.save();
            // render result page
        }

        // needs to be a check for no words left

        const new_word = getRandomWord(game.words.filter(filterOnUnpassed))

        console.log(new_word);
        // console.log(getRandomWord(game.words))

        game.markModified('words');
        await game.save();

        let game2 = await Game.findById(req.params.id);

        //console.log('saved' + game2);


        // console.log('saved');
        // res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
});

module.exports = router;