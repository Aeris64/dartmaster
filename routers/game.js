// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import temp DB
const db = require('../db/db.json');

router.get('/', (req, res, next) => {
    res.json({ data: db.games });
})

router.get('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) throw new error.BadRequestError('Id should be a number');

    let data = db.games.find(game => game.id === id);
    if (!data) throw new error.NotFoundError('Game not found');
    res.json({ data });
})

module.exports = router;