const { validationResult } = require('express-validator');
const service = require('../service/manager');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/controller.log'
    }),
    new winston.transports.Console()
  ]
});

exports.createManager = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createManager(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.loginManager = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.loginManager(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.readManager = (req, res, next) => {
  if (req.params.id === undefined) {
    service.readManager()
      .then(issues => res.status(200).send(issues))
      .catch(err => res.status(500).send(err.message));
    return;
  }
  service.readManagerById(req.params.id)
    .then(issues => res.status(200).send(issues === null ? {} : issues))
    .catch(err => res.status(500).send(err.message));
};

exports.delete = (req, res, next) => {
  service.delete(req.params.id)
    .then(issues => res.send(issues))
    .catch(err => {
      logger.error({ err: err });
      res.status(400).send({ error: err });
    });
};
