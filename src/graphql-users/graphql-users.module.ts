import { Module } from '@nestjs/common';
import { GraphqlUsersResolver } from './graphql-users.resolver';
import { UsersModule } from 'src/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql-users/schema.gql'),
      playground: true,
      debug: false,
    }),
    UsersModule,
  ],
  providers: [GraphqlUsersResolver],
})
export class GraphqlUsersModule {}
