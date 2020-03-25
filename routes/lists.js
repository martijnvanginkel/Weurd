const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const List = require('./../models/list');
const Word = require('./../models/word');

router.get('/new', (req, res) => {
   res.render('lists/new', { list: new List() });
});

router.get('/:id', async (req, res) => {
    const list = await List.findById(req.params.id);
    res.render('lists/show', { list: list });
});

router.get('/edit/:id', async (req, res) => {
    const list = await List.findById(req.params.id);

    res.render('lists/edit', { list: list })
})

router.get('/', async (req, res) => {
    lists = await List.find();
    res.render('lists/index', { lists: lists })
});

router.post('/', async (req, res, next) => {
    const list = new List();
    req.list = list;
    next();
}, saveListAndRedirect('/'));

router.put('/:id', async (req, res, next) => {
    const list = await List.findById(req.params.id);
    req.list = list;
    console.log('put list');
    next();
}, saveListAndRedirect('/'));

function saveListAndRedirect(path) {
    return async (req, res) => {
        let list = req.list;
        let words = [];
        if (typeof req.body.langOne === 'string') {
            const word = new Word();
            word.langOne = req.body.langOne;
            word.langTwo = req.body.langTwo;
            words.push(word);
        }
        else {
            for(const key in req.body.langOne) {
                const word = new Word();
                word.langOne = req.body.langOne[key];
                word.langTwo = req.body.langTwo[key];
                words.push(word);
            }
        }
        list.name = req.body.name;
        list.words = words;
        try {
            list = await list.save();
            res.redirect(path);
        }
        catch (e) { res.send(`Error: ${e}`) }
    }
}

module.exports = router;