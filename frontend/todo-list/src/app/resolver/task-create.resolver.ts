import { ResolveFn } from '@angular/router';
import { TaskCreateDto } from '../interface/dto/response/task-create-dto';
import { inject } from '@angular/core';
import { TaskService } from '../service/task.service';

export const taskCreateResolver: ResolveFn<TaskCreateDto | null> = (
  route,
  state
) => {
  return inject(TaskService).getTaskCreateDto();
};
