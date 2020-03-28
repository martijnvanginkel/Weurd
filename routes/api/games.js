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
    // const game = await Game.findById(req.params.id);
    // res.send(list);
    try {
        const game = await Game.findById(req.params.id);
        res.json(game);
    } catch (error) {
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