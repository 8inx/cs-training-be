import { object, string, number } from 'yup';

const trainingParams = {
  params: object({
    trainingId: string().required('training id is required'),
  }),
}

const payload = {
  body: object({
    sessionId: string(),
    userId: string(),
    meta: object({
      nickname: string(),
      email: string(),
      avatar: string(),
    }),
    currentSegment: number(),
    status: string(),
  }),
};

export const createTrainingSchema = object().shape({});

/**
 *  @openapi
 *  definitions:
 *    training:
 *      updateTrainingSchema:
 *        type: object
 *        required:
 *          - trainingId
 *          - userId
 *        properties:
 *          trainingId:
 *            type: string
 *            default: trainingId here
 *          status:
 *            type: string
 *            default: ended
 */
export const updateTrainingSchema = object().shape({
  ...trainingParams,
  ...payload,
});

export const deleteTrainingSchema = object().shape({
  ...trainingParams,
});

export const findTrainingByIdSchema = object().shape({
  ...trainingParams,
})

export const findTrainingByUserIdSchema = object().shape({
  params: object({
    userId: string(),
  }),
});
