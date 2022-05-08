const Watch = require('../model/Watch');
const Order = require('../model/Order');
const winston = require('winston');
const Artificer = require('../model/Artificer');

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

const createWatch = (watch) => {
  return new Promise((resolve, reject) => {
    Watch.create({ ...watch })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const createWatchOrder = async (reqBody) => {
  console.log(reqBody);
  const { customer, watch, title, description } = reqBody;

  const getArtificer = async (expertise) => {
    const artfs = await Artificer.find({ expertise: expertise });
    if (artfs.length === 0) {
      return null;
    } else if (artfs.length === 1) {
      return artfs[0];
    } else if (artfs.length > 1) {
      return artfs[Math.random(0, artfs.length - 1)];
    }
  };
  const getArtificerArray = await Promise.all(['case', 'handle', 'dial', 'crown', 'crystal'].map(async (p) => {
    const art = await getArtificer(p);
    return ({
      part: p,
      artificer: art._id
    }
    );
  }));
  console.log(getArtificerArray);
  return new Promise((resolve, reject) => {
    Watch.create({ ...watch })
      .then((w) => {
        Order.create({ title, description, state: 'ready', customer, watch: w._id, artificers: getArtificerArray });
        resolve(w);
      })
      .catch((err) => { reject(err); });
  });
};

const readWatches = () => {
  return new Promise((resolve, reject) => {
    Watch.find()
      .then((documents) => { resolve(documents); })
      .catch((err) => { reject(err); });
  });
};

const readWatchesById = (id) => {
  return new Promise((resolve, reject) => {
    Watch.findById(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Watch Not Found with id: ${id}`);
        reject(err);
      });
  });
};

// const changeSate = (id, state) => {
//   return readWatchesById(id)
//     .then(watch => {
//       if (!isStateChangeAllowed(watch.state, state)) {
//         logger.info(`Invalid State Change ${watch.state} => ${state}`);
//         throw new Error({ msg: `Invalid State ohange ${watch.state} => ${state}` });
//       }
//       return watch;
//     }).then(watch => {
//       return Watch.findByIdAndUpdate(id, { state: state }, { new: true });
//     });
// };

// const isStateChangeAllowed = (from, to) => {
//   if (from ==== watchState.OPEN && to ==== watchState.IN_PROGRESS) return true;
//   if (from ==== watchState.IN_PROGRESS && to ==== watchState.RESOLVED) return true;
//   if (from ==== watchState.RESOLVED && [watchState.IN_PROGRESS, watchState.CLOSED].includes(to)) return true;
//   return false;
// };

const deleteWatch = (id) => {
  return new Promise((resolve, reject) => {
    Watch.findByIdAndDelete(id).then((documents) => {
      resolve(documents);
    })
      .catch((err) => {
        logger.info(`Watch delete with id: ${id}`);
        reject(err);
      });
  });
};

module.exports = {
  createWatch: createWatch,
  readWatch: readWatches,
  readWatchById: readWatchesById,
  delete: deleteWatch,
  createWatchOrder: createWatchOrder
};
