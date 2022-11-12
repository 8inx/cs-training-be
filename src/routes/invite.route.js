import { Router } from 'express';

import {
  checkInviteHandler,
  deleteInviteHandler,
  findAllInvitesHandler,
  inviteUserHandler,
  refreshInviteHandler,
} from '@controllers/invite.controller';

import { verifyAdmin } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { checkInviteSchema, deleteInviteSchema, inviteUserSchema, refreshInviteSchema } from '@schema/invite.schema';

const route = Router();
/**
 * @openapi
 * '/invite':
 *  post:
 *    tags:
 *      - invite
 *    summary: invite user
 *    requestBody:
 *      description: invite user body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/auth/inviteUser'
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

route.post('/', validationMiddleware(inviteUserSchema), verifyAdmin, inviteUserHandler);

/**
 * @openapi
 * '/invite/{id}':
 *  patch:
 *    tags:
 *      - invite
 *    summary: refresh invite
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: invite id
 *      required: true
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

route.patch('/:id', validationMiddleware(refreshInviteSchema), verifyAdmin, refreshInviteHandler);

/**
 * @openapi
 * '/invite/{id}':
 *  delete:
 *    tags:
 *      - invite
 *    summary: delete invite
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: invite id
 *      required: true
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
route.delete('/:id', validationMiddleware(deleteInviteSchema), verifyAdmin, deleteInviteHandler);

/**
 * @openapi
 * '/invite':
 *  get:
 *    tags:
 *      - invite
 *    summary: refresh invite
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

route.get('/', verifyAdmin, findAllInvitesHandler);

/**
 * @openapi
 * '/invite/check':
 *  get:
 *    tags:
 *      - invite
 *    summary: check invitation access
 *    parameters:
 *    - name: emailToken
 *      in: query
 *      type: string
 *      description: email access token
 *      required: true
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
route.get('/check', validationMiddleware(checkInviteSchema), checkInviteHandler);

export default route;
