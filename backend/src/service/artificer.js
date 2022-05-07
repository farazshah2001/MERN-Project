const Artificer = require('../model/Artificer');
const winston = require('winston');
const Order = require('../model/Order');

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

const createArtificer = (artificer) => {
  return new Promise((resolve, reject) => {
    Artificer.create({ ...artificer })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const readArtificers = () => {
  return new Promise((resolve, reject) => {
    Artificer.find()
      .then((documents) => { resolve(documents); })
      .catch((err) => { reject(err); });
  });
};

const readArtificersById = (id) => {
  return new Promise((resolve, reject) => {
    Artificer.findById(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Artificer Not Found with id: ${id}`);
        reject(err);
      });
  });
};

const changeSate = (id, state) => {
  return readArtificersById(id)
    .then(artificer => {
      if (!isStateChangeAllowed(artificer.state, state)) {
        logger.info(`Invalid State Change ${artificer.state} => ${state}`);
        throw new Error({ msg: `Invalid State ohange ${artificer.state} => ${state}` });
      }
      return artificer;
    }).then(artificer => {
      return Artificer.findByIdAndUpdate(id, { state: state }, { new: true });
    });
};

const isStateChangeAllowed = (from, to) => {
  if (from === artificerState.OPEN && to === artificerState.IN_PROGRESS) return true;
  if (from === artificerState.IN_PROGRESS && to === artificerState.RESOLVED) return true;
  if (from === artificerState.RESOLVED && [artificerState.IN_PROGRESS, artificerState.CLOSED].includes(to)) return true;
  return false;
};

const deleteArtificer = (id) => {
  return new Promise((resolve, reject) => {
    Artificer.findByIdAndDelete(id).then((documents) => {
      resolve(documents);
    })
      .catch((err) => {
        logger.info(`Artificer delete with id: ${id}`);
        reject(err);
      });
  });
};

module.exports = {
  createArtificer: createArtificer,
  readArtificer: readArtificers,
  readArtificerById: readArtificersById,
  delete: deleteArtificer
};
