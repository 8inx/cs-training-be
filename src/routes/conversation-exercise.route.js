import {
  bulkInsertExerciseHandler,
  findAllConversationExerciseHandler,
  findBySessionIdHandler,
} from '@controllers/conversation-exercise.controller';
import { verifyAdmin } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { bulkInsertExerciseSchema } from '@schema/conversation-exercise.schema';
import { Router } from 'express';

const route = Router();

/**
 * @openapi
 * '/conversation-exercise/bulk-insert':
 *  post:
 *    tags:
 *      - conversation-exercise
 *    summary: Bulk insert exercise
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
route.post('/bulk-insert', validationMiddleware(bulkInsertExerciseSchema), verifyAdmin, bulkInsertExerciseHandler);

/**
 * @openapi
 * '/conversation-exercise/id/{sessionId}':
 *  get:
 *    tags:
 *      - conversation-exercise
 *    summary: Find conversation exercise by sessionId
 *    parameters:
 *    - name: sessionId
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

route.get('/id/:sessionId', findBySessionIdHandler);

/**
 * @openapi
 * '/conversation-exercise/all':
 *  get:
 *    tags:
 *      - conversation-exercise
 *    summary: Find all converation exercise
 *    parameters:
 *    - name: page
 *      in: query
 *      schema:
 *        type: number
 *        description: page
 *        default: 1
 *    - name: size
 *      in: query
 *      schema:
 *        type: number
 *        description: page size
 *        default: 30
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
route.get('/all', findAllConversationExerciseHandler);
export default route;
