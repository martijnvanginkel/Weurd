const express = require('express');
const router = express.Router();
const List = require('./../../models/list');

router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await List.findById(req.params.id).remove();
        res.json({ message: 'Deleted list' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;