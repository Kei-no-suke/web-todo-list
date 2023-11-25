import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../interface/task';
import { TaskService } from '../../service/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllTaskStatus } from 'src/app/task-status';
import { Group } from 'src/app/interface/group';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  // data
  task!: Task;
  groups: Group[] = [];
  // flag
  existsTask: boolean = false;
  existsGroup: boolean = false;
  // form
  taskForm!: FormGroup;
  allTaskStatus = AllTaskStatus;
  // view
  detailHtml: string = '';

  constructor(
    private router: Router,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      groupName: new FormControl('0', [Validators.required]),
      status: new FormControl('未着手', [Validators.required]),
    });
    this.activatedRoute.data.subscribe(({ taskDetailDto }) => {
      if (taskDetailDto?.taskFront != null) {
        this.task = taskDetailDto.taskFront;
        this.existsTask = true;
        if (taskDetailDto?.groupFronts != null) {
          this.groups = taskDetailDto.groupFronts;
          this.existsGroup = true;
        }
      }
      if (this.existsTask) {
        this.status?.setValue(this.task.status);
        if (this.existsGroup && this.task.groupName != null) {
          this.groupName?.setValue(
            this.taskService.nameToIndexOnGroup(
              this.task.groupName,
              this.groups
            )
          );
        }
        if (this.task.detail != null) {
          this.detailHtml = this.taskService.convertReturnToBr(
            this.task.detail
          );
        }
      }
    });
  }

  get groupName() {
    return this.taskForm.get('groupName');
  }

  get status() {
    return this.taskForm.get('status');
  }

  onEditClick() {
    this.router.navigate(['content/task-edit', this.task.taskId]);
  }

  async onChangeStatus() {
    var result: boolean = false;
    if (this.taskService.validateStatus(this.status?.value)) {
      result = await this.taskService.changeTaskStatus(
        this.task.taskId!,
        this.status?.value
      );
    }

    // post-processing
    if (result) {
      this.task.status = this.status?.value;
    } else {
      this.status?.setValue(this.task.status);
    }
  }

  async onRegisterGroup() {
    var result = false;
    var checkGroups: Group[] | null = null;
    var registerGroupName: string | null = this.task.groupName;
    if (this.existsGroup) {
      checkGroups = this.groups;
    }
    if (
      this.taskService.validateGroupIndex(this.groupName?.value, checkGroups)
    ) {
      registerGroupName = this.taskService.indexToNameOnGroup(
        this.groupName?.value,
        checkGroups
      );
      result = await this.taskService.registerTaskToGroup(
        this.task.taskId!,
        registerGroupName
      );
    }
    if (result) {
      this.task.groupName = registerGroupName;
    } else {
      if (this.existsGroup && this.task.groupName != null) {
        this.groupName?.setValue(
          this.taskService.nameToIndexOnGroup(this.task.groupName, this.groups)
        );
      } else {
        this.groupName?.setValue('0');
      }
    }
  }

  async onDelete() {
    if (this.task.taskId != null) {
      var result = await this.taskService.deleteTaskOnList(this.task.taskId);
      if (result) {
        this.router.navigate(['content/task-list']);
      }
    }
  }
}
