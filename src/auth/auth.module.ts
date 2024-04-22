import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { jwtConstants } from './auth.constant';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { TaskAuthGuard } from 'src/task/task.auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360000s' },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [AuthService, RoleService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
