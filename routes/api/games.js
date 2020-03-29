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

function startsWith(wordToCompare) {
    return function(element) {
        console.log(wordToCompare);
        console.log(element);
        //return element.indexOf(wordToCompare) === 0;
    }
}

router.put('/update/:id/word/:word_id', async (req, res) => {
    console.log('game put req');
    try {
        let game = await Game.findById(req.params.id);


        // // game.direction = false;
        // game.words[0].passed = true;
        //await game.save();

        //const word = game.words.filter(filterOnValue);



        game.words.filter(startsWith(2));




        //words.find( {retries: 0} );

        //find({awards: {$elemMatch: {award:'National Medal', year:1975}}})

        //let words = await Game.findById(req.params.id).find( { words: {$elemMatch: {passed: true} } } )

        

        console.log('saved');
        // console.log(game.words);
        // res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
});

module.exports = router;