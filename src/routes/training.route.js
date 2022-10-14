import { Router } from 'express';

import {
    createTrainingHandler,
    updateTrainingHandler,
    deleteTrainingHandler,
    findTrainingByIdHandler,
    findTrainingByUserIdHandler,
} from '@controllers/training';
import { verifyTrainee, verifyCoach } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {
    createTrainingSchema,
    updateTrainingSchema,
    deleteTrainingSchema,
    findTrainingByIdSchema,
    findTrainingByUserIdSchema,
} from '@schema/training.schema';

const route = Router();

/**
 * @openapi
 * '/training':
 *  post:
 *    tags:
 *      - training
 *    summary: create/start a training 
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

/**
 * @openapi
 * '/training/{trainingId}':
 *  put:
 *    tags:
 *      - training
 *    summary: update training
 *    parameters:
 *    - name: trainingId
 *      in: path
 *      type: string
 *      description: session id
 *      required: true
 *    requestBody:
 *      description: training body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/training/updateTrainingSchema'
 *    responses:
 *      200:
 *        description: 'Success'
 *      400:
 *        description: 'Bad Request'
 *      404:
 *        description: 'Not Found'
 *      500:
 *        description: 'Server Error'
 */
route.put('/:trainingId', validationMiddleware(updateTrainingSchema), updateTrainingHandler);
route.delete('/:trainingId', validationMiddleware(deleteTrainingSchema), deleteTrainingHandler);
route.get('/:trainingId', validationMiddleware(findTrainingByIdSchema), findTrainingByIdHandler);
route.get('/user/:userId', validationMiddleware(findTrainingByUserIdSchema), findTrainingByUserIdHandler);

export default route;
