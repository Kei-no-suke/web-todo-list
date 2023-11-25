import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/interface/group';
import { GroupService } from 'src/app/service/group.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css'],
})
export class GroupEditComponent implements OnInit {
  group!: Group;
  existsGroup: boolean = false;
  groupForm!: FormGroup;

  constructor(
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      detail: new FormControl(''),
    });
    this.activatedRoute.data.subscribe(({ groupEditDto }) => {
      if (groupEditDto?.groupFront != null) {
        this.group = groupEditDto.groupFront;
        this.existsGroup = true;
      }
      if (this.existsGroup) {
        this.name?.setValue(this.group.name);
        if (this.group.detail != null) {
          this.detail?.setValue(this.group.detail);
        }
      }
    });
  }

  get name() {
    return this.groupForm.get('name');
  }

  get detail() {
    return this.groupForm.get('detail');
  }

  async onUpdate() {
    var result: boolean = false;

    // validation
    if (this.group.groupId == null) {
      console.log('グループIDが不正です。');
      return;
    }
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
      groupId: this.group.groupId,
      userId: null,
      name: this.name?.value,
      detail: registerDetail,
    };

    result = await this.groupService.updateGroup(group);
    console.log(result);
    if (result) {
      this.router.navigate(['content/group-detail', this.group.groupId]);
    }
  }
}
