const express = require('express');
const router = express.Router();
const Game = require('./../../models/game');

// const unpassedWords = value => (value.passed === true)

// router.get('/get_unpassed/:id', async (req, res) => {
 
//     try {
//         const game = await Game.findById(req.params.id);
//         const words = game.words.filter(unpassedWords);
//         console.log(words);
//         // const game = await Game.findById(req.params.id);
//         //res.json(game);
//     } catch (error) {
//         //res.status(500).json({ message: error.message })
//     }


//     // const games = await Game.findById({"_id": req.params.id}).find( { "words": { $elemMatch: { "passed": true } } } );

// });

router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.put('/update/:id/word/:word_id', async (req, res) => {
    // const game = await Game.findById(req.params.id);
    // game = await game.save();
    console.log('game put req');
    try {
        let game = await Game.findById(req.params.id);
        //game.words.findById(req.params.word_id);
        //console.log(req.params.words);
        // console.log(game);
        game.direction = false;
        await game.save();
        console.log('saved');
        console.log(game.words[0]);

        res.json(game);
    } catch (error) {
        // console.log('saved');
        res.status(500).json({ message: error.message })
    }   
});




// router.post('/', async (req, res) => {


//     const game = new Game({



//         words: [

//         ]
//     })

//     try {

//     } catch (error) {

//     }
// });

module.exports = router;