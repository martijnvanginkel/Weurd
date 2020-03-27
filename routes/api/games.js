const express = require('express');
const router = express.Router();
const Game = require('./../../models/game');

router.get('/get_unpassed/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);


    // const games = await Game.findById({"_id": req.params.id}, {words: {$elemMatch: { retries: 0 }}}  );//, {words: {$elemMatch: {retries: 0}}}   );
    const games = await Game.findById({"_id": req.params.id}).find({ words: {$elemMatch: {retries: 0}  } });

    //const game_words = game.words;

    console.log('get_unpassed');
    
    //onst one = game_words.findOne();


    console.log(games);


});

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