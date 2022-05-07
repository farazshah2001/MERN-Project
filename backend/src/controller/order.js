const { validationResult } = require('express-validator');
const service = require('../service/order');
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

exports.createOrder = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createOrder(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.readOrder = (req, res, next) => {
  if (req.params.id === undefined) {
    service.readOrder()
      .then(issues => res.status(200).send(issues))
      .catch(err => res.status(500).send(err.message));
    return;
  }
  service.readOrderById(req.params.id)
    .then(issues => res.status(200).send(issues === null ? {} : issues))
    .catch(err => res.status(500).send(err.message));
};

exports.readOrderByCustomer = (req, res, next) => {
  service.readOrderByCustomer(req.params)
    .then(issues => res.status(200).send(issues))
    .catch(err => res.status(500).send(err.message));
};

exports.addNote = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.addNote(req.params, req.body.artificer, req.body.note).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.markPartComplete = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.markPartComplete(req.params, req.body.artificer, req.body.part).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.delete = (req, res, next) => {
  service.delete(req.params.id)
    .then(issues => res.send(issues))
    .catch(err => {
      logger.error({ err: err });
      res.status(400).send({ error: err });
    });
};
