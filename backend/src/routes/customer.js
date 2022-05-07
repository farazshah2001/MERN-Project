const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer');

/**
 * @swagger
 * /customers:
 *  get:
 *      summary: Fetches all customers
 *      responses:
 *          200:
 *              description: list of customers
 */
router.get('/', customerController.readCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *          summary: get customer by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single customer object
 *
 */
router.get('/:id', customerController.readCustomer);

/**
 * @swagger
 * /customers/login:
 *   post:
 *      summary: login a  customer
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: Customer1
 *                      password:
 *                          type: string
 *                          example: Password1
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/login', customerController.loginCustomer);
/**
 * @swagger
 * /customers/add:
 *   post:
 *      summary: create a new customer
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: Customer1
 *                      password:
 *                          type: string
 *                          example: Password1
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/add', customerController.createCustomer);

/**
 * @swagger
 * /customers/{id}/createOrder:
 *   post:
 *      summary: create a new order for customer
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: integer
 *              required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                   type: string
 *                   required: true
 *                   example: order1ID
 *          responses:
 *              200:
 *                  description: order added
 *              400:
 *                  description: error object
 * */
router.post('/:id/addOrder', customerController.addOrder);
/**
 * @swagger
 * /customers/{id}/delete:
 *   delete:
 *          summary: delete customer by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single customer deleted
 *              400:
 *                  description: error object
 *
 */
router.delete('/:id/delete', customerController.delete);

module.exports = router;
