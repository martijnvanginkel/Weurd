const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const List = require('./models/list');
const listRouter = require('./routes/lists');

mongoose.connect('mongodb://localhost/word_game', { useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // used for other kinds of requests than get or post

app.get('/', async (req, res) => {
    const lists = await List.find();
    res.render('index', { lists: lists });
});

app.use('/lists', listRouter);

app.listen(5000, () => console.log('server running'));