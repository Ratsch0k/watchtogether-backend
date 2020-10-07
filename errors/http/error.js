class HttpError {
  constructor(statusCode, message, detail) {
    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
  }
}

module.exports = HttpError;