const uuid = require('uuid');
const SessionError = require('./errors/session-error');
const client = require('./db');
const passport = require('passport');

/**
 * Checks if any session for the specified id already exists.
 * @param {string} id The id to check for
 */
const checkIfIdExists = async (id) => {
  return Boolean(await client.exists(id));
}

/**
 * Creates a session id.
 */
const createSessionID = () => {
  return uuid.v4();
}

/**
 * Tries to log the user in for the specified session
 * with the specified password.
 * @param {string} id Id of the session
 * @param {string} password Password for the session
 * @param {any} req Request object
 */
const login = (id, password, req) => {
  return new Promise((resolve, reject) => {
    // Modify request and put id and password in body
    req.body = {
      username: id,
      password: password,
    };
    passport.authenticate('local')(
      req, {
        end: () => {
          reject(new SessionError());
        },
      }, () => resolve());
  });
}

module.exports = {
  checkIfIdExists,
  createSessionID,
  login,
};