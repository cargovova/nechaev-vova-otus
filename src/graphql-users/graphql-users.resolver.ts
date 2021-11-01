import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './graphql-users.service';
import { User } from './graphql-users.model';
import { graphqlRequest } from './graphql-users.request';
import { graphqlResponse } from './graphql-users.response';
import { UseGuards } from '@nestjs/common';
import { JwtAutGuard } from './graphql-users.guard';

@Resolver()
export class GraphqlUsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAutGuard)
  @Query(() => [User])
  async users() {
    return await this.usersService.getAllUsers();
  }

  @Mutation(() => graphqlResponse)
  async login(@Args('user') user: graphqlRequest): Promise<graphqlResponse> {
    const loginData = await this.usersService.login(user);
    const logedUser: any = { ...loginData.user };
    return {
      access_token: loginData.access_token,
      id: logedUser.id,
      name: logedUser.name,
    };
  }

  @Mutation(() => graphqlResponse)
  async registration(@Args('user') user: graphqlRequest): Promise<graphqlResponse> {
    const loginData = await this.usersService.registration(user);
    const logedUser: any = { ...loginData.user };
    return {
      access_token: loginData.access_token,
      id: logedUser.id,
      name: logedUser.name,
    };
  }
}
