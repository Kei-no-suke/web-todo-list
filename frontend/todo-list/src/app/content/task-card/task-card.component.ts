import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../interface/task';
import { AllTaskStatus, TaskStatus } from 'src/app/task-status';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import {
  AnimationBuilder,
  animate,
  group,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
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
export class TaskCardComponent implements OnInit {
  // input and output
  @Input() task!: Task;
  @Output() deleteEvent = new EventEmitter<number>();
  // view
  taskName!: string;
  detailHtml: string = '';
  // form
  statusForm!: FormGroup;
  allTaskStatus = AllTaskStatus;
  // state
  panelOpenState = false;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private animationBuilder: AnimationBuilder
  ) {}

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

  async onDelete(event: Event) {
    event.stopPropagation();
    if (this.task.taskId != null) {
      var result = await this.taskService.deleteTaskOnList(this.task.taskId);
      if (result != null) {
        if (result == true) {
          this.deleteEvent.emit(this.task.taskId);
        }
      }
    }
  }
}
