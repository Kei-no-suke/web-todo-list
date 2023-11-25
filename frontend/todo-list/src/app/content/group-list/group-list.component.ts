import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  existsGroup: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupListDto }) => {
      // apply value
      if (groupListDto == null) {
        this.existsGroup = false;
      } else {
        if (groupListDto.groupFronts == null) {
          this.existsGroup = false;
        } else {
          this.groups = groupListDto.groupFronts;
          this.existsGroup = this.groups.length != 0;
        }
      }
    });
  }

  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute
  ) {}

  onDelete(groupId: number) {
    var deleteIndex;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].groupId == groupId) {
        deleteIndex = i;
      }
    }
    if (deleteIndex != undefined) {
      this.groups.splice(deleteIndex, 1);
    }
    this.existsGroup = this.groups.length != 0;
  }
}
