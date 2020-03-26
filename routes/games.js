const express = require('express');
const router = express.Router();
const List = require('./../models/list');
const Game = require('./../models/game');

router.get('/', (req, res) => {

    console.log(res.body.game);

    res.render('games/index', {});
 });

 router.post('/', async (req, res) => {
    console.log('post');
    const list = await List.findById(req.body.list);
    const game = await createNewGame(list);

    console.log(game);

    res.render('games/index', { game: game });
 });

 async function createNewGame(list) {

    game = new Game();
    game.list = list;
    game.words = [];

    list.words.forEach((word) => {
        game.words.push({
            word: word,
            retries: 0,
            passed: false
        })
    });

    try{
        game = await game.save();
        console.log('new game created');
        return game;
    }
    catch {
        console.log('failed');
    }
        // res.redirect('/');


 }

 module.exports = router;