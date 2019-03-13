const Joi = require('joi');

module.exports = {
  signup: {
    body: {
      // firstName: Joi.string().required(),
      // lastName: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
