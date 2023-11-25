import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { ContentRoutingModule } from './content-routing.module';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { GroupCardComponent } from './group-card/group-card.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupDetailTaskCardComponent } from './group-detail-task-card/group-detail-task-card.component';
import { GroupEditComponent } from './group-edit/group-edit.component';
import { GroupListComponent } from './group-list/group-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ContentComponent } from './content.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent,
    TaskEditComponent,
    TaskCreateComponent,
    TaskDetailComponent,
    GroupCardComponent,
    GroupCreateComponent,
    GroupDetailComponent,
    GroupDetailTaskCardComponent,
    GroupEditComponent,
    GroupListComponent,
    TopBarComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ContentRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
})
export class ContentModule {}
