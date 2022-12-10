import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestErrorException extends HttpException {
  constructor(message = null) {
    super( `already em use ${message ? ' ' + message : ''}`, HttpStatus.BAD_REQUEST )
  }
}
