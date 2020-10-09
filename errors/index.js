const httpErrors = require('./http');
const SessionError = require('./session-error');
const WatchtogetherError = require('./watchtogether-error');
const CreateSessionError = require('./create-session-error');
const JoinSessionError = require('./join-session-error');
const NoSessionError = require('./no-session-error');

module.exports = {
  ...httpErrors,
  SessionError,
  CreateSessionError,
  WatchtogetherError,
  JoinSessionError,
  NoSessionError,
};