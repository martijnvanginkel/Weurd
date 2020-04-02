const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const http = require('http'); // for future .env file
const methodOverride = require('method-override');

// const Game = require('./models/game');
const List = require('./models/list');
const listRouter = require('./routes/lists');
const gameRouter = require('./routes/games');

const listApiRouter = require('./routes/api/lists');
const gameApiRouter = require('./routes/api/games');
const wordApiRouter = require('./routes/api/words');

mongoose.connect('mongodb://localhost/word_game', { useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // used for other kinds of requests than get or post
app.use(express.json());

app.get('/', async (req, res) => {
    const lists = await List.find();
    res.render('index', { lists: lists });
});

app.use('/lists', listRouter);
app.use('/games', gameRouter);
app.use('/api/lists', listApiRouter);
app.use('/api/games', gameApiRouter);
app.use('/api/words', wordApiRouter);

app.listen(5000, () => console.log('server running'));