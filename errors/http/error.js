const WatchtogetherError = require('../watchtogether-error');

/**
 * Basic error for all http errors.
 * These error will not be thrown by GraphQL.
 */
class HttpError extends WatchtogetherError {
  /**
   * Creates an instance of this class
   * @param {number} statusCode The status code
   * @param {string} message Message of the error
   * @param {any} detail Optional additional information
   */
  constructor(statusCode, message, detail) {
    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
  }
}

module.exports = HttpError;