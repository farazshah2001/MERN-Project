const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');

/**
 * @swagger
 * /orders:
 *  get:
 *      summary: Fetches all orders
 *      responses:
 *          200:
 *              description: list of orders
 */
router.get('/', orderController.readOrder);

/**
 * @swagger
 * /orders/{id}:
 *      get:
 *          summary: get order by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single order object
 *
 */
router.get('/:id', orderController.readOrder);

/**
 * @swagger
 * /orders/customer/{customerId}:
 *      get:
 *          summary: get order by customer id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: an array of order object
 *
 */
router.get('/customer/:id', orderController.readOrderByCustomer);

/**
 * @swagger
 * /orders/add:
 *  post:
 *      summary: create a new order
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                       title:
 *                          type: string
 *                          example: order1..
 *                       description:
 *                          type: string
 *                          example: description..
 *                       state:
 *                          type: string
 *                          example: ready
 *                       customer:
 *                          type: string
 *                          example: custoemer1ID
 *                       watch:
 *                          type: string
 *                          example: watchID
 *                       artificers:
 *                          type: object
 *                          properties :
 *                             part:
 *                               type:string
 *                               example:handle
 *                             artificer:
 *                               type:string
 *                               example:handle
 *
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/add', orderController.createOrder);

/**
 * @swagger
 * /orders/{id}/addNote:
 *      post:
 *          summary: add note order by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          requestBody:
 *            content:
 *                  application/json:
 *                     schema:
 *                       type: object
 *                       required: true
 *                       properties:
 *                           artificer:
 *                              type: string
 *                              example: artificerId..
 *                           note:
 *                              type: object
 *                              required : true
 *                              properties:
 *                                 message:
 *                                    type: string
 *                                    example: started..
 *                                 description:
 *                                    type: string
 *                                    example: started working on clock..
 *                                 image:
 *                                    type: string
 *                                    example: abc.img
 *          responses:
 *              200:
 *                  description: a single order deleted
 *              400:
 *                  description: error object
 *
 */
router.post('/:id/addNote', orderController.addNote);

/**
 * @swagger
 * /orders/{id}/markComplete:
 *      post:
 *          summary: mark a part complete
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          requestBody:
 *            content:
 *                  application/json:
 *                     schema:
 *                       type: object
 *                       required: true
 *                       properties:
 *                           artificer:
 *                              type: string
 *                              example: artificerID..
 *                           part:
 *                              type: string
 *                              example: crown
 *          responses:
 *              200:
 *                  description: a single order deleted
 *              400:
 *                  description: error object
 *
 */
router.post('/:id/markComplete', orderController.markPartComplete);

/**
 * @swagger
 * /orders/{id}/delete:
 *      delete:
 *          summary: delete order by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *
 *          responses:
 *              200:
 *                  description: a single order deleted
 *              400:
 *                  description: error object
 *
 */
router.delete('/:id/delete', orderController.delete);

module.exports = router;
