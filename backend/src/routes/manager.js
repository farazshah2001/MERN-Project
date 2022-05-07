const express = require('express');
const router = express.Router();
const managerController = require('../controller/manager');

/**
 * @swagger
 * /managers:
 *  get:
 *      summary: Fetches all managers
 *      responses:
 *          200:
 *              description: list of managers
 */
router.get('/', managerController.readManager);

/**
 * @swagger
 * /managers/{id}:
 *      get:
 *          summary: get manger by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single manger object
 *
 */
router.get('/:id', managerController.readManager);


/**
 * @swagger
 * /managers/login:
 *   post:
 *      summary: login a  manager
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: Manager1
 *                      password:
 *                          type: string
 *                          example: Password1
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
 router.post('/login', managerController.loginManager);

/**
 * @swagger
 * /managers/add:
 *  post:
 *      summary: create a new manger
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: Manager1
 *                      password:
 *                          type: string
 *                          example: password1
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/add', managerController.createManager);

/**
 * @swagger
 * /managers/{id}/delete:
 *      delete:
 *          summary: delete manger by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single manger deleted
 *              400:
 *                  description: error object
 *
 */
router.delete('/:id/delete', managerController.delete);

module.exports = router;
