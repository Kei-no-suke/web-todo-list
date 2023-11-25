import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interface/task';
import { Group } from 'src/app/interface/group';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllTaskStatus } from 'src/app/task-status';
import { TaskService } from 'src/app/service/task.service';

export class MyDateAdapter extends NativeDateAdapter {
  override getDateNames(): string[] {
    return [...Array(31).keys()].map((i) => String(i + 1));
  }
}

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
  providers: [{ provide: DateAdapter, useClass: MyDateAdapter }],
})
export class TaskEditComponent implements OnInit {
  // data
  task!: Task;
  groups: Group[] = [];
  // flag
  existsTask: boolean = false;
  existsGroup: boolean = false;
  // form
  taskForm!: FormGroup;
  allTaskStatus = AllTaskStatus;

  constructor(
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {
    dateAdapter.setLocale('ja-JP');
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      detail: new FormControl(''),
      groupName: new FormControl('0', [Validators.required]),
      status: new FormControl('未着手', [Validators.required]),
      deadline: new FormControl(''),
      docUrl: new FormControl(''),
    });
    this.activatedRoute.data.subscribe(({ taskEditDto }) => {
      if (taskEditDto?.taskFront != null) {
        this.task = taskEditDto.taskFront;
        this.existsTask = true;
        if (taskEditDto?.groupFronts != null) {
          this.groups = taskEditDto.groupFronts;
          this.existsGroup = true;
        }
      }
      if (this.existsTask) {
        // name
        this.name?.setValue(this.task.name);

        // detail
        if (this.task.detail != null) {
          this.detail?.setValue(this.task.detail);
        }

        // groupName
        if (this.task.groupName != null) {
          this.groupName?.setValue(
            this.taskService.nameToIndexOnGroup(
              this.task.groupName,
              this.groups
            )
          );
        }

        // status
        this.status?.setValue(this.task.status);

        // deadline
        if (this.task.deadline != null) {
          var dateStrArr = this.task.deadline.split('/');
          var date = new Date(
            Number(dateStrArr[0]),
            Number(dateStrArr[1]) - 1,
            Number(dateStrArr[2])
          );
          this.deadline?.setValue(date);
        }

        // docUrl
        if (this.task.docUrl != null) {
          this.docUrl?.setValue(this.task.docUrl);
        }
      }
    });
  }

  get name() {
    return this.taskForm.get('name');
  }

  get detail() {
    return this.taskForm.get('detail');
  }

  get groupName() {
    return this.taskForm.get('groupName');
  }

  get status() {
    return this.taskForm.get('status');
  }

  get deadline() {
    return this.taskForm.get('deadline');
  }

  get docUrl() {
    return this.taskForm.get('docUrl');
  }

  async onUpdate() {
    var result: boolean = false;
    var checkGroups: Group[] | null = null;
    if (this.existsGroup) {
      checkGroups = this.groups;
    }

    // validation
    if (this.task.taskId == null) {
      console.log('タスクIDが不正です。');
      return;
    }
    if (this.name?.value == '') {
      console.log('タスク名が不正です。');
      return;
    }
    if (!this.taskService.validateStatus(this.status?.value)) {
      console.log('ステータスが不正です。');
      return;
    }
    if (
      !this.taskService.validateGroupIndex(this.groupName?.value, checkGroups)
    ) {
      console.log('グループが不正です。');
      return;
    }

    // detail
    var registerDetail: string | null = null;
    if (this.detail?.value != '') {
      registerDetail = this.detail?.value;
    }

    // groupName
    var registerGroupName: string | null = this.taskService.indexToNameOnGroup(
      this.groupName?.value,
      checkGroups
    );

    // deadline
    var registerDeadline: string | null = null;
    if (this.deadline?.value != null && this.deadline?.value != '') {
      registerDeadline = this.taskService.formatDate(this.deadline?.value);
    }

    // docUrl
    var registerDocUrl: string | null = null;
    if (this.docUrl?.value != '') {
      registerDocUrl = this.docUrl?.value;
    }

    var task: Task = {
      taskId: this.task.taskId,
      userId: null,
      name: this.name?.value,
      detail: registerDetail,
      groupName: registerGroupName,
      deadline: registerDeadline,
      status: this.status?.value,
      docUrl: registerDocUrl,
    };
    result = await this.taskService.updateTask(task);
    if (result) {
      this.router.navigate(['content/task-detail', this.task.taskId]);
    }
  }
}
