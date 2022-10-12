import { Router } from 'express';

import { createConversationHandler } from '@controllers/conversation.controller';
import { verifyTrainee } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { createConversationSchema } from '@schema/conversation.schema';

const route = Router();

/**
 * @openapi
 * '/conversation':
 *  post:
 *    tags:
 *      - conversation
 *    summary: create conversation
 *    requestBody:
 *      description: conversation body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/conversation/createConversationSchema'
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

route.post('/', validationMiddleware(createConversationSchema), verifyTrainee, createConversationHandler);

export default route;
