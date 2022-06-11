import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../cabinet/services/students.service";
import {ActivatedRoute} from "@angular/router";
import {IStudentInterface} from "../cabinet/interfaces/student.interface";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {StudentAddComponent} from "../cabinet/students-list/student-add/student-add.component";
import {StudentEditComponent} from "../cabinet/students-list/edit-student/edit-student.component";
import {FormBuilder} from "@angular/forms";
import {InstituteEnum} from "../cabinet/enums/institute.enum";

@Component({
  selector: 'app-welcome',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent implements OnInit {

  public student!: IStudentInterface;
  public instituteEnum = InstituteEnum;

  constructor(
    private _studentsService: StudentsService,
    private _route: ActivatedRoute,
    private _modal:NzModalService,
    private _fb: FormBuilder,
  ) {

  }

  public ngOnInit() {
    const id: string = this._route.snapshot.queryParams['id']
    this.student = this._studentsService.getStudent(id);
  }

  public createEditStudentModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Изменить данные студента',
      nzContent: StudentEditComponent,
      nzComponentParams: {
        student: this.student,
      },
    });
  }
}
