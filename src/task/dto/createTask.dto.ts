import { TaskStatus } from '../taskStatusEnum';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class createTask {
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  readonly title: string;
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;
  @IsNotEmpty({ message: 'status is required' })
  @IsString()
  status: TaskStatus;
}
