import { mixed, object, string, number } from 'yup';

// reusable props
export const id = string().required('User id is required');
export const email = string().email('Not valid email').required('Email is required!');
export const password = string().min(6, 'Too short - should be 6 chars minimum').required('Password is required');
export const firstName = string().min(2, 'Too short - should be 2 chars minimum').required('First name is required');
export const lastName = string().min(2, 'Too short - should be 2 chars minimum').required('Last name is required');
export const role = mixed().oneOf(['trainee', 'coach', 'admin'], 'Invalid role value').required('Role is required');

/**
 *  @openapi
 *  definitions:
 *    user:
 *      updateUser:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - firstName
 *          - lastName
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
 */

export const updateUserSchema = object().shape({
  body: object({
    email,
    password,
    firstName,
    lastName,
  }),
  params: object({
    id,
  }),
});

/**
 *  @openapi
 *  definitions:
 *    user:
 *      updateUserRole:
 *        type: object
 *        required:
 *          - role
 *        properties:
 *          role:
 *            type: string
 *            enum: ['trainee', 'coach', 'admin']
 *            default: 'trainee'
 */
export const updateUserRoleSchema = object().shape({
  body: object({
    role,
  }),
  params: object({
    id,
  }),
});

export const deleteUserSchema = object().shape({
  params: object({
    id,
  }),
});

export const findUserByIdSchema = object().shape({
  params: object({
    id,
  }),
});

export const findAllUsersSchema = object().shape({
  query: object({
    role: string(),
    page: number(),
    limit: number(),
  }),
});
