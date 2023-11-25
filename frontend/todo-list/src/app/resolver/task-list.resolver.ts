import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../service/task.service';
import { TaskListDto } from '../interface/dto/response/task-list-dto';

export const taskListResolver: ResolveFn<TaskListDto | null> = (
  route,
  state
) => {
  return inject(TaskService).getTaskListDto();
};
