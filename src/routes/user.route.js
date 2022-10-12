import { Router } from 'express';

import {
  deleteUserHandler,
  findAllUsersHandler,
  findUserByIdHandler,
  updateUserHandler,
  updateUserRoleHandler,
} from '@controllers/user.controller';
import {
  deleteUserSchema,
  findAllUsersSchema,
  findUserByIdSchema,
  updateUserRoleSchema,
  updateUserSchema,
} from '@schema/user.schema';
import { verifyAdmin, verifyAuthorization, verifyToken } from '@middlewares/permission.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

const route = Router();

/**
 * @openapi
 * '/user/{id}':
 *  put:
 *    tags:
 *      - user
 *    summary: update user
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
 *            $ref: '#/definitions/user/updateUser'
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
route.put('/:id', validationMiddleware(updateUserSchema), verifyAuthorization, updateUserHandler);

/**
 * @openapi
 * '/user/{id}/role':
 *  put:
 *    tags:
 *      - user
 *    summary: update user role
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
 *            $ref: '#/definitions/user/updateUserRole'
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
route.put('/:id/role', validationMiddleware(updateUserRoleSchema), verifyAdmin, updateUserRoleHandler);

/**
 * @openapi
 * '/user/{id}':
 *  delete:
 *    tags:
 *      - user
 *    summary: delete user
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: user id
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
 *      500:
 *        description: 'Server Error'
 */

route.delete('/:id', validationMiddleware(deleteUserSchema), verifyToken, deleteUserHandler);

/**
 * @openapi
 * '/user/id/{id}':
 *  get:
 *    tags:
 *      - user
 *    summary: find user by id
 *    parameters:
 *    - name: id
 *      in: path
 *      type: string
 *      description: user id
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
route.get('/id/:id', validationMiddleware(findUserByIdSchema), findUserByIdHandler);

/**
 * @openapi
 * '/user/all':
 *  get:
 *    tags:
 *      - user
 *    summary: find all users
 *    parameters:
 *    - name: role
 *      in: query
 *      schema:
 *        type: string
 *        description: user role
 *        enum: ['trainee', 'coach', 'admin']
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
 *        default: 20
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

route.get('/all', validationMiddleware(findAllUsersSchema), findAllUsersHandler);

export default route;
