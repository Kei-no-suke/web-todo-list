import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GroupService } from '../service/group.service';
import { GroupDetailDto } from '../interface/dto/response/group-detail-dto';

export const groupDetailResolver: ResolveFn<GroupDetailDto | null> = (
  route,
  state
) => {
  return inject(GroupService).getGroupDetailDto(
    Number(route.paramMap.get('id')!)
  );
};
