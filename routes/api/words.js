const express = require('express');
const router = express.Router();
const Word = require('./../../models/word');

router.get('/:id', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;
