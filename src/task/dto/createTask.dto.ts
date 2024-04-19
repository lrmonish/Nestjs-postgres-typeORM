import { TaskStatus } from '../taskStatusEnum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class createTask {
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  readonly title: string;
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  @IsEnum(TaskStatus, { message: 'status must be a valid TaskStatus value' })
  status: TaskStatus;
}
