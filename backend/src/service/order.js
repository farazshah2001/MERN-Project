const Order = require('../model/Order');
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

const createOrder = (order) => {
  return new Promise((resolve, reject) => {
    Order.create({ ...order })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const readOrders = () => {
  return new Promise((resolve, reject) => {
    Order.find()
      .then((documents) => { resolve(documents); })
      .catch((err) => { reject(err); });
  });
};

const readOrdersById = (id) => {
  return new Promise((resolve, reject) => {
    Order.findById(id).populate('customer').populate('watch')
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Order Not Found with id: ${id}`);
        reject(err);
      });
  });
};

const readOrdersByCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    Order.find({ customer: customer.id }).populate('customer').populate('watch')
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Order Not Found with id: ${customer}`);
        reject(err);
      });
  });
};

const addNote = (id, artificer, note) => {
  return new Promise((resolve, reject) => {
    Order.findById(id.id)
      .then((order) => {
        order.artificers.map(a => {
          if (a.artificer == artificer) {
            console.log(a.artificer);
            a.notes = [...a.notes, note];
          }
        });
        order.save();
        resolve(order);
      })
      .catch((err) => {
        logger.info(`cannot add order with id: ${id}`);
        reject(err);
      });
  });
};
const markPartComplete = (id, artificer, part) => {
  return new Promise((resolve, reject) => {
    Order.findById(id.id)
      .then((order) => {
        order.artificers.map(a => {
          if (a.artificer == artificer) {
            order.partsCompleted = [...order.partsCompleted, part];
          }
        });
        order.save();
        resolve(order);
      })
      .catch((err) => {
        logger.info(`cannot add order with id: ${id}`);
        reject(err);
      });
  });
};
const deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    Order.findByIdAndDelete(id).then((documents) => {
      resolve(documents);
    })
      .catch((err) => {
        logger.info(`Order delete with id: ${id}`);
        reject(err);
      });
  });
};

module.exports = {
  createOrder: createOrder,
  readOrder: readOrders,
  readOrderById: readOrdersById,
  delete: deleteOrder,
  addNote: addNote,
  markPartComplete: markPartComplete,
  readOrderByCustomer: readOrdersByCustomer
};
