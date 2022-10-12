import { object, string, number } from 'yup';

const payload = {
  body: object({
    sessionId: string().required('Missing session id'),
    userId: string().required('UserId required!'),
    meta: object({
      nickname: string(),
      email: string(),
      avatar: string(),
    }),
    currentSegment: number(),
  }),
};

/**
 *  @openapi
 *  definitions:
 *    conversation:
 *      createConversationSchema:
 *        type: object
 *        required:
 *          - sessionId
 *          - userId
 *        properties:
 *          sessionId:
 *            type: string
 *            default: session_f622e5d1-3464-40f8-a70a-6514ffc5b69f
 *          userId:
 *            type: string
 *            default: 6346b13f671f9c7dfc3c99ba
 *          meta:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
 *                default: John Doe
 *              email:
 *                type: string
 *                default: john@email.com
 *              avatar:
 *                type: string
 *                default: 'https://joeschmoe.io/api/v1/jon'
 */
export const createConversationSchema = object().shape({
  ...payload,
});
