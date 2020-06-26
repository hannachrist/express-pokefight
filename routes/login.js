const express = require('express');
const { Pool } = require('pg');
const md5 = require('md5');
const router = express.Router();

const pool = new Pool({
    user: 'uuttwqgn',
    host: 'ruby.db.elephantsql.com',
    database: 'uuttwqgn',
    password: 'ptTHKFPRS7ysWiBw5B468REtccjvI8vo',
    port: 5432,
});

router.get('/', function (req, res) {
    res.send('Pat the POSTman');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    pool
        .query(`SELECT * FROM users WHERE username='${username}';`)
        .then((data) => {
            const returnedTable = data.rows; // array of records

            if (returnedTable.length === 0) {
                // this return is here to exit the function if the condition is true
                return res.send({ error: 'No records found' });
            }

            const userFromDb = returnedTable[0];

            const detailedInfoAboutUser = {
                firstName: userFromDb.first_name,
                lastName: userFromDb.last_name,
                secretToken: 'Secret'
            };

            // building hash for the password that is received from request
            const salt = 'SOME_SECRET_HERE';
            const receivedHashedPassword = md5(password + salt);

            const passwordsHashesMatch = userFromDb.password_hash === receivedHashedPassword;

            if (passwordsHashesMatch) {
                res.send(detailedInfoAboutUser);
            } else {
                res.send({ error: 'Failed' })
            }
        })
        .catch(err => {
            res.send({ error: err.message });
        })
});

module.exports = router;
