import { NgModule } from '@angular/core';
import { StudentsListComponent } from './students-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {StudentAddModule} from "./student-add/student-add.module";
import {StudentsService} from "../services/students.service";
import {StudentEditModule} from "./edit-student/edit-student.module";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SearchPipe} from "./pipes/search.pipe";
import {RequestService} from "../services/request.service";


@NgModule({
  imports: [
    NzTableModule,
    CommonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    StudentAddModule,
    NzIconModule,
  ],
  declarations: [
    StudentsListComponent,
    SearchPipe,
  ],
  exports: [StudentsListComponent],
  providers:[
    StudentsService,
    RequestService
  ]
})
export class StudentsListModule { }
