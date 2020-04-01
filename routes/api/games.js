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

const checkAnswer = () => {

}

router.put('/update/:id/word/:word_id', async (req, res) => {
    try {

        const answer = req.body.answer;
        let game = await Game.findById(req.params.id);
        let word = game.words.find(findWordInList(req.params.word_id));

 

        console.log(game);

        game.markModified('words');
        await game.save();

        let game2 = await Game.findById(req.params.id);

        console.log('hoi' + game2);
        //console.log(game.words[0]);
        //let word = game.words.find(findWordInList(req.params.word_id)).retries = 4;

        // console.log(`game1 : ${game}`);

        // // Check answer
        // // if (word.word.langTwo === answer) {
        // //     console.log('answer is correct');
        // // }
        // // else {
        // //     console.log('answer is incorrect');
        // //     word.retries++;
        // // }
        // // word.retries = 3;
        // game.direction = false;
        // await game.save();

        // let game2 = await Game.findById(req.params.id);

        // console.log(`game2: ${game2}`);

        // // word.retries = 3;
        
        
        
        // // game = await game.save();
        

        // // console.log(game);

        // console.log('saved');
        // res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
});

module.exports = router;