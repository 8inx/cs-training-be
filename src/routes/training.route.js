import { Router } from 'express';

import { createTrainingHandler } from '@controllers/training';
import { verifyTrainee } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { createTrainingSchema } from '@schema/training.schema';

const route = Router();

/**
 * @openapi
 * '/training':
 *  post:
 *    tags:
 *      - training
 *    summary: create/start a training 
 *    requestBody:
 *      description: conversation body
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/conversation/createTrainingSchema'
 *    responses:
 *      200:
 *        description: 'Success'
 *      400:
 *        description: 'Bad Request'
 *      401:
 *        description: 'Unauthorized'
 *      403:
 *        description: 'Request Forbidden'
 *      404:
 *        description: 'Not Found'
 *      409:
 *        description: 'Request Conflict'
 *      500:
 *        description: 'Server Error'
 */

route.post('/', validationMiddleware(createTrainingSchema), verifyTrainee, createTrainingHandler);

export default route;
