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

// const filterOnValue = (value) => {
//     console.log(value.word._id);
// }

const findMatchingWordID = (word_id) => {
    return (value) => {
        // if (word_id === value.retries) {
        //     return true;
        // }
        console.log(word_id);
        console.log(value.word._id);

        //console.log(word_id);
        //console.log(value.word._id);
    }
}

router.put('/update/:id/word/:word_id', async (req, res) => {
    console.log('game put req');
    try {
        let game = await Game.findById(req.params.id);
        let words = game.words;

        //game.words[0].retries = 1;

        // console.log(words[0].word._id);

        // console.log('games word udpate');
        //console.log(words);
        words = game.words.filter(findMatchingWordID(req.params.word_id));
        //console.log(words);



        

        console.log('saved');
        // res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
});

module.exports = router;