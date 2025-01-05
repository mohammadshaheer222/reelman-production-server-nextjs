class ErrorHandler extends Error {
  constructor(message, statusCode, errors = {}) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
