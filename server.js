require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const store = require('./movie-store.js');


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

//token stuff I don't know how to do




app.get('/movie', (req, res) => {
  const {genre, country, avg_vote} = req.query;

  let response = store;

    if (req.query.genre) {
        response = response.filter(movie =>
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase()));
    }

    if (req.query.country) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(req.query.country.toLowerCase()));
    }

    if (req.query.avg_vote) {
        response = response.filter(movie =>
            Number(movie.avg_vote) >= Number(req.query.avg_vote));
    }


  res.json(response);
});

  app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });