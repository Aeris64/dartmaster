// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import temp DB
const db = require('../db/db.json');

router.get('/', (req, res, next) => {
    res.json({ data: db.users })
})

router.get('/:id', (req, res, next) => {
    let id = +req.params.id
    if (id != req.params.id) throw new error.BadRequestError('Id should be a number')

    let data = db.users.find(user => user.id === id)
    if (!data) throw new error.NotFoundError('User not found')
    res.json({ data });
})

router.post('/new', (req, res, next) => {
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;

    res.json({ email, name });
})

module.exports = router;