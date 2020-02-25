// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import DB
const db = require('./../db/connection.js').db;

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM game')
        .then((results) => {
            res.results = JSON.stringify(results);
            res.render('games', { results: results });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
            console.log(err);
        });
});

router.get('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    db.all("SELECT * FROM Game WHERE id=?", id)
        .then((result) => {
            if(!result[0]) res.send(error.NotFoundError('Game not found'));
            res.results = JSON.stringify(result[0]);
            res.render('game', { result: result[0] });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
            console.log(err);
        });
});

router.get('/:id/players', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    db.all("SELECT * FROM GamePlayer INNER JOIN Player ON Player.id = GamePlayer.playerId WHERE gameId=?", id)
        .then((results) => {
            res.results = JSON.stringify(results);
            res.render('players', { results: results });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
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

    res.json( req.body );
});

router.post('/', (req, res, next) => {
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let mode = req.body.mode;
    let name = req.body.name;

    if(name && mode){
        let date = new Date();
        date = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        db.run('INSERT INTO Game (mode, name, status, createdAt) VALUES (?, ?, "draft", ?)', 
            mode,
            name,
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

router.post('/:id/players', async (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    try{
        console.log(JSON.parse(Object.keys(req.body)[0]))
    } catch(err) {
        req.body = req.body
    }
    
    let allPlayerId = [];
    for(let user of req.body){
        if(isNaN(user)){
            if(user.name && user.email){
                let date = new Date();
                date = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
                let res = await(
                    db.run('INSERT INTO Player (name, email, gameWin, gameLose, createdAt) VALUES (?, ?, 0, 0, ?)', 
                        user.name,
                        user.email,
                        date )
                    .then((res)=> {
                        return res.stmt.lastID;
                    })
                    .catch((err) => {
                        res.send(error.NotFoundError(err));
                    })
                );
                allPlayerId.push(res);
            }
        } else {
            allPlayerId.push(user);
        }
    }

    let finalRes = [];
    for(let idPlayer of allPlayerId){
        let date = new Date();
        date = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
        db.run('INSERT INTO GamePlayer (playerId, gameId, createdAt) VALUES (?, ?, ?)', 
            idPlayer,
            id,
            date )
        .then((value) => {
            return value;
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
        });
    }

    Promise.all(finalRes)
        .then((value) => {
            console.log(value);
            res.json({ value });
        })
        .catch((err) => {
            res.send(error.NotFoundError(err));
        });
});

router.patch('/:id', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let mode = req.body.mode;
    let name = req.body.name;
    let currentPlayerId = req.body.currentPlayerId;
    let status = req.body.status;
    db.all("SELECT * FROM Game WHERE id=?", id)
        .then((result) => {
            if(!result[0]) res.send(error.NotFoundError('Game not found'));
            if(!mode) mode = result[0].mode;
            if(!name) name = result[0].name;
            if(!currentPlayerId) currentPlayerId = result[0].currentPlayerId;
            if(!status) status = result[0].status;
            db.run('UPDATE Game SET mode=?, name=?, currentPlayerId=?, status=? WHERE id=?', 
                mode,
                name,
                currentPlayerId,
                status,
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

    db.run('DELETE FROM Game WHERE id=?', id)
    .then((value) => {
        res.json({ value });
    })
    .catch((err) => {
        console.log(err);
        res.send(error.NotFoundError(err));
    });
});

router.delete('/:id/players', (req, res, next) => {
    let id = +req.params.id;
    if (id != req.params.id) res.send(error.BadRequestError('Id should be a number'));

    let allId = [];
    for(let id of req.query.id){
        let testId = +id;
        if (testId != id) res.send(error.BadRequestError('Id should be a number'));
        else allId.push(testId);
    }

    let finalRes = [];
    for(idPlayer of allId){
        db.run('DELETE FROM GamePlayer WHERE playerId=? AND gameId=?', idPlayer, id)
        .then((value) => {
            finalRes.push(value);
        })
        .catch((err) => {
            console.log(err);
            res.send(error.NotFoundError(err));
        });
    }
    res.json({ finalRes });
});

module.exports = router;
