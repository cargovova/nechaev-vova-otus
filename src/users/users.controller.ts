import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestRegUser } from './dto/requestRegUser.dto';
import { ConfigService } from '@nestjs/config';
import { ResponseRegUserDto } from './dto/responseReqUser.dto';
import { JwtAutGuard } from './jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService, private readonly configService: ConfigService) {}

  @ApiOperation({ summary: 'registration for users' })
  @ApiResponse({
    status: 201,
    schema: { example: { user: { id: '1', name: 'username' }, access_token: 'eyJhbGciOiJIUz' } },
  })
  @Post('api/registration')
  async registration(@Body() user: RequestRegUser): Promise<any> {
    return await this.usersService.registration(user);
  }

  @ApiOperation({ summary: 'login for users' })
  @ApiResponse({
    status: 200,
    schema: { example: { user: { id: '1', name: 'username' }, access_token: 'eyJhbGciOiJIUz' } },
  })
  @HttpCode(200)
  @Post('api/login')
  async login(@Body() user: RequestRegUser): Promise<any> {
    return await this.usersService.login(user);
  }

  @ApiOperation({ summary: 'get all users with guard' })
  @ApiResponse({ status: 200, type: [ResponseRegUserDto] })
  @UseGuards(JwtAutGuard)
  @Get('/api/users')
  async getUsers(): Promise<ResponseRegUserDto[]> {
    return await this.usersService.getAllUsers();
  }
}
