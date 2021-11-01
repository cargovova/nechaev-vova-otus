import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { ResponseRegUserDto } from '../users/dto/responseReqUser.dto';
import { RequestRegUser } from '../users/dto/requestRegUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registration(user: RequestRegUser): Promise<{ user: ResponseRegUserDto; access_token: string }> {
    const candidateByName: User | undefined = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name: user.name })
      .getOne();
    if (candidateByName) {
      throw new Error('Ошибка регистрации, попробуйте использовать другое имя.');
    }
    const password_hash = await bcrypt.hash(user.password, 3);
    const insertedUser: InsertResult = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: user.name,
        password_hash,
      })
      .returning('id, name')
      .execute();
    const access_token = this.jwtService.sign(insertedUser.raw[0], {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '30m',
    });
    return { user: insertedUser.raw[0], access_token };
  }

  async login(user: RequestRegUser): Promise<{ access_token: string; user: ResponseRegUserDto }> {
    const candidate = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name: user.name })
      .getOne();
    if (!candidate) {
      throw new Error('Некорректные учетные данные');
    }
    const isPassEquals = await bcrypt.compare(user.password, candidate.password_hash);
    if (!isPassEquals) {
      throw new Error('Некорректные учетные данные');
    }
    const responseDto: ResponseRegUserDto = new ResponseRegUserDto(candidate);
    const access_token = this.jwtService.sign(
      { ...responseDto },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: '30m',
      },
    );
    return { user: responseDto, access_token };
  }

  async getAllUsers(): Promise<ResponseRegUserDto[]> {
    const users = await this.usersRepository.createQueryBuilder('user').getMany();
    const mapUsers = users.map((user) => {
      return new ResponseRegUserDto(user);
    });
    return mapUsers;
  }
}
