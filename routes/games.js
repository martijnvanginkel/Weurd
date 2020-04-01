const express = require('express');
const router = express.Router();
const List = require('./../models/list');
const Game = require('./../models/game');


// Game wordt geladen, laad de pagina met de game en met het woord, 2 variabelen
// Op het klikken van next wordt de (game?) en het woord meegestuurd naar een checker functie
// Deze checker functie kijkt of het woord overeenkomt met het antwoord, zo niet dan update hij de retries, zo ja dan update hij 

router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        const game = await makeGameFromList(list);     
        const word = game.words[Math.floor((Math.random() * game.words.length))];
        res.render('games/index', { game: game, word: word });

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
        });
    });

    game = await game.save();
    console.log(`saved game: ${game}`);

    return game;
}

module.exports = router;
