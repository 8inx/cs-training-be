import { object, string } from 'yup';
import { email, role } from './user.schema';

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

export const refreshInviteSchema = object().shape({
  params: object({
    id: string()
      .matches(/^[0-9a-fA-F]{24}$/, 'Invalid invitation id')
      .required('Invitation Id is required'),
  }),
});

export const deleteInviteSchema = object().shape({
  params: object({
    id: string()
      .matches(/^[0-9a-fA-F]{24}$/, 'Invalid invitation id')
      .required('Invitation Id is required'),
  }),
});

export const checkInviteSchema = object().shape({
  query: object({
    emailToken: string().required('email token is required'),
  }),
});
