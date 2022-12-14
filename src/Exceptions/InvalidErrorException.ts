import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidErrorException extends HttpException {
  constructor(message = null) {
    super(
      `Ivalid error${message ? ' ' + message : ''}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
