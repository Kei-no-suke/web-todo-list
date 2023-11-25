import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Task } from '../../interface/task';
import { TaskService } from 'src/app/service/task.service';
import { Group } from 'src/app/interface/group';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable, map, of } from 'rxjs';

export class MyDateAdapter extends NativeDateAdapter {
  override getDateNames(): string[] {
    return [...Array(31).keys()].map((i) => String(i + 1));
  }
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [{ provide: DateAdapter, useClass: MyDateAdapter }],
})
export class TaskListComponent implements OnInit {
  filterForm!: FormGroup;
  tasks: Task[] = [];
  groups: Group[] = [];
  existsTask: boolean = false;
  existsGroup: boolean = false;
  isLteSmall$: Observable<boolean> = of(false);
  isGtSmall$: Observable<boolean> = of(true);

  ngOnInit(): void {
    this.isLteSmall$ = this.breakpointObserver
      .observe(Breakpoints.Small)
      .pipe(map((state: BreakpointState) => state.matches));

    this.isGtSmall$ = this.breakpointObserver
      .observe(Breakpoints.Small)
      .pipe(map((state: BreakpointState) => !state.matches));

    // form setting
    this.filterForm = new FormGroup({
      groupName: new FormControl('0', [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });

    // apply value
    this.activatedRoute.data.subscribe(({ taskListDto }) => {
      this.tasks = taskListDto?.taskFronts;
      this.groups = taskListDto?.groupFronts;
      if (taskListDto == null) {
        this.existsTask = false;
      } else {
        if (taskListDto.taskFronts == null) {
          this.existsTask = false;
        } else {
          this.tasks = taskListDto.taskFronts;
          this.existsTask = this.tasks.length != 0;
          if (taskListDto.groupFronts == null) {
            this.existsGroup = false;
          } else {
            this.groups = taskListDto.groupFronts;
            this.existsGroup = this.groups.length != 0;
          }
        }
      }
    });
  }

  constructor(
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {
    dateAdapter.setLocale('ja-JP');
  }

  get groupName() {
    return this.filterForm.get('groupName');
  }
  get startDate() {
    return this.filterForm.get('startDate');
  }
  get endDate() {
    return this.filterForm.get('endDate');
  }

  async onFilter() {
    var checkGroups: Group[] | null = null;
    if (this.existsGroup) {
      checkGroups = this.groups;
    }

    // validation
    if (
      !this.taskService.validateGroupIndex(this.groupName?.value, checkGroups)
    ) {
      console.log(this.groupName?.value);
      if (checkGroups != null) {
        for (let group of checkGroups) {
          console.log(group.groupId);
        }
      }

      console.log('グループが不正です。');
      return;
    }

    // normalize
    var registerGroupName: string | null = this.taskService.indexToNameOnGroup(
      this.groupName?.value,
      checkGroups
    );
    var registerStartDate: string | null = null;
    if (this.startDate?.value != null && this.startDate?.value != '') {
      registerStartDate = this.taskService.formatDate(this.startDate?.value);
    }
    var registerEndDate: string | null = null;
    if (this.endDate?.value != null && this.endDate?.value != '') {
      registerEndDate = this.taskService.formatDate(this.endDate?.value);
    }

    // post
    var taskListDto = await this.taskService.getFilteredTaskListDto(
      registerGroupName,
      registerStartDate,
      registerEndDate
    );

    // check
    if (taskListDto?.taskFronts != null) {
      this.tasks = taskListDto.taskFronts;
      this.existsTask = this.tasks.length != 0;
    } else {
      this.existsTask = false;
    }
  }

  onDelete(taskId: number) {
    var deleteIndex;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].taskId == taskId) {
        deleteIndex = i;
      }
    }
    if (deleteIndex != undefined) {
      this.tasks.splice(deleteIndex, 1);
    }
    this.existsTask = this.tasks.length != 0;
  }
}
