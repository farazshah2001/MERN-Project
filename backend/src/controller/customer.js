const { validationResult } = require('express-validator');
const service = require('../service/customer');
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

exports.createCustomer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.createCustomer(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};
exports.loginCustomer = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).send({ errors: validationResult(req).array() });
    return;
  }
  service.loginCustomer(req.body).then(issue => res.send(issue)).catch(err => res.status(500).send(err.message));
};

exports.readCustomer = (req, res, next) => {
  if (req.params.id === undefined) {
    service.readCustomer()
      .then(issues => res.status(200).send(issues))
      .catch(err => res.status(500).send(err.message));
    return;
  }
  service.readCustomerById(req.params.id)
    .then(issues => res.status(200).send(issues === null ? {} : issues))
    .catch(err => res.status(500).send(err.message));
};

exports.addOrder = (req, res, next) => {
  service.addOrder(req.params.id, req.body)
    .then(issues => res.send(issues))
    .catch(err => res.status(400).send({ error: err }));
};

exports.delete = (req, res, next) => {
  service.delete(req.params.id)
    .then(issues => res.send(issues))
    .catch(err => {
      logger.error({ err: err });
      res.status(400).send({ error: err });
    });
};
