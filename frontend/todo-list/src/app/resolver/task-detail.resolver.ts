import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../service/task.service';
import { TaskDetailDto } from '../interface/dto/response/task-detail-dto';

export const taskDetailResolver: ResolveFn<TaskDetailDto | null> = (
  route,
  state
) => {
  return inject(TaskService).getTaskDetailDto(
    Number(route.paramMap.get('id')!)
  );
};
