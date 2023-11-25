import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/interface/group';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/interface/task';

export class MyDateAdapter extends NativeDateAdapter {
  override getDateNames(): string[] {
    return [...Array(31).keys()].map((i) => String(i + 1));
  }
}

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
  providers: [{ provide: DateAdapter, useClass: MyDateAdapter }],
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  groups: Group[] = [];
  existsGroup: boolean = false;

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      detail: new FormControl(''),
      groupName: new FormControl('0', [Validators.required]),
      deadline: new FormControl(''),
      docUrl: new FormControl(''),
    });
    this.activatedRoute.data.subscribe(({ taskCreateDto }) => {
      if (taskCreateDto?.groupFronts != null) {
        this.groups = taskCreateDto.groupFronts;
        this.existsGroup = true;
      }
    });
  }

  constructor(
    dateAdapter: DateAdapter<NativeDateAdapter>,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    dateAdapter.setLocale('ja-JP');
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
  get deadline() {
    return this.taskForm.get('deadline');
  }
  get docUrl() {
    return this.taskForm.get('docUrl');
  }

  async createTask() {
    var checkGroups: Group[] | null = null;
    if (this.existsGroup) {
      checkGroups = this.groups;
    }

    // validation
    // name
    if (this.name?.value == '') {
      return;
    }
    // groupName
    if (
      !this.taskService.validateGroupIndex(this.groupName?.value, checkGroups)
    ) {
      return;
    }

    // normalize
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
      taskId: null,
      userId: null,
      name: this.name?.value,
      detail: registerDetail,
      groupName: registerGroupName,
      deadline: registerDeadline,
      status: '未着手',
      docUrl: registerDocUrl,
    };

    var result = await this.taskService.saveTask(task);

    if (result) {
      this.router.navigate(['content/task-list']);
    }
  }
}
