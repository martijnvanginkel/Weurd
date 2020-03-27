const express = require('express');
const router = express.Router();
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

router.post('/', async (req, res, next) => {
    const list = new List();
    req.list = list;
    next();
}, saveListAndRedirect('/'));

router.put('/:id', async (req, res, next) => {
    const list = await List.findById(req.params.id);
    req.list = list;
    next();
}, saveListAndRedirect('/'));

function saveListAndRedirect(path) {
    return async (req, res) => {
        let list = req.list;
        let words = [];
        if (typeof req.body.langOne === 'string') {
            if (req.body.langOne !== '' || req.body.langTwo !== '') {        
                words.push(createNewWord(req.body.langOne, req.body.langTwo));
            }
        }
        else {
            for(const key in req.body.langOne) {
                if (req.body.langOne[key] === '' || req.body.langTwo[key] === '') {
                    continue;
                }
                words.push(createNewWord(req.body.langOne[key], req.body.langTwo[key]));
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

function createNewWord(langOne, langTwo) {
    const word = new Word({
        langOne: langOne,
        langTwo: langTwo
    });
    // word.langOne = langOne;
    // word.langTwo = langTwo;
    return word;
}

module.exports = router;