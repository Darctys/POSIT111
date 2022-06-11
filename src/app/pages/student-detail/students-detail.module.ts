import { NgModule } from '@angular/core';
import {StudentsDetailComponent} from './students-detail.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzButtonModule} from "ng-zorro-antd/button";
import {StudentEditModule} from "../cabinet/students-list/edit-student/edit-student.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzDescriptionsModule,
    NzButtonModule,
    StudentEditModule
  ],
  declarations: [StudentsDetailComponent],
  exports: [StudentsDetailComponent]
})
export class StudentsDetailModule { }
