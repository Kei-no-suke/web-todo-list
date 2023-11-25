import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../service/task.service';
import { TaskEditDto } from '../interface/dto/response/task-edit-dto';

export const taskEditResolver: ResolveFn<TaskEditDto | null> = (
  route,
  state
) => {
  return inject(TaskService).getTaskEditDto(Number(route.paramMap.get('id')!));
};
