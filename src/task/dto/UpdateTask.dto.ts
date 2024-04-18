import { TaskStatus } from '../taskStatusEnum';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateDto {
  title: string;
  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string;
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  status: TaskStatus;
}
