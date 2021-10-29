import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class graphqlRequest {
  @Field()
  readonly name: string;

  @Field()
  readonly password: string;
}
