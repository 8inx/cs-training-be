import { Router } from 'express';

import {
  checkInviteHandler,
  inviteUserHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from '@controllers/auth.controller';
import { verifyAdmin } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { checkInviteSchema, inviteUserSchema, loginShema, registerSchema } from '@schema/auth.schema';

const route = Router();

/**
 * @openapi
 * '/auth/register':
 *  post:
 *    tags:
 *      - auth
 *    summary: register user
 *    requestBody:
 *      description: register body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/auth/register'
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

route.post('/register', validationMiddleware(registerSchema), registerHandler);

/**
 * @openapi
 * '/auth/invite':
 *  get:
 *    tags:
 *      - auth
 *    summary: get register access
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
route.get('/invite', validationMiddleware(checkInviteSchema), checkInviteHandler);

/**
 * @openapi
 * '/auth/login':
 *  post:
 *    tags:
 *      - auth
 *    summary: login user
 *    requestBody:
 *      description: login body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/auth/login'
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
route.post('/login', validationMiddleware(loginShema), loginHandler);

/**
 * @openapi
 * '/auth/logout':
 *  post:
 *    tags:
 *      - auth
 *    summary: login user
 *    responses:
 *      200:
 *        description: 'Success'
 *      500:
 *        description: 'Server Error'
 */
route.post('/logout', logoutHandler);

/**
 * @openapi
 * '/auth/invite':
 *  post:
 *    tags:
 *      - auth
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

route.post('/invite', validationMiddleware(inviteUserSchema), verifyAdmin, inviteUserHandler);

export default route;
