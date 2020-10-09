const SessionError = require("./session-error");

/**
 * This error is thrown if a user tries to do something which
 * requires the user to have joined a session.
 */
class NoSessionError extends SessionError {
  /**
   * Creates an instance of this class.
   */
  constructor() {
    super('You have to join a session before updating it');
  }
}

module.exports = NoSessionError;