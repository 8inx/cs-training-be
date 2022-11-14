import { object, string, ref } from 'yup';

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
 *            default: Jimboy
 *          lastName:
 *            type: string
 *            default: Schwarzenegger
 *          role:
 *            type: string
 *            enum: ['trainee', 'coach', 'admin']
 *            default: 'trainee'
 *          token:
 *            type: string
 *            default: 'tokenHere'
 */

export const registerSchema = object().shape({
  body: object({
    email,
    password,
    firstName,
    lastName,
    role,
    token: string().required('token is required'),
  }),
});

export const checkInviteSchema = object().shape({
  query: object({
    emailToken: string().required('email token is required'),
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
 *      changePassword:
 *        type: object
 *        required:
 *          - oldPassword
 *          - newPassword
 *          - confirmPassword
 *        properties:
 *          oldPassword:
 *            type: string
 *            default: password
 *          newPassword:
 *            type: string
 *            default: password
 *          confirmPassword:
 *            type: string
 *            default: password
 */

export const ChangePasswordSchema = object().shape({
  body: object({
    oldPassword: string(),
    newPassword: string().min(8, 'Too short!').max(50, 'Too long!').required('Required'),
    confirmPassword: string()
      .oneOf([ref('newPassword')], 'Passwords must match')
      .required('Required'),
  }),
  params: object({
    id: string()
      .matches(/^[0-9a-fA-F]{24}$/, 'Invalid id')
      .required('Id is required'),
  }),
});
