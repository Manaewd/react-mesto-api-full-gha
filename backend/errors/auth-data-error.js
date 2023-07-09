class AuthDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = AuthDataError;
