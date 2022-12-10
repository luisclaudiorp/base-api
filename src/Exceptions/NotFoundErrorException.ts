import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundErrorException extends HttpException {
  constructor(message = null) {
    super(`not found ${message ? ' ' + message : ''}`, HttpStatus.NOT_FOUND);
  }
}
