const express = require('express');
const router = express.Router();
const List = require('./../models/list');

router.get('/', (req, res) => {
    res.render('games/index', {});
 });

 router.post('/', async (req, res) => {
    console.log('post');
    const list = await List.findById(req.body.list);
    console.log(list.name);

    res.redirect('/games');
 });

 module.exports = router;