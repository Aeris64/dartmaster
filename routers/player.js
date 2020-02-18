// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import db
const db = require('./../db/connection.js').db;

router.get('/', (req, res, next) => {
    db.all("SELECT * FROM players")
        .then((results) => {
            res.results = JSON.stringify(results);
            res.render('players', { results: results });
        })
        .catch((err) => {
            throw new error.NotFoundError('Players not found');
            console.log(err);
        });
});

router.get('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) throw new error.BadRequestError('Id should be a number');

    db.all("SELECT * FROM players WHERE id = (?)", id)
        .then((result) => {
            if(!result[0]) throw new error.NotFoundError('Player not found');
            res.results = JSON.stringify(result[0]);
            res.render('player', { result: result[0] });
        })
        .catch((err) => {
            throw new error.NotFoundError('Player not found');
            console.log(err);
        });
});

router.post('/new', (req, res, next) => {
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;

    res.json({ email, name });
});

module.exports = router;