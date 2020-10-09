const SessionError = require("./session-error");
const WatchtogetherError = require("./watchtogether-error");

/**
 * Error which is thrown if the server couldn't create a session.
 */
class CreateSessionError extends SessionError {
  /**
   * Creates an instance of this class and includes the
   * specified reason if provided.
   * @param {string | undefined} reason Optional reason
   */
  constructor(reason) {
    let message = 'Cannot create session' ;
    if (typeof reason === 'string') {
      message += ', because' + reason;
    }

    super(message);
  }
}

module.exports = CreateSessionError;