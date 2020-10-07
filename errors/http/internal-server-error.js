const HttpError = require("./error");

class InternalServerError extends HttpError {
  constructor(detail) {
    super(500, 'Internal server error', detail);
  }
}

module.exports = InternalServerError;