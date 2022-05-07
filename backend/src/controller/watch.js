const { validationResult } = require('express-validator');
const service = require('../service/watch');
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

exports.createWatch = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createWatch(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};
exports.createWatchOrder = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createWatchOrder(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.readWatch = (req, res, next) => {
  if (req.params.id === undefined) {
    service.readWatch()
      .then(issues => res.status(200).send(issues))
      .catch(err => res.status(500).send(err.message));
    return;
  }
  service.readWatchById(req.params.id)
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
