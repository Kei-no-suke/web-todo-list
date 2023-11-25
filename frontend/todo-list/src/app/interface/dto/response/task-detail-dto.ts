import { Group } from '../../group';
import { Task } from '../../task';

export interface TaskDetailDto {
  taskFront: Task;
  groupFronts: Group[];
}
