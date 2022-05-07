const Manager = require('../model/Manager');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/service.log'
    }),
    new winston.transports.Console()
  ]
});

const createManager = (manager) => {
  return new Promise((resolve, reject) => {
    Manager.create({ ...manager })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const loginManager = (manager) => {
  return new Promise((resolve, reject) => {
    Manager.findOne({ name: manager.name, password: manager.password })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const readManagers = () => {
  return new Promise((resolve, reject) => {
    Manager.find()
      .then((documents) => { resolve(documents); })
      .catch((err) => { reject(err); });
  });
};

const readManagersById = (id) => {
  return new Promise((resolve, reject) => {
    Manager.findById(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Manager Not Found with id: ${id}`);
        reject(err);
      });
  });
};

const deleteManager = (id) => {
  return new Promise((resolve, reject) => {
    Manager.findByIdAndDelete(id).then((documents) => {
      resolve(documents);
    })
      .catch((err) => {
        logger.info(`Manager delete with id: ${id}`);
        reject(err);
      });
  });
};

module.exports = {
  createManager: createManager,
  readManager: readManagers,
  readManagerById: readManagersById,
  delete: deleteManager,
  loginManager: loginManager
};
