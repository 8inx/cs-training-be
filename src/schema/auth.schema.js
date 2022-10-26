import { object, string } from 'yup';

import { email, firstName, lastName, password, role } from './user.schema';

/**
 *  @openapi
 *  definitions:
 *    auth:
 *      register:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - firstName
 *          - lastName
 *          - role
 *        properties:
 *          email:
 *            type: string
 *            default: example@email.com
 *          password:
 *            type: string
 *            default: password
 *          firstName:
 *            type: string
 *            default: Jimboy
 *          lastName:
 *            type: string
 *            default: Schwarzenegger
 *          role:
 *            type: string
 *            enum: ['trainee', 'coach', 'admin']
 *            default: 'trainee'
 */

export const registerSchema = object().shape({
  body: object({
    email,
    password,
    firstName,
    lastName,
    role,
  }),
});

/**
 *  @openapi
 *  definitions:
 *    auth:
 *      registerWithToken:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - firstName
 *          - lastName
 *          - role
 *          - token
 *        properties:
 *          email:
 *            type: string
 *            default: example@email.com
 *          password:
 *            type: string
 *            default: password
 *          firstName:
 *            type: string
 *            default: John
 *          lastName:
 *            type: string
 *            default: Dalton
 *          role:
 *            type: string
 *            enum: ['trainee', 'coach', 'admin']
 *            default: 'trainee'
 *          token:
 *            type: string
 *            default: 'tokenHere'
 */

export const registerWithTokenSchema = object().shape({
  body: object({
    email,
    password,
    firstName,
    lastName,
    role,
    token: string().required('token is required'),
  }),
});

/**
 *  @openapi
 *  definitions:
 *    auth:
 *      checkRegistrationAccess:
 *        type: object
 *        required:
 *          - token
 *        properties:
 *          token:
 *            type: string
 *            default: 'tokenHere'
 */

export const checkRegistrationAccessSchema = object().shape({
  query: object({
    token: string().required('token is required'),
  }),
});

/**
 *  @openapi
 *  definitions:
 *    auth:
 *      login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            default: example@email.com
 *          password:
 *            type: string
 *            default: password
 */

export const loginShema = object().shape({
  body: object({
    email,
    password,
  }),
});

/**
 *  @openapi
 *  definitions:
 *    auth:
 *      inviteUser:
 *        type: object
 *        required:
 *          - email
 *          - role
 *        properties:
 *          email:
 *            type: string
 *            default: example@email.com
 *          role:
 *            type: string
 *            enum: ['trainee','coach']
 *            default: trainee
 */

export const inviteUserSchema = object().shape({
  body: object({
    email,
    role,
  }),
});
