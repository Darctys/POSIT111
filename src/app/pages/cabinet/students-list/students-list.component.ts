import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {StudentAddComponent} from "./student-add/student-add.component";
import {StudentsService} from "../services/students.service";
import {IStudentInterface} from "../interfaces/student.interface";
import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {Observable} from "rxjs";
import {InstituteEnum} from "../enums/institute.enum";



interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<IStudentInterface> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<IStudentInterface> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}


@Component({
  selector: 'app-welcome',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  public searchValue = '';
  public instituteEnum = InstituteEnum;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Имя',
      sortOrder: null,
      sortFn: (a: IStudentInterface, b: IStudentInterface) => a.fullName.localeCompare(b.fullName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: this.studentsService.instituteFilterList,
      filterFn: (list: string[], item: IStudentInterface) => list.some(fullName => item.fullName.indexOf(fullName) !== -1),
    },
    {
      name: 'Институт',
      sortOrder: null,
      sortFn: (a: IStudentInterface, b: IStudentInterface) => a.institute.localeCompare(b.institute),
      sortDirections: ['ascend', 'descend', null],
      filterFn: (list: string[], item: IStudentInterface) => list.some(institute => item.institute.indexOf(institute) !== -1),
      filterMultiple: true,
      listOfFilter: this.studentsService.instituteFilterList,
    },
    {
      name: 'Группа',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IStudentInterface, b: IStudentInterface) => a.academicGroup.localeCompare(b.academicGroup),
      filterMultiple: false,
      listOfFilter: this.studentsService.instituteFilterList,
      filterFn: (list: string[], item: IStudentInterface) => list.some(academicGroup => item.academicGroup.indexOf(academicGroup) !== -1),
    },
    {
      name: 'Номер студенческого билета',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: IStudentInterface, b: IStudentInterface) => a.posIdCard.localeCompare(b.posIdCard),
      filterMultiple: false,
      listOfFilter: this.studentsService.instituteFilterList,
      filterFn: (list: string[], item: IStudentInterface) => list.some(posIdCard => item.posIdCard.indexOf(posIdCard) !== -1),
    }
  ];

  constructor(
   private _router: Router,
   private _modal: NzModalService,
   public studentsService: StudentsService,
  ) {
    console.log(this.studentsService.studentList)
  }

  ngOnInit() {
    console.log(this.studentsService.instituteFilterList)
  }

  public navigateToStudentDetail(id: number): void {
    this._router.navigateByUrl(`cabinet/student/?id=${id}`).then()
  }

  public deleteStudent(id: string): void {
    this.studentsService.deleteStudent(id);
  }

  public createAddStudentModal(): void {
    const modal: NzModalRef = this._modal.create({
      nzTitle: 'Добавить студента',
      nzContent: StudentAddComponent
    });
  }

  public search(): void {
    this.studentsService.studentList.filter((item: IStudentInterface) => item.fullName.indexOf(this.searchValue) !== -1);
  }
}
