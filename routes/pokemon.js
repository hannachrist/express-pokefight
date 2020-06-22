const express = require('express');
const router = express.Router();
// const path = require('path');

const pokedex = require('../pokedex.json');

router.get('/', function (req, res, next) {
    res.send(pokedex);
});

module.exports = router;