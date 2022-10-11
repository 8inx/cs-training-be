import { date, number, object } from 'yup';

const payload = {
  body: object({
    max: number(),
    dateStart: date().required('Data start required!'),
    dateEnd: date().required('Data end required!'),
  }),
};

/**
 *  @openapi
 *  definitions:
 *    exercise:
 *      bulkInsertExercise:
 *        type: object
 *        required:
 *          - dateStart
 *          - dateEnd
 *        properties:
 *          max:
 *            type: number
 *            default: 30
 *          dateStart:
 *            type: string
 *            default: 2019-12-31T16:00:30.000Z
 *          dateEnd:
 *            type: string
 *            default: 2022-12-31T16:22:30.000Z
 */

export const bulkInsertExerciseSchema = object().shape({
  ...payload,
});
