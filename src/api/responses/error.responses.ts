import { ApiProperty } from '@nestjs/swagger';

export class ErrorItem {
  @ApiProperty()
  code: number;
  @ApiProperty()
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

export class ErrorResponse {
  @ApiProperty()
  response: string;
  @ApiProperty()
  status: number;
  @ApiProperty({ type: [ErrorItem] })
  errors: ErrorItem[];

  constructor(response: string, status = 400, errors: ErrorItem[] = []) {
    this.response = response;
    this.status = status;
    this.errors = errors;
  }
}

export class BadRequestResponse extends ErrorResponse {}
export class InternalServerErrorResponse extends ErrorResponse {}
