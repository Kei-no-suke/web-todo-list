import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { TaskListComponent } from './task-list/task-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { taskCreateResolver } from '../resolver/task-create.resolver';
import { taskListResolver } from '../resolver/task-list.resolver';
import { groupListResolver } from '../resolver/group-list.resolver';
import { taskDetailResolver } from '../resolver/task-detail.resolver';
import { taskEditResolver } from '../resolver/task-edit.resolver';
import { groupEditResolver } from '../resolver/group-edit.resolver';
import { groupDetailResolver } from '../resolver/group-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        component: TaskListComponent,
        title: 'Task List',
        resolve: { taskListDto: taskListResolver },
      },
      {
        path: 'task-list',
        component: TaskListComponent,
        title: 'Task List',
        resolve: { taskListDto: taskListResolver },
      },
      {
        path: 'group-list',
        component: GroupListComponent,
        title: 'Group List',
        resolve: { groupListDto: groupListResolver },
      },
      {
        path: 'task-create',
        component: TaskCreateComponent,
        title: 'Task Create',
        resolve: { taskCreateDto: taskCreateResolver },
      },
      {
        path: 'group-create',
        component: GroupCreateComponent,
        title: 'Group Create',
      },
      {
        path: 'task-detail/:id',
        component: TaskDetailComponent,
        title: 'Task Detail',
        resolve: { taskDetailDto: taskDetailResolver },
      },
      {
        path: 'task-edit/:id',
        component: TaskEditComponent,
        title: 'Task Edit',
        resolve: { taskEditDto: taskEditResolver },
      },
      {
        path: 'group-detail/:id',
        component: GroupDetailComponent,
        title: 'Group Detail',
        resolve: { groupDetailDto: groupDetailResolver },
      },
      {
        path: 'group-edit/:id',
        component: GroupEditComponent,
        title: 'Group Edit',
        resolve: { groupEditDto: groupEditResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
