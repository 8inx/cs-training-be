import { Router } from 'express';

import validationMiddleware from '@middlewares/validation.middleware';
import {
  checkRegistrationAccessHandler,
  inviteUserHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
  registerWithTokenHandler,
} from '@controllers/auth.controller';
import {
  checkRegistrationAccessSchema,
  inviteUserSchema,
  loginShema,
  registerSchema,
  registerWithTokenSchema,
} from '@schema/auth.schema';
import { verifyAdmin } from '@middlewares/permission.middleware';

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
 * '/auth/register/token':
 *  post:
 *    tags:
 *      - auth
 *    summary: register with token user
 *    requestBody:
 *      description: register body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/auth/registerWithToken'
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

route.post('/register/token', validationMiddleware(registerWithTokenSchema), registerWithTokenHandler);

/**
 * @openapi
 * '/auth/register':
 *  get:
 *    tags:
 *      - auth
 *    summary: check register access
 *    parameters:
 *    - name: token
 *      in: query
 *      type: string
 *      description: access token
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
route.get('/register', validationMiddleware(checkRegistrationAccessSchema), checkRegistrationAccessHandler);

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
