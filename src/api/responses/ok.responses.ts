import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
