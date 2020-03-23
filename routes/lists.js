const express = require('express');
const router = express.Router();
const List = require('./../models/list');
const Word = require('./../models/word');

router.get('/new', (req, res) => {
   res.render('lists/new', { list: new List() });
});

router.get('/', async (req, res) => {

    lists = await List.find();

    res.render('lists/index', { lists: lists })
});

router.post('/', async (req, res) => {
    const words = [];
    const langOne = req.body.langOne;
    const langTwo = req.body.langTwo;

    for(const key in langOne) {
        const word = new Word();
        word.langOne = langOne[key];
        word.langTwo = langTwo[key];
        words.push(word);
    }

    let list = new List({
        name: req.body.name,
        words: words
    })
    try {
        list = await list.save();
        console.log('saved');
        res.render('lists/index', { list: list});
    }
    catch (e) {
        console.log('catch');
        //res.render('lists/new', {});
    }
});

module.exports = router;