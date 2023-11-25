import { Group } from '../../group';
import { Task } from '../../task';

export interface TaskEditDto {
  taskFront: Task;
  groupFronts: Group[];
}
