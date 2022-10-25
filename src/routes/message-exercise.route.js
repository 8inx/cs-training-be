import {
  findByIdHandler,
  findBySegmentFromOperatorHandler,
  findBySegmentFromUserHandler,
  findBySegmentHandler,
  findBySessionIdHandler,
} from '@controllers/message-conversation.controller';
import { Router } from 'express';

const route = Router();

/**
 * @openapi
 * '/message-exercise/id/{id}':
 *  get:
 *    tags:
 *      - message-exercise
 *    summary: Find message exercise by id
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: message id
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

route.get('/id/:id', findByIdHandler);

/**
 * @openapi
 * '/message-exercise/session/{sessionId}':
 *  get:
 *    tags:
 *      - message-exercise
 *    summary: Find message exercise by session id
 *    parameters:
 *    - name: sessionId
 *      in: path
 *      type: string
 *      description: message session id
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

route.get('/session/:sessionId', findBySessionIdHandler);

/**
 * @openapi
 * '/message-exercise/session/{sessionId}/segment/{segmentId}':
 *  get:
 *    tags:
 *      - message-exercise
 *    summary: Find message exercise by segment
 *    parameters:
 *    - name: sessionId
 *      in: path
 *      type: string
 *      description: message session id
 *      required: true
 *    - name: segmentId
 *      in: path
 *      type: string
 *      description: message segment id
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

route.get('/session/:sessionId/segment/:segmentId', findBySegmentHandler);

/**
 * @openapi
 * '/message-exercise/session/{sessionId}/segment/{segmentId}/user':
 *  get:
 *    tags:
 *      - message-exercise
 *    summary: Find message exercise by segment from user
 *    parameters:
 *    - name: sessionId
 *      in: path
 *      type: string
 *      description: message session id
 *      required: true
 *    - name: segmentId
 *      in: path
 *      type: string
 *      description: message segment id
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
route.get('/session/:sessionId/segment/:segmentId/user', findBySegmentFromUserHandler);

/**
 * @openapi
 * '/message-exercise/session/{sessionId}/segment/{segmentId}/operator':
 *  get:
 *    tags:
 *      - message-exercise
 *    summary: Find message exercise by segment from operator
 *    parameters:
 *    - name: sessionId
 *      in: path
 *      type: string
 *      description: message session id
 *      required: true
 *    - name: segmentId
 *      in: path
 *      type: string
 *      description: message segment id
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
route.get('/session/:sessionId/segment/:segmentId/operator', findBySegmentFromOperatorHandler);

export default route;
