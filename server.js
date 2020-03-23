const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const List = require('./models/list');
const Word = require('./models/word');
const listRouter = require('./routes/lists');

// const list = new List();
// list.name = 'list one';

// const word = new Word();
// word.langOne = 'asdf';
// word.langTwo = 'asdf2';

// list.words.push(word);

mongoose.connect('mongodb://localhost/word_game', { useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { list: list });
});

app.use('/lists', listRouter);

app.listen(5000, () => console.log('server running'));