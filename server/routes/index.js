'use strict';

const Router = require('express').Router;

const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Redux Mithril Starter App',
  });
});

module.exports = router;
