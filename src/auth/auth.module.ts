import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mysecret',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User,Role]),
  ],
  providers: [AuthService,RoleService],
  controllers: [AuthController],
})
export class AuthModule {}
