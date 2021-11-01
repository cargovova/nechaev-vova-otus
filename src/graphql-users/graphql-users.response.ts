import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class graphqlResponse {
  @Field()
  access_token: string;

  @Field()
  id: number;

  @Field()
  name: string;
}
