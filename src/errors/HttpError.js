/**
 * @ErrorConstructor HttpError
 * @param {Number} status
 * @param {String} message
 * @return {Error} error
 * @description return formatted Error Obj
 */

const HttpError = (status, message) => {
  const inner = [
    {
      path: 'general',
      message,
    },
  ];
  return Object.create(Error.prototype, {
    name: { value: 'HttpError', enumerable: true },
    status: { value: status, enumerable: true },
    inner: { value: inner, enumerable: true },
    message: { value: message, enumerable: true },
  });
};

export default HttpError;
