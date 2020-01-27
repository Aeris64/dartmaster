const router = require('express').Router();

const gameRouter = require('./routers/game');
const userRouter = require('./routers/user');

router.use('/games', gameRouter);
router.use('/users', userRouter);

module.exports = router;