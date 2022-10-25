import { Router } from 'express';

import { createMessageFeedbackHandler, createMessageHandler } from '@controllers/message.controller';
import { verifyCoach, verifyTrainee } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { createMessageFeedbackSchema, createMessageSchema } from '@schema/message.schema';

const route = Router();

/**
 * @openapi
 * '/message':
 *  post:
 *    tags:
 *      - message
 *    summary: create message
 *    requestBody:
 *      description: training body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/message/createMessageSchema'
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
route.post('/', validationMiddleware(createMessageSchema), verifyTrainee, createMessageHandler);

/**
 * @openapi
 * '/message/{messageId}/feedback':
 *  put:
 *    tags:
 *      - message
 *    summary: add message feedback
 *    parameters:
 *    - name: messageId
 *      in: path
 *      type: string
 *      description: message id
 *      required: true
 *    requestBody:
 *      description: feedback body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/message/createMessageFeedbackSchema'
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
 *      500:
 *        description: 'Server Error'
 */
route.put(
  '/:messageId/feedback',
  validationMiddleware(createMessageFeedbackSchema),
  verifyCoach,
  createMessageFeedbackHandler
);
export default route;
