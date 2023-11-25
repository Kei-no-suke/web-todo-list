import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GroupListDto } from '../interface/dto/response/group-list-dto';
import { GroupService } from '../service/group.service';

export const groupListResolver: ResolveFn<GroupListDto | null> = (
  route,
  state
) => {
  return inject(GroupService).getGroupListDto();
};
