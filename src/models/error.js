// @flow strict

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'ForbiddenError';
    this.description = 'Error encountered fetching an API having a response with 403 status code.';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }
  }
}
export class NoContentFoundError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'NoContentFoundError';
    this.description = 'Error encountered fetching an API having a response with 404 status code.';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoContentFoundError);
    }
  }
}
