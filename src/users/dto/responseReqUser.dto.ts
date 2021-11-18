import { ApiProperty } from '@nestjs/swagger';

export class ResponseRegUserDto {
  @ApiProperty({ example: 1, description: 'unique id' })
  private readonly id: number;
  @ApiProperty({ example: 'username', description: 'user name' })
  private readonly name: string;

  constructor(model: any) {
    this.id = model.id;
    this.name = model.name;
  }
}
