import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestRegUser } from './dto/requestRegUser.dto';
import { ConfigService } from '@nestjs/config';
import { ResponseRegUserDto } from './dto/responseReqUser.dto';
import { JwtAutGuard } from './jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService, private readonly configService: ConfigService) {}

  @Post('api/registration')
  async registration(@Body() user: RequestRegUser): Promise<any> {
    return await this.usersService.registration(user);
  }
  @HttpCode(200)
  @Post('api/login')
  async login(@Body() user: RequestRegUser): Promise<any> {
    return await this.usersService.login(user);
  }

  @UseGuards(JwtAutGuard)
  @Get('/api/users')
  async getUsers(): Promise<ResponseRegUserDto[]> {
    return await this.usersService.getAllUsers();
  }
}
