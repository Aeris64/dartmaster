const router = require('express').Router();

const gameRouter = require('./routers/game');
const playerRouter = require('./routers/player');

router.use('/games', gameRouter);
router.use('/players', playerRouter);

module.exports = router;