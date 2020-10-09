const SessionError = require("./session-error");

/**
 * Error which is thrown if an error occurred while trying to join a session.
 * Either the provided id or password is incorrect.
 */
class JoinSessionError extends SessionError {
  /**
   * Creates an instance of this class.
   */
  constructor() {
    super('Can\'t connect to session');
  }
}

module.exports = JoinSessionError;