const mongoose = require('mongoose');
const validator = require('validator');

const { URL_REQUIRED } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
      }),
      message: URL_REQUIRED,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
      }),
      message: URL_REQUIRED,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
      }),
      message: URL_REQUIRED,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
