import { ApiProperty } from '@nestjs/swagger';

export class RequestRegUser {
  @ApiProperty({ example: 'username', description: 'user name' })
  name: string;
  @ApiProperty({ example: 'password', description: 'password' })
  password: string;
}
