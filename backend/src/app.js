const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const winston = require('winston');
const cors = require('cors');
const log = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: new winston.transports.Console()
});
const config = require('./config');
const mongoose = require('mongoose');

const { host, port, name, user, password } = config.db;
// const dbConnectionString = `mongodb://${host}:${port}/${name}`;
const dbConnectionString = 'mongodb+srv://farazshah2001:Lumbarjack35@cluster0.xdgnc.mongodb.net/database?retryWrites=true&w=majority';
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  auth: {
    authSource: 'admin'
  },
  user: user,
  pass: password
}).catch(reason => {
  log.error({ reason: reason, connectionString: dbConnectionString });
  process.exit(1);
});

const app = express();

if (config.env === 'prod') {
  log.info({ config: config });
  app.use(express.static('public'));
} else {
  log.info({ config: config });
  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'MERN Template Express API with Swagger',
        version: '0.1.0',
        description:
            'Lorem ipsum ...',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html'
        },
        contact: {
          name: 'Zsolt Toth',
          url: 'https://github.com/ZsoltToth',
          email: 'toth.zsolt@uni-eszterhazy.hu'
        }
      },
      servers: [
        {
          url: 'http://localhost:3001/'
        }
      ]
    },
    apis: [path.join(__dirname, '/routes/*.js')]
  };
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
}

const customerRouter = require('./routes/customer');
const artificerRouter = require('./routes/artificer');
const managerRouter = require('./routes/manager');
const orderRouter = require('./routes/order');
const watchRouter = require('./routes/watch');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/customers', customerRouter);
app.use('/artificers', artificerRouter);
app.use('/managers', managerRouter);
app.use('/orders', orderRouter);
app.use('/watch', watchRouter);

module.exports = app;
