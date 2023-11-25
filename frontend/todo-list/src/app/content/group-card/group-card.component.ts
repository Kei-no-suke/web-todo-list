import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css'],
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
export class GroupCardComponent implements OnInit {
  @Input() group!: Group;
  @Output() deleteEvent = new EventEmitter<number>();
  panelOpenState = false;
  // view
  detailHtml: string = '';

  constructor(private router: Router, private groupService: GroupService) {}

  ngOnInit(): void {
    if (this.group.detail != null) {
      this.detailHtml = this.groupService.convertReturnToBr(this.group.detail);
    }
  }

  get rotateState() {
    return this.panelOpenState ? 'open' : 'close';
  }

  onClick(event: Event) {
    this.panelOpenState = !this.panelOpenState;
    event.stopPropagation();
  }

  onCardClick() {
    this.router.navigate(['content/group-detail', this.group.groupId]);
  }

  onEditClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['content/group-edit', this.group.groupId]);
  }

  async onDelete(event: Event) {
    event.stopPropagation();
    if (this.group.groupId != null) {
      var result = await this.groupService.deleteGroup(this.group.groupId);
      if (result != null) {
        if (result) {
          this.deleteEvent.emit(this.group.groupId);
        }
      }
    }
  }
}
