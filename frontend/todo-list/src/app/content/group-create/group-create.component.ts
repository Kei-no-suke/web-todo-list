import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css'],
})
export class GroupCreateComponent implements OnInit {
  groupForm!: FormGroup;

  constructor(private router: Router, private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      detail: new FormControl(''),
    });
  }

  get name() {
    return this.groupForm.get('name');
  }

  get detail() {
    return this.groupForm.get('detail');
  }

  async onCreate() {
    var result: boolean = false;

    // validation
    if (this.name?.invalid) {
      console.log('グループ名が不正です。');
      return;
    }

    // detail
    var registerDetail: string | null = null;
    if (this.detail?.value != '') {
      registerDetail = this.detail?.value;
    }

    var group: Group = {
      groupId: null,
      userId: null,
      name: this.name?.value,
      detail: registerDetail,
    };

    result = await this.groupService.saveGroup(group);
    if (result) {
      this.router.navigate(['content/group-list']);
    }
  }
}
