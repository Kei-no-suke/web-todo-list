import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GroupService } from '../service/group.service';
import { GroupEditDto } from '../interface/dto/response/group-edit-dto';

export const groupEditResolver: ResolveFn<GroupEditDto | null> = (
  route,
  state
) => {
  return inject(GroupService).getGroupEditDto(
    Number(route.paramMap.get('id')!)
  );
};
