const BaseRouter = require('express').Router();
const AuthRouter = require('./auth.router');
// const GameRouter = require('./game.router');
const ThemeRouter = require('./theme.router');

const isAuth = require('../middlewares/isAuth');

BaseRouter.use('/auth', AuthRouter);
// BaseRouter.use('/game', GameRouter);
BaseRouter.use('/tt', ThemeRouter)

BaseRouter.get('*', (req, res) => {
  res.json({ msg: 'no end point' });
});

module.exports = BaseRouter;