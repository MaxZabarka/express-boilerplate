class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

//no need to import everytime, less typing
global.HttpError = HttpError;
