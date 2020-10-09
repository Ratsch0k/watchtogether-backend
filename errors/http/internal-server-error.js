const HttpError = require("./error");

/**
 * Represents internal server error.
 * Will be thrown if any unexpected error is thrown.
 */
class InternalServerError extends HttpError {
  /**
   * Creates an instance of this class
   * @param {any} detail Optional additional information
   */
  constructor(detail) {
    super(500, 'Internal server error', detail);
  }
}

module.exports = InternalServerError;