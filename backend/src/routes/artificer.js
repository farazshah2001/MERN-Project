const express = require('express');
const router = express.Router();
const artificerController = require('../controller/artificer');

/**
 * @swagger
 * /artificers:
 *  get:
 *      summary: Fetches all artificers
 *      responses:
 *          200:
 *              description: list of artificers
 */
router.get('/', artificerController.readArtificer);

/**
 * @swagger
 * /artificers/{id}:
 *      get:
 *          summary: get artificer by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single artificer object
 *
 */
router.get('/:id', artificerController.readArtificer);

/**
 * @swagger
 * /artificers/add:
 *  post:
 *      summary: create a new artificer
 *      requestBody:
 *        content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   required: true
 *                   properties:
 *                      name:
 *                          type: string
 *                          example: Artificer1
 *                      description:
 *                          type: string
 *                          example: good artificer
 *                      expertise:
 *                          type: string
 *                          example: hand
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: problem
 */
router.post('/add', artificerController.createArtificer);

/**
 * @swagger
 * /artificers/{id}/delete:
 *      delete:
 *          summary: delete artificer by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: a single artificer deleted
 *              400:
 *                  description: error object
 *
 */
router.delete('/:id/delete', artificerController.delete);

module.exports = router;
