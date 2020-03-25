const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const List = require('./../models/list');
// const Word = require('./../models/word');

router.put('/:id', async (req, res) => {
    // const list = await List.findById(req.params.id);
    // req.list = list;
    console.log('word');
});