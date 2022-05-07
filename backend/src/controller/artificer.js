const { validationResult } = require('express-validator');
const service = require('../service/artificer');
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

exports.createArtificer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createArtificer(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.readArtificer = (req, res, next) => {
  if (req.params.id === undefined) {
    service.readArtificer()
      .then(issues => res.status(200).send(issues))
      .catch(err => res.status(500).send(err.message));
    return;
  }
  service.readArtificerById(req.params.id)
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
