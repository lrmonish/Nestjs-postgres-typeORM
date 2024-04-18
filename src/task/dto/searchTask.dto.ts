import { TaskStatus } from '../taskStatusEnum';

export class SearchDto {
  status?: TaskStatus;
  search?: string;
}
