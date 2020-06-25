const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Pat the POSTman');
});

router.post('/', (req, res) => {
    const dbValues = {
        username: 'admin',
        password: '12345'
    };

    const detailedInfoAboutUser = {
        firstName: 'Truman',
        lastName: 'Capote',
        secretToken: 'This is a secret token.'
    };

    console.log(req.body)

    if (
        dbValues.password === req.body.password &&
        dbValues.username === req.body.username
    ) {
        res.send(detailedInfoAboutUser);
    } else {
        res.send({ error: 'Failed' });
    }
});

module.exports = router;
