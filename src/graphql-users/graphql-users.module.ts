import { Module } from '@nestjs/common';
import { GraphqlUsersResolver } from './graphql-users.resolver';
import { UsersModule } from 'src/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './graphql-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({}),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql-users/schema.gql'),
      playground: true,
      debug: false,
    }),
    UsersModule,
  ],
  providers: [GraphqlUsersResolver, UsersService],
})
export class GraphqlUsersModule {}
