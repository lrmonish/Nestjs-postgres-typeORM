import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { Role } from '../role/role.entity';
import { TaskAuthGuard } from './task.auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Task, User, Role])],
  providers: [TaskService, TaskAuthGuard],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
