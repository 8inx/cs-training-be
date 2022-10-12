import { verifyAdmin } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { bulkInsertExerciseHandler } from '@controllers/conversation-exercise.controller';
import { bulkInsertExerciseSchema } from '@schema/conversation-exercise.schema';
import { Router } from 'express';

const route = Router();

/**
 * @openapi
 * '/conversation-exercise/bulkInsert':
 *  post:
 *    tags:
 *      - conversation-exercise
 *    summary: bulk insert exercise
 *    requestBody:
 *      description: insert exercise body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/conversationExercise/bulkInsertExercise'
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
route.post('/bulkInsert', validationMiddleware(bulkInsertExerciseSchema), verifyAdmin, bulkInsertExerciseHandler);

export default route;
