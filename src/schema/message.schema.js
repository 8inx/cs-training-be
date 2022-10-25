import { object, string, mixed, number } from 'yup';

const payload = {
  body: object({
    trainingId: string().required(),
    from: string(),
    type: string(),
    content: mixed(),
  }),
};

/**
 *  @openapi
 *  definitions:
 *    message:
 *      createMessageSchema:
 *        type: object
 *        required:
 *          - trainingId
 *          - from
 *          - type
 *          - content
 *        properties:
 *          trainingId:
 *            type: string
 *            default: trainingId
 *          from:
 *            type: string
 *            enum: ['user','trainee', 'coach', 'admin']
 *            default: trainee
 *          type:
 *            type: string
 *            default: text
 *          content:
 *            type: string
 *            additionalProperties:
 *              oneOf:
 *                type: object
 */

export const createMessageSchema = object().shape({
  ...payload,
});

/**
 *  @openapi
 *  definitions:
 *    message:
 *      createMessageFeedbackSchema:
 *        type: object
 *        required:
 *          - userId
 *          - status
 *          - content
 *        properties:
 *          status:
 *            type: number
 *            default: 0
 *          advice:
 *            type: string
 *            default: advice
 *          body:
 *            type: object
 *            properties:
 *              from:
 *                type: string
 *                default: historical
 *              contentType:
 *                type: string
 *                default: text
 *              content:
 *                type: string
 *                additionalProperties:
 *                  oneOf:
 *                    type: object
 */
export const createMessageFeedbackSchema = object().shape({
  params: object({
    messageId: string().required(),
  }),
  body: object({
    status: number().required(),
    advice: string(),
    body: object({
      from: string(),
      contentType: string(),
      content: mixed(),
    }),
  }),
});
