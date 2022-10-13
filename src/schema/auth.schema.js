import { object } from 'yup';

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
