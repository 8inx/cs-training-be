import { Router } from 'express';

import {
  createTrainingHandler,
  updateTrainingHandler,
  deleteTrainingHandler,
  findTrainingByIdHandler,
  findTrainingByUserIdHandler,
  findUsersOngoingTrainingsHandler,
  findUsersEndedTrainingsHandler,
} from '@controllers/training.controller';
import { verifyAuthorization, verifyTrainee } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {
  createTrainingSchema,
  updateTrainingSchema,
  deleteTrainingSchema,
  findTrainingByIdSchema,
  findTrainingByUserIdSchema,
  findUsersEndedTrainingsSchema,
  findUsersOngoingTrainingsSchema,
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

/**
 * @openapi
 * '/training/{trainingId}':
 *  delete:
 *    tags:
 *      - training
 *    summary: Delete training
 *    parameters:
 *    - name: trainingId
 *      in: path
 *      type: string
 *      description: session id
 *      required: true
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
route.delete('/:trainingId', validationMiddleware(deleteTrainingSchema), verifyTrainee, deleteTrainingHandler);

/**
 * @openapi
 * '/training/{trainingId}':
 *  get:
 *    tags:
 *      - training
 *    summary: Find trainings by trainingId
 *    parameters:
 *    - name: trainingId
 *      in: path
 *      type: string
 *      description: session id
 *      required: true
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
route.get('/:trainingId', validationMiddleware(findTrainingByIdSchema), findTrainingByIdHandler);

/**
 * @openapi
 * '/training/user/{userId}':
 *  get:
 *    tags:
 *      - training
 *    summary: Find trainings by userId
 *    parameters:
 *    - name: userId
 *      in: path
 *      type: string
 *      description: session id
 *      required: true
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
route.get(
  '/user/:userId',
  validationMiddleware(findTrainingByUserIdSchema),
  verifyAuthorization,
  findTrainingByUserIdHandler
);

/**
 * @openapi
 * '/training/user/{userId}/ongoing':
 *  get:
 *    tags:
 *      - training
 *    summary: Find ongoing trainings by userId
 *    parameters:
 *    - name: userId
 *      in: path
 *      type: string
 *      description: session id
 *      required: true
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
route.get(
  '/user/:userId/ongoing',
  validationMiddleware(findUsersOngoingTrainingsSchema),
  verifyAuthorization,
  findUsersOngoingTrainingsHandler
);

/**
 * @openapi
 * '/training/user/{userId}/ongoing':
 *  get:
 *    tags:
 *      - training
 *    summary: Find ended trainings by userId
 *    parameters:
 *    - name: userId
 *      in: path
 *      type: string
 *      description: session id
 *      required: true
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
route.get(
  '/user/:userId/ended',
  validationMiddleware(findUsersEndedTrainingsSchema),
  verifyAuthorization,
  findUsersEndedTrainingsHandler
);
export default route;
