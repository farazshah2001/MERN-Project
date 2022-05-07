const Customer = require('../model/Customer');
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

const createCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    Customer.create({ ...customer })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const loginCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    Customer.findOne({ name: customer.name, password: customer.password })
      .then((doc) => {
        resolve(doc);
      })
      .catch((err) => { reject(err); });
  });
};

const readCustomer = () => {
  return new Promise((resolve, reject) => {
    Customer.find()
      .then((documents) => { resolve(documents); })
      .catch((err) => { reject(err); });
  });
};

const readCustomerById = (id) => {
  return new Promise((resolve, reject) => {
    Customer.findById(id)
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`Customer Not Found with id: ${id}`);
        reject(err);
      });
  });
};

const addOrder = (id, order) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(id, { orders: [...orders, order] })
      .then((documents) => {
        resolve(documents);
      })
      .catch((err) => {
        logger.info(`cannot add order with id: ${id}`);
        reject(err);
      });
  });
};
const deleteCustomer = (id) => {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndDelete(id).then((documents) => {
      resolve(documents);
    })
      .catch((err) => {
        logger.info(`Customer delete with id: ${id}`);
        reject(err);
      });
  });
};

module.exports = {
  createCustomer: createCustomer,
  readCustomer: readCustomer,
  readCustomerById: readCustomerById,
  addOrder: addOrder,
  delete: deleteCustomer,
  loginCustomer: loginCustomer
};
