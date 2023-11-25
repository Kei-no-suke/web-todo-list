import { Group } from '../../group';
import { Task } from '../../task';

export interface TaskListDto {
  taskFronts: Task[];
  groupFronts: Group[];
}
