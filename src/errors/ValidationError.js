/**
 * @ErrorConstructor ValidationError
 * @param {Error} error
 * @returns {Error} error
 * @description return formatted Error Obj
 */

const ValidationError = error => {
  const inner = error.inner.map(e => ({
    path: e.path.split('.')[1],
    message: e.message,
  }));

  return Object.create(Error.prototype, {
    name: { value: error.name, enumerable: true },
    status: { value: 400, enumerable: true },
    inner: { value: inner, enumerable: true },
    message: { value: error.message, enumerable: true },
  });
};

export default ValidationError;
