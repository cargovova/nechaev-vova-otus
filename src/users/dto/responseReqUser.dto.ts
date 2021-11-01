import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class ResponseRegUserDto {
  @ApiProperty({ example: 1, description: 'unique id' })
  private readonly id: number;
  @ApiProperty({ example: 'username', description: 'user name' })
  private readonly name: string;

  constructor(model: User) {
    this.id = model.id;
    this.name = model.name;
  }
}
