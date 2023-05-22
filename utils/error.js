export class Exception extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class NotFoundException extends Exception {
  constructor(message = "Not found entity") {
    super(message, 404);
  }
}

export class BadRequestException extends Exception {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenException extends Exception {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}
