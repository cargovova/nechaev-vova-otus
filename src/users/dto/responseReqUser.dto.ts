export class ResponseRegUserDto {
  private readonly id: number;
  private readonly name: string;

  constructor(model: any) {
    this.id = model.id;
    this.name = model.name;
  }
}
