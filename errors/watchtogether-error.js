/**
 * General error of this project.
 */
class WatchtogetherError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = WatchtogetherError;