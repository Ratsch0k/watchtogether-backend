const HttpError = require("./error");

class NotFoundError extends HttpError {
  constructor(detail) {
    super(404, 'Not found', detail);
  }
}

module.exports = NotFoundError;