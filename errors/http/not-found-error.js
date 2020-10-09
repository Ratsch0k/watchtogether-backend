const HttpError = require("./error");

/**
 * Represents the NotFound error.
 * Will be thrown if entities or routes
 * can't be found.
 */
class NotFoundError extends HttpError {
  /**
   * Creates an instance of this class.
   * @param {any} detail Optional additional information
   */
  constructor(detail) {
    super(404, 'Not found', detail);
  }
}

module.exports = NotFoundError;