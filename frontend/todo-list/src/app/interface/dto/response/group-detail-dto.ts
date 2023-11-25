import { Group } from '../../group';
import { Task } from '../../task';

export interface GroupDetailDto {
  groupFront: Group;
  taskFronts: Task[];
}
