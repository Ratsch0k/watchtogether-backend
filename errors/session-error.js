class SessionError extends Error {
  constructor() {
    super('An error occurred while trying to connect to the session');
  }
}

module.exports = SessionError;