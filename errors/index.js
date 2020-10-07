const httpErrors = require('./http');
const SessionError = require('./session-error');

module.exports = {
  ...httpErrors,
  SessionError,
};