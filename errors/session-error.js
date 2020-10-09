const WatchtogetherError = require("./watchtogether-error");

/**
 * General session error.
 */
class SessionError extends WatchtogetherError {
  /**
   * Creates an instance of this class with a generic message.
   * @param {string | undefined} msg Message, if not provided will use generic message.
   */
  constructor(msg) {
    super(
      typeof msg === 'string' ?
      msg :
      'An error occurred while trying to connect to the session');
  }
}

module.exports = SessionError;