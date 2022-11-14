import { Router } from 'express';

import { changePasswordHandler, loginHandler, logoutHandler, registerHandler } from '@controllers/auth.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { ChangePasswordSchema, loginShema, registerSchema } from '@schema/auth.schema';
import { verifyAuthorization } from '@middlewares/permission.middleware';

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
 * '/auth/password/{id}':
 *  put:
 *    tags:
 *      - auth
 *    summary: change password
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: user id
 *      required: true
 *    requestBody:
 *      description: update body
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/auth/changePassword'
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
route.put('/password/:id', validationMiddleware(ChangePasswordSchema), verifyAuthorization, changePasswordHandler);

export default route;
