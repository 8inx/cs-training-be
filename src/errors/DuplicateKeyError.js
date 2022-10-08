/**
 * @ErrorConstructor DuplicateKeyError
 * @param {String} path
 * @param {String} message
 * @return {Error} error
 * @description return formatted Error Obj
 */

const DuplicateKeyError = (path, message) => {
  const inner = [
    {
      path,
      message,
    },
  ];
  return Object.create(Error.prototype, {
    name: { value: 'DuplicateKeyError', enumerable: true },
    status: { value: 409, enumerable: true },
    inner: { value: inner, enumerable: true },
    message: { value: message, enumerable: true },
  });
};

export default DuplicateKeyError;
