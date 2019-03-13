const express = require('express');
const ev = require('express-validation');

const authRoute = require('./auth.route');

module.exports = () => {
  const router = new express.Router();

  router.use('/auth', authRoute);

  router.get('/', (req, res) => res.send('Server running!'));

  router.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line
  router.use((err, req, res, next) => {
    if (err instanceof ev.ValidationError) {
      err.statusText = 'Payload Validation Error'; // eslint-disable-line
    }
    logger.error(err.stack);
    console.error(err.status);
    switch (err.status) {
      case 404:
        return res.notFound(err);
      case 500:
        return res.serverError(err);
      case null:
      case undefined:
      default:
        return res.badRequest(err);
    }
  });

  return router;
};
