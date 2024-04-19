import { TaskStatus } from '../taskStatusEnum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty({ message: 'title is required' })
  title: string;
  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string;
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  @IsEnum(TaskStatus, { message: 'status must be a valid TaskStatus value' })
  status: TaskStatus;
}
