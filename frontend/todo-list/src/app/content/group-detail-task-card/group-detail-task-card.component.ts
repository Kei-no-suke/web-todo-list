import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/interface/task';
import { GroupService } from 'src/app/service/group.service';
import { TaskService } from 'src/app/service/task.service';
import { AllTaskStatus } from 'src/app/task-status';

@Component({
  selector: 'app-group-detail-task-card',
  templateUrl: './group-detail-task-card.component.html',
  styleUrls: ['./group-detail-task-card.component.css'],
  animations: [
    trigger('rotate', [
      state('close', style({ transform: 'rotate(0deg)' })),
      state('open', style({ transform: 'rotate(180deg)' })),
      transition('close => open', [
        style({ transform: 'rotate(0deg)' }),
        animate(200, style({ transform: 'rotate(180deg)' })),
      ]),
      transition('open => close', [
        style({ transform: 'rotate(180deg)' }),
        animate(200, style({ transform: 'rotate(0deg)' })),
      ]),
    ]),
  ],
})
export class GroupDetailTaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() deleteEvent = new EventEmitter<number>();
  taskName!: string;
  // form
  statusForm!: FormGroup;
  allTaskStatus = AllTaskStatus;
  panelOpenState = false;
  // view
  detailHtml: string = '';

  ngOnInit(): void {
    this.statusForm = new FormGroup({
      status: new FormControl(this.task.status, [Validators.required]),
    });
    if (this.task.name.length > 20) {
      this.taskName = this.task.name.slice(0, 20) + '...';
    } else {
      this.taskName = this.task.name;
    }
    if (this.task.detail != null) {
      this.detailHtml = this.taskService.convertReturnToBr(this.task.detail);
    }
  }

  constructor(
    private router: Router,
    private groupService: GroupService,
    private taskService: TaskService
  ) {}

  get status() {
    return this.statusForm.get('status');
  }

  get rotateState() {
    return this.panelOpenState ? 'open' : 'close';
  }

  get isNoGroup() {
    return this.task.groupName == null;
  }

  onClick(event: Event) {
    this.panelOpenState = !this.panelOpenState;
    event.stopPropagation();
  }

  onCardClick() {
    this.router.navigate(['content/task-detail', this.task.taskId]);
  }

  onEditClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['content/task-edit', this.task.taskId]);
  }

  async onChangeStatus() {
    var result: boolean = false;
    if (this.taskService.validateStatus(this.status?.value)) {
      console.log('validated');
      result = await this.taskService.changeTaskStatusOnList(
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

  async removeTask(event: Event) {
    event.stopPropagation();
    var result: boolean = false;
    if (this.task.taskId != null) {
      result = await this.groupService.removeTask(this.task.taskId);
      if (result == true) {
        this.deleteEvent.emit(this.task.taskId);
      }
    }
  }

  async onDelete(event: Event) {
    event.stopPropagation();
    var result: boolean = false;
    if (this.task.taskId != null) {
      result = await this.taskService.deleteTaskOnList(this.task.taskId);
      if (result == true) {
        this.deleteEvent.emit(this.task.taskId);
      }
    }
  }
}
