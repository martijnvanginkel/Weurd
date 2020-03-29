const express = require('express');
const router = express.Router();
const List = require('./../models/list');
const Game = require('./../models/game');

router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        const game = await makeGameFromList(list);        
        res.render('games/index', { game: game });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

const makeGameFromList = async (list) => {

    let game = new Game();

    game.list_id = list.id;
    game.direction = true;
    list.words.forEach(word => {
        game.words.push({
            word: word,
            retries: 0,
            passed: false
        })
    })

    //game.words[0].passed = true;

    game = await game.save();
    console.log(`saved game: ${game}`);

    return game;
}

module.exports = router;
