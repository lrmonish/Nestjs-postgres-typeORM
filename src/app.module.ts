import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './globalException';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '../config/typeorm.config';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TaskModule,
    AuthModule,
    RoleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
