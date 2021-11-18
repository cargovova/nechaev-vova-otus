import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { ApiFilterFilter } from 'src/api-filter.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({}),
    }),
  ],
  providers: [UsersService, { provide: APP_FILTER, useValue: new ApiFilterFilter<void>() }],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
