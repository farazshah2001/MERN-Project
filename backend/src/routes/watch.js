const express = require('express');
const router = express.Router();
const watchController = require('../controller/watch');

/**
 * @swagger
 * /watch:
 *  get:
 *      summary: Fetches all watch
 *      responses:
 *          200:
 *              description: list of watch
 */
router.get('/', watchController.readWatch);

/**
 * @swagger
 * /watch/{id}:
 *      get:
 *          summary: get watch by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single watch object
 *
 */
router.get('/:id', watchController.readWatch);

/**
 * @swagger
 * /watch/asd:
 *  post:
 *      summary: create a new watch
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                       case:
 *                          type: object
 *                          properties :
 *                                title:
 *                                   type:string
 *                                   example:case1
 *                                description:
 *                                   type:string
 *                                   example:a good case
 *                                image:
 *                                   type:string
 *                                   example:case1.jpg
 *                       hands:
 *                          type: object
 *                          properties :
 *                                title:
 *                                   type:string
 *                                   example:hand1
 *                                description:
 *                                   type:string
 *                                   example:a good hand
 *                                image:
 *                                   type:string
 *                                   example:hand1.jpg
 *                       dial:
 *                          type: object
 *                          properties :
 *                                title:
 *                                   type:string
 *                                   example:dial1
 *                                description:
 *                                   type:string
 *                                   example:a good dial
 *                                image:
 *                                   type:string
 *                                   example:dial1.jpg
 *                       crystal:
 *                          type: object
 *                          properties :
 *                                title:
 *                                   type:string
 *                                   example:crystal1
 *                                description:
 *                                   type:string
 *                                   example:a good crystal
 *                                image:
 *                                   type:string
 *                                   example:crystal1.jpg
 *                       crown:
 *                          type: object
 *                          properties :
 *                                title:
 *                                   type:string
 *                                   example:crown1
 *                                description:
 *                                   type:string
 *                                   example:a good crown
 *                                image:
 *                                   type:string
 *                                   example:crown1.jpg
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/add', watchController.createWatch);

/**
 * swagger
 * watch/addOrder:
 * post:
 *     summary: create a new watch order
 *     requestBody:
 *       content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  required: true
 *                  properties:
 *                       customer:
 *                           type: string
 *                           example: customer1
 *                       title:
 *                           type: string
 *                           example: watchorder
 *                       description:
 *                           type: string
 *                           example: description of an watch for order
 *                       watch:
 *                           type: object
 *                           required: true
 *                           properties:
 *                          case:
 *                             type: object
 *                             properties :
 *                                   title:
 *                                      type:string
 *                                      example:case1
 *                                   description:
 *                                      type:string
 *                                      example:a good case
 *                                   image:
 *                                      type:string
 *                                      example:case1.jpg
 *                          hands:
 *                             type: object
 *                             properties :
 *                                   title:
 *                                      type:string
 *                                      example:hand1
 *                                   description:
 *                                      type:string
 *                                      example:a good hand
 *                                   image:
 *                                      type:string
 *                                      example:hand1.jpg
 *                          dial:
 *                             type: object
 *                             properties :
 *                                   title:
 *                                      type:string
 *                                      example:dial1
 *                                   description:
 *                                      type:string
 *                                      example:a good dial
 *                                   image:
 *                                      type:string
 *                                      example:dial1.jpg
 *                          crystal:
 *                             type: object
 *                             properties :
 *                                   title:
 *                                      type:string
 *                                      example:crystal1
 *                                   description:
 *                                      type:string
 *                                      example:a good crystal
 *                                   image:
 *                                      type:string
 *                                      example:crystal1.jpg
 *                          crown:
 *                             type: object
 *                             properties :
 *                                   title:
 *                                      type:string
 *                                      example:crown1
 *                                   description:
 *                                      type:string
 *                                      example:a good crown
 *                                   image:
 *                                      type:string
 *                                      example:crown1.jpg
 *     responses:
 *         200:
 *             description: success
 *         400:
 *             description: problem
 */
router.post('/addOrder', watchController.createWatchOrder);

/**
 * @swagger
 * /watch/{id}/delete:
 *      delete:
 *          summary: delete watch by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single watch deleted
 *              400:
 *                  description: error object
 *
 */
router.delete('/:id/delete', watchController.delete);

module.exports = router;
