import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/interface/group';
import { Task } from 'src/app/interface/task';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
})
export class GroupDetailComponent implements OnInit {
  group!: Group;
  tasks: Task[] = [];
  existsGroup: boolean = false;
  existsTask: boolean = false;
  // view
  detailHtml: string = '';

  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupDetailDto }) => {
      if (groupDetailDto?.groupFront) {
        this.group = groupDetailDto.groupFront;
        this.existsGroup = true;
      }
      if (groupDetailDto?.taskFronts) {
        this.tasks = groupDetailDto.taskFronts;
        this.existsTask = true;
      }
      if (this.existsGroup) {
        if (this.group.detail != null) {
          this.detailHtml = this.groupService.convertReturnToBr(
            this.group.detail
          );
        }
      }
    });
  }

  onEditClick() {
    this.router.navigate(['content/group-edit', this.group.groupId]);
  }

  onDeleteTask(taskId: number) {
    var deleteIndex;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskId == taskId) {
        deleteIndex = i;
      }
    }
    if (deleteIndex != undefined) {
      this.tasks.splice(deleteIndex, 1);
    }
  }

  async onDelete() {
    if (this.group.groupId != null) {
      var result = await this.groupService.deleteGroup(this.group.groupId);
      if (result == true) {
        this.router.navigate(['content/group-list']);
      }
    }
  }
}
