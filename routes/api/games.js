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

const findWordInList = (word_id) => {
    return (value) => word_id == value.word._id;
}

router.put('/update/:id/word/:word_id', async (req, res) => {
    console.log('game put req');
    try {

        console.log(req.params.id)
        console.log(req.params.word_id);
        let game = await Game.findById(req.params.id);

        console.log(req.body.input);
        // let words = game.words;

        // console.log(game);



        // const word = game.words.find(findMatchingWordID(req.params.word_id));


        let word = game.words.find(findWordInList(req.params.word_id));


        // await game.save();

        // console.log(game);

        console.log('saved');
        res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
});

module.exports = router;