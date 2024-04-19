import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { jwtConstants } from './auth.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [AuthService, RoleService],
  controllers: [AuthController],
})
export class AuthModule {}
