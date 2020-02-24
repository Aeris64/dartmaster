// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import db
const db = require('./../db/connection.js').db;

router.get('/', (req, res, next) => {
    db.all("SELECT * FROM Player")
        .then((results) => {
            res.results = JSON.stringify(results);
            res.render('players', { results: results });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
            console.log(err);
        });
});

router.get('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    db.all("SELECT * FROM Player WHERE id=?", id)
        .then((result) => {
            if(!result[0]) res.send(error.NotFoundError('Player not found'));
            res.results = JSON.stringify(result[0]);
            res.render('player', { result: result[0] });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
            console.log(err);
        });
});

router.post('/', (req, res, next) => {
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let name = req.body.name;
    let email = req.body.email;

    if(name && email){
        let date = new Date();
        date = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        db.run('INSERT INTO Player (name, email, gameWin, gameLose, createdAt) VALUES (?, ?, 0, 0, ?)', 
            name,
            email,
            date )
        .then((value) => {
            res.json({ value });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
            console.log(err);
        });
    }
});

router.patch('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let name = req.body.name;
    let email = req.body.email;
    let gameWin = req.body.gameWin;
    let gameLose = req.body.gameLose;
    db.all("SELECT * FROM Player WHERE id=?", id)
        .then((result) => {
            if(!result[0]) res.send(error.NotFoundError('Player not found'));
            if(!name) name = result[0].name;
            if(!email) email = result[0].email;
            if(!gameWin) gameWin = result[0].gameWin;
            if(!gameLose) gameLose = result[0].gameLose;
            db.run('UPDATE Player SET name=?, email=?, gameWin=?, gameLose=? WHERE id=?', 
                name,
                email,
                gameWin,
                gameLose,
                id )
            .then((value) => {
                res.json({ value });
            })
            .catch((err) => {
                console.log(err);
                res.send(error.NotFoundError(err));
            });
        })
        .catch((err) => {
            console.log(err);
            res.send(error.NotFoundError(err));
        });
});

router.delete('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    db.run('DELETE FROM Player WHERE id=?', 
        id )
    .then((value) => {
        res.json({ value });
    })
    .catch((err) => {
        console.log(err);
        res.send(error.NotFoundError(err));
    });
});

module.exports = router;